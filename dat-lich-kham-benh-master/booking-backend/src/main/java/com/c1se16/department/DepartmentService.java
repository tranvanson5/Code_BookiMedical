package com.c1se16.department;

import com.c1se16.auhority.Authority;
import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.core.utils.BeanUtil;
import com.c1se16.department.request.DepartmentCreationRequest;
import com.c1se16.department.request.DepartmentSearchRequest;
import com.c1se16.department.request.DepartmentUpdateRequest;
import com.c1se16.department.response.DepartmentDto;
import com.c1se16.user.User;
import com.c1se16.user.UserDTO;
import com.c1se16.user.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final ObjectMapper objectMapper;

    private UserService userService;

    @Autowired
    public void setUserService(@Lazy UserService userService) {
        this.userService = userService;
    }

    @Transactional
    public void saveDepartment(DepartmentCreationRequest req) {
        User user = this.userService.findById(req.getManager());
        boolean contains = user.getAuthorities().contains(Authority.MANAGER);
        if (!contains) {
            throw new IllegalArgumentException("User không phải manager");
        }
        Department department = this.objectMapper.convertValue(req, Department.class);
        department.setManager(user);
        department.setActive(req.getStatus() == 1);
        this.departmentRepository.save(department);
    }

    @Transactional
    public void updateDepartment(DepartmentUpdateRequest req) {
        Department department = this.departmentRepository.findById(req.getCode()).orElseThrow();
        User user = this.userService.findById(req.getManager());
        boolean contains = user.getAuthorities().contains(Authority.MANAGER);
        if (!contains) {
            throw new IllegalArgumentException("User không phải manager");
        }
        Department d = this.objectMapper.convertValue(req, Department.class);
        d.setManager(user);
        d.setActive(req.getStatus() == 1);
        BeanUtil.copyPropertiesNonNull(d, department);
        this.departmentRepository.save(department);
    }


    public PagingResponse<DepartmentDto> searchDepartment(PagingRequest<DepartmentSearchRequest> request) {
        Page<Department> response = this.departmentRepository.searchDepartment(request.getData(), PageRequest.of(request.getPage() - 1, request.getPageSize()));
        return new PagingResponse<DepartmentDto>()
                .setPage(request.getPage())
                .setPageSize(request.getPageSize())
                .setTotal(response.getTotalElements())
                .setTotalPage(response.getTotalPages())
                .setData(response.getContent().stream()
                        .map(x -> {
                            UserDTO userDTO = this.objectMapper.convertValue(x.getManager(), UserDTO.class);
                            DepartmentDto departmentDto = this.objectMapper.convertValue(x, DepartmentDto.class);
                            departmentDto.setStatus(x.isActive() ? 1 : 0);
                            departmentDto.setManager(userDTO);
                            return departmentDto;
                        }).toList()
                );
    }

    public List<DepartmentDto> findAllDepartment() {
        return this.departmentRepository.findActiveDepartment()
                .stream()
                .map(d -> {
                    UserDTO userDto = this.objectMapper.convertValue(d.getManager(), UserDTO.class);
                    DepartmentDto departmentDto = this.objectMapper.convertValue(d, DepartmentDto.class);
                    departmentDto.setManager(userDto);
                    return departmentDto;
                })
                .toList();
    }

    public List<DepartmentDto> findMyDepartment() {
        User currentUser = this.userService.getNonNullCurrentUser();
        return this.findMyDepartment(currentUser.getId());
    }

    public List<DepartmentDto> findMyDepartment(Long userId) {
        return this.departmentRepository.findByUser(userId)
                .stream()
                .map(d -> this.objectMapper.convertValue(d, DepartmentDto.class))
                .toList();
    }

    @Transactional
    public void changeStatus(String code) {
        Department department = this.departmentRepository.findById(code)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy chi nhánh."));
        department.setActive(!department.isActive());
        this.departmentRepository.save(department);
    }
}

package com.c1se16.user;

import com.c1se16.auhority.Authority;
import com.c1se16.auhority.AuthorityRepository;
import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.ChartResponse;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.core.utils.BeanUtil;
import com.c1se16.core.utils.ChartUtil;
import com.c1se16.department.DepartmentService;
import com.c1se16.department.response.DepartmentDto;
import com.c1se16.user.constant.Gender;
import com.c1se16.user.hischangestatus.HisChangeStatusUser;
import com.c1se16.user.hischangestatus.HisChangeStatusUserRepository;
import com.c1se16.user.request.*;
import com.c1se16.user.response.HisChangeStatusResponse;
import com.c1se16.user.response.OverallUser;
import com.c1se16.user.response.SignUpResponse;
import com.c1se16.user.response.UserSearchResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final AuthorityRepository authorityRepository;
    private final HisChangeStatusUserRepository hisChangeStatusUserRepository;
    private final PasswordEncoder passwordEncoder;

    private DepartmentService departmentService;

    @Autowired
    public void setDepartmentService(@Lazy DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @Override
    public UserDTO loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Not found username: " + username));
        UserDTO userDto = this.objectMapper.convertValue(user, UserDTO.class);
        userDto.setPassword(user.getPassword());
        userDto.setAuthorities(user.getAuthorities());
        List<DepartmentDto> myDepartment = this.departmentService.findMyDepartment(user.getId());
        userDto.setDepartments(myDepartment);
        return userDto;
    }
    
    public OverallUser getOverallUser() {
        return this.userRepository.getOverallUser();
    }

    public List<ChartResponse> getStatisticChangeStatusUser(int year, int status) {
        List<ChartResponse> statisticUser = this.hisChangeStatusUserRepository.getStatisticUser(year, status);
        return ChartUtil.fill12Month(statisticUser);
    }

    public PagingResponse<HisChangeStatusResponse> getHisChangeStatus(PagingRequest<GetHisChangeStatusReq> request) {
        Page<HisChangeStatusResponse> his = this.hisChangeStatusUserRepository.getHisChangeStatusUser(request.getData(), PageRequest.of(request.getPage() - 1, request.getPageSize()));
        return new PagingResponse<HisChangeStatusResponse>()
                .setPageSize(request.getPageSize())
                .setPage(request.getPage())
                .setTotal(his.getTotalElements())
                .setTotalPage(his.getTotalPages())
                .setData(his.getContent());
    }

    @NonNull
    public User findById(Long userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User không tồn tại"));
    }

    @Nullable
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if ("anonymousUser".equals(principal)) {
            return null;
        }
        UserDTO userDTO = (UserDTO) authentication.getPrincipal();
        User user = this.objectMapper.convertValue(userDTO, User.class);
        user.setAuthorities(userDTO.getAuthoritiesList());
        return user;
    }

    @NonNull
    public User getNonNullCurrentUser() {
        return Objects.requireNonNull(this.getCurrentUser());
    }

    @Transactional
    public SignUpResponse signUp(SignUpRequest request) {
        List<Authority> defaultAuthority = this.authorityRepository.findDefaultAuthority();
        return this.signUp(request, defaultAuthority);
    }

    @Transactional
    public void signUpAdmin(SignUpAdminRequest request) {
        Authority authority = this.authorityRepository.findById(request.getAuthority()).orElseThrow();
        List<Authority> authorities = List.of(authority);
        this.signUp(request, authorities);
    }

    private SignUpResponse signUp(SignUpRequest request, List<Authority> authorities) {
        if (Objects.isNull(request.getGender())) {
            request.setGender(Gender.MALE);
        }
        User user = this.objectMapper.convertValue(request, User.class);
        user.setAuthorities(authorities);
        user.setActive(Boolean.TRUE);
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));
        User saved = this.userRepository.save(user);
        SignUpResponse signUpResponse = this.objectMapper.convertValue(saved, SignUpResponse.class);
        signUpResponse.setAuthorities(authorities);
        return signUpResponse;
    }

    public UserDTO updateProfile(UserUpdateRequest request) {
        User currentUser = this.getNonNullCurrentUser();

        this.userRepository.findByEmail(request.getEmail())
                .filter(x -> !x.getUsername().equals(currentUser.getUsername()))
                .ifPresent(x -> {
                    throw new IllegalArgumentException("Email đã tồn tại");
                });

        this.userRepository.findByPhone(request.getPhone())
                .filter(x -> !x.getUsername().equals(currentUser.getUsername()))
                .ifPresent(x -> {
                    throw new IllegalArgumentException("SĐT đã tồn tại");
                });

        User user = this.objectMapper.convertValue(request, User.class);
        UserDTO userDTO = this.loadUserByUsername(currentUser.getUsername());
        BeanUtil.copyPropertiesNonNull(user, currentUser);
        currentUser.setPassword(userDTO.getPassword());
        currentUser.setActive(userDTO.isActive());
        this.userRepository.save(currentUser);
        return this.objectMapper.convertValue(currentUser, UserDTO.class);
    }

    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        User currentUser = this.getNonNullCurrentUser();
        UserDTO userDTO = this.loadUserByUsername(currentUser.getUsername());
        boolean matches = this.passwordEncoder.matches(request.getPassword(), userDTO.getPassword());
        if (!matches) {
            throw new IllegalArgumentException("Mật khẩu không chính xác.");
        }
        String encode = this.passwordEncoder.encode(request.getNewPassword());
        this.userRepository.updatePassword(encode, currentUser.getUsername());
    }

    public List<UserSearchResponse> getManagers() {
        return this.userRepository.findByAuthorities(Authority.MANAGER)
                .stream()
                .map(x -> this.objectMapper.convertValue(x, UserSearchResponse.class))
                .toList();
    }

    @Transactional
    public PagingResponse<UserSearchResponse> searchUser(PagingRequest<UserSearchRequest> request) {
        UserSearchRequest data = request.getData();
        Page<User> response = this.userRepository.searchUser(data, PageRequest.of(request.getPage() - 1, request.getPageSize()));
        List<UserSearchResponse> list = response.getContent()
                .stream()
                .filter(x -> Objects.isNull(data.getAuthority()) || x.getAuthorities().contains(data.getAuthority()))
                .map(x -> {
                    Hibernate.initialize(x.getAuthorities());
                    UserSearchResponse userSearchResponse = this.objectMapper.convertValue(x, UserSearchResponse.class);
                    userSearchResponse.setAuthorities(x.getAuthorities());
                    userSearchResponse.setStatus(x.isActive() ? 1 : 0);
                    return userSearchResponse;
                })
                .toList();
        return new PagingResponse<UserSearchResponse>()
                .setData(list)
                .setPage(request.getPage())
                .setPageSize(request.getPageSize())
                .setTotalPage(response.getTotalPages())
                .setTotal(response.getTotalElements());
    }

    @Transactional
    public void activeUser(Long userId) {
        this.changeStatusUser(userId, Boolean.TRUE);
    }

    @Transactional
    public void blockUser(Long userId) {
        this.changeStatusUser(userId, Boolean.FALSE);
    }

    @Transactional
    public void changeStatusUser(Long userId, Boolean newStatus) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy user: " + userId));
        User currentUser = this.getNonNullCurrentUser();

        if (user.getUsername().equals(currentUser.getUsername())) {
            throw new IllegalArgumentException("Không thể thay đổi trạng thái chính mình.");
        }

        boolean oldActive = user.isActive();
        HisChangeStatusUser hisChangeStatusUser = new HisChangeStatusUser();
        hisChangeStatusUser.setOldStatus(oldActive);
        hisChangeStatusUser.setNewStatus(newStatus);
        hisChangeStatusUser.setUpdateDate(new Date());
        hisChangeStatusUser.setUpdater(currentUser);
        hisChangeStatusUser.setUser(user);
        this.hisChangeStatusUserRepository.save(hisChangeStatusUser);

        user.setActive(newStatus);
        this.userRepository.save(user);
    }
}

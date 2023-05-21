package com.c1se16.specialist;

import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.specialist.request.SpecialistCreationRequest;
import com.c1se16.specialist.request.SpecialistSearchRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecialistService {

    private final SpecialistRepository specialistRepository;
    private final ObjectMapper objectMapper;

    public PagingResponse<SpecialistDTO> searchSpecialist(PagingRequest<SpecialistSearchRequest> request) {
        Page<Specialist> specialists = this.specialistRepository.searchSpecialist(request.getData(), PageRequest.of(request.getPage() - 1, request.getPageSize()));

        return new PagingResponse<SpecialistDTO>()
                .setTotal(specialists.getTotalElements())
                .setPage(request.getPage())
                .setPageSize(request.getPageSize())
                .setTotalPage(specialists.getTotalPages())
                .setData(
                        specialists.getContent().stream()
                                .map(x -> {
                                    SpecialistDTO specialistDTO = this.objectMapper.convertValue(x, SpecialistDTO.class);
                                    specialistDTO.setStatus(x.isActive() ? 1 : 0);
                                    return specialistDTO;
                                })
                                .toList()
                );
    }

    public List<SpecialistDTO> findActiveSpecialist() {
        return this.specialistRepository.findActiveSpecialist()
                .stream()
                .map(x -> this.objectMapper.convertValue(x, SpecialistDTO.class))
                .toList();
    }

    @Transactional
    public void createSpecialist(SpecialistCreationRequest request) {
        Specialist specialist = this.objectMapper.convertValue(request, Specialist.class);
        specialist.setActive(request.getStatus() == 1);
        this.specialistRepository.save(specialist);
    }

    @Transactional
    public void changeStatus(Integer id) {
        Specialist specialist = this.specialistRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy chuyên khoa."));
        specialist.setActive(!specialist.isActive());
        this.specialistRepository.save(specialist);
    }
}

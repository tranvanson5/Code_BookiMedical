package com.c1se16.bill;

import com.c1se16.bill.detail.BillDetail;
import com.c1se16.bill.request.BillCreationRequest;
import com.c1se16.bill.request.SearchBillRequest;
import com.c1se16.bill.response.BillCreationResponse;
import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.PagingResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService billService;

    @PostMapping("/my-bill")
    public PagingResponse<BillDto> getMyBill(@RequestBody @Validated PagingRequest<SearchBillRequest> request) {
        return this.billService.getMyBill(request);
    }

    @GetMapping("/{billId}/bill-detail")
    public List<BillDetail> getBillDetail(@PathVariable String billId) {
        return this.billService.getBillDetail(billId);
    }

    @PostMapping
    public BillCreationResponse checkout(@RequestBody @Validated BillCreationRequest request) throws JsonProcessingException {
        return this.billService.checkout(request);
    }

    @GetMapping(params = {"billId"})
    public ResponseEntity<?> paidBill(@RequestParam String billId, @Value("${paypal.redirect-after-payment}") String redirect) {
        this.billService.paidBill(billId);
        return ResponseEntity
                .status(302)
                .header("Location", redirect)
                .build();
    }
}

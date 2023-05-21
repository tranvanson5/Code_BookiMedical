package com.c1se16.bill;

import com.c1se16.bill.request.SearchBillRequest;
import com.c1se16.bill.response.BillTree;
import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.ChartResponse;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.product.response.ProductTree;
import com.c1se16.product.response.StatisticProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/bills")
@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor
public class AdminBillController {

    private final BillService billService;

    @PostMapping("/search")
    public PagingResponse<BillDto> searchBill(@RequestBody @Validated PagingRequest<SearchBillRequest> request) {
        return this.billService.searchBill(request);
    }

    @GetMapping("/statistic/revenue-yearly")
    public List<BillTree> statisticRevenueYearly() {
        return this.billService.statisticRevenueYearly();
    }

    @GetMapping(value = "/statistic/top-{limit}-product", params = {"year"})
    public List<ChartResponse> getTop10BestProduct(@RequestParam int year, @PathVariable int limit) {
        return this.billService.getTopProduct(year, limit);
    }

    @PostMapping("/statistic/product")
    public PagingResponse<StatisticProduct> statisticProduct(@RequestBody @Validated PagingRequest<Integer> req) {
        return billService.statisticProduct(req);
    }

    @GetMapping("/statistic/revenue-monthly")
    public List<ChartResponse> revenueMonthly(@RequestParam int year) {
        return this.billService.revenueMonthly(year);
    }

    @GetMapping("/statistic/revenue-product-monthly")
    public List<ProductTree> revenueProductMonthly(@RequestParam int year) {
        return this.billService.statisticRevenueProductMonthly(year);
    }
}

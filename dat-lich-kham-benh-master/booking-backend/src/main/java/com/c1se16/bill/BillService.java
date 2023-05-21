package com.c1se16.bill;

import com.c1se16.bill.constant.BillStatus;
import com.c1se16.bill.detail.BillDetail;
import com.c1se16.bill.request.BillCreationRequest;
import com.c1se16.bill.request.SearchBillRequest;
import com.c1se16.bill.response.BillCreationResponse;
import com.c1se16.bill.response.BillTree;
import com.c1se16.cart.Cart;
import com.c1se16.cart.CartRepository;
import com.c1se16.core.constant.Constant;
import com.c1se16.core.request.PagingRequest;
import com.c1se16.core.response.ChartResponse;
import com.c1se16.core.response.PagingResponse;
import com.c1se16.core.utils.ChartUtil;
import com.c1se16.exception.BusinessException;
import com.c1se16.exception.constant.ErrorCode;
import com.c1se16.paypal.PaypalService;
import com.c1se16.paypal.response.OrderPaypalCreationResponse;
import com.c1se16.product.Product;
import com.c1se16.product.response.ProductTree;
import com.c1se16.product.response.StatisticProduct;
import com.c1se16.user.User;
import com.c1se16.user.UserService;
import com.c1se16.user.item.Item;
import com.c1se16.user.item.ItemRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final PaypalService paypalService;
    private final CartRepository cartRepository;
    private final UserService userService;
    private final ItemRepository itemRepository;
    private final ObjectMapper objectMapper;


    public List<ChartResponse> getTopProduct(int year, int limit) {
        return this.billRepository.getTopProduct(year, limit);
    }

    public PagingResponse<BillDto> searchBill(PagingRequest<SearchBillRequest> request) {
        Page<Bill> bills = this.billRepository.searchBill(request.getData(), PageRequest.of(request.getPage() - 1, request.getPageSize()));
        return new PagingResponse<BillDto>()
                .setPage(request.getPage())
                .setPageSize(request.getPageSize())
                .setTotalPage(bills.getTotalPages())
                .setTotal(bills.getTotalElements())
                .setData(bills.getContent().stream()
                        .map(b -> {
                            BillDto billDto = this.objectMapper.convertValue(b, BillDto.class);
                            billDto.setUsername(b.getCreator().getUsername());
                            return billDto;
                        })
                        .toList()
                );
    }

    public List<ChartResponse> revenueMonthly(int year) {
        return ChartUtil.fill12Month(this.billRepository.revenueMonthly(year));
    }

    public PagingResponse<StatisticProduct> statisticProduct(PagingRequest<Integer> req) {
        Page<StatisticProduct> statisticProducts = this.billRepository.statisticProduct(req.getData(), PageRequest.of(req.getPage() - 1, req.getPageSize()));
        return new PagingResponse<StatisticProduct>()
                .setPageSize(req.getPageSize())
                .setPage(req.getPage())
                .setTotal(statisticProducts.getTotalElements())
                .setTotalPage(statisticProducts.getTotalPages())
                .setData(statisticProducts.getContent());
    }

    public List<ProductTree> statisticRevenueProductMonthly(int year) {
        Map<String, List<ProductTree>> maps = this.billRepository.statisticRevenueProductMonthly(year)
                .stream()
                .map(x -> {
                    Integer month = x.get("month", Integer.class);
                    ProductTree productTree = new ProductTree();
                    productTree.setRevenue(x.get("revenue", BigDecimal.class));
                    productTree.setQuantity(x.get("quantity", BigDecimal.class).intValue());
                    productTree.setKey(x.get("code", String.class));
                    productTree.setName(x.get("name", String.class));
                    productTree.setParentKey(String.valueOf(month));
                    return productTree;
                })
                .collect(Collectors.groupingBy(ProductTree::getParentKey));

        return maps.keySet().stream()
                .map(Integer::parseInt)
                .sorted(Integer::compareTo)
                .map(x -> {
                    List<ProductTree> children = maps.get(String.valueOf(x));
                    ProductTree productTree = new ProductTree();
                    productTree.setKey(Constant.MONTH_SHORT_NAME.get(x));
                    productTree.setRevenue(new BigDecimal(0));
                    productTree.setChildren(children);
                    return productTree;
                })
                .peek(parent -> {
                    List<ProductTree> children = parent.getChildren();
                    for (ProductTree child : children) {
                        parent.setQuantity(parent.getQuantity() + child.getQuantity());
                        parent.setRevenue(parent.getRevenue().add(child.getRevenue()));
                        child.setParentKey(parent.getKey());
                    }
                }).toList();
    }

    public List<BillTree> statisticRevenueYearly() {
        Map<Integer, List<BillTree>> trees = this.billRepository.statisticRevenueYearly()
                .stream()
                .map(tuple -> {
                    Integer year = tuple.get("year", Integer.class);
                    BigDecimal total = tuple.get("total", BigDecimal.class);
                    Integer month = tuple.get("month", Integer.class);
                    BillTree billTree = new BillTree();
                    billTree.setRevenue(total);
                    billTree.setParentKey(year);
                    billTree.setKey(month);
                    return billTree;
                }).collect(Collectors.groupingBy(BillTree::getParentKey));

        List<BillTree> roots = trees.keySet().stream()
                .map(key -> {
                    List<BillTree> billTrees = trees.get(key).stream()
                            .sorted(Comparator.comparing(BillTree::getKey))
                            .toList();;
                    BillTree parent = new BillTree();
                    parent.setKey(key);
                    parent.setRateGrowth(0);
                    parent.setGrowth(new BigDecimal(0));
                    parent.setRevenue(new BigDecimal(0));
                    parent.setChildren(billTrees);
                    return parent;
                })
                .peek(parent -> {
                    List<BillTree> children = parent.getChildren();
                    for (int i = children.size() - 1; i > 0; i--) {
                        BillTree currentYear = children.get(i);
                        BillTree preYear = children.get(i - 1);
                        currentYear.setGrowth(currentYear.getRevenue().subtract(preYear.getRevenue()));
                        BigDecimal rateGrowth = currentYear.getGrowth()
                                .divide(preYear.getRevenue(), 2, RoundingMode.HALF_UP)
                                .multiply(new BigDecimal(100));
                        currentYear.setRateGrowth(rateGrowth.intValue());
                        parent.setRevenue(parent.getRevenue().add(currentYear.getRevenue()));
                    }
                    BillTree lastMonth = children.get(children.size() - 1);
                    parent.setRevenue(parent.getRevenue().add(lastMonth.getRevenue()));
                })
                .sorted((o1, o2) -> o2.getKey().compareTo(o1.getKey()))
                .toList();
        for (int i = 0; i < roots.size() - 1; i++) {
            BillTree currentYear = roots.get(i);
            BillTree preYear = roots.get(i + 1);
            currentYear.setGrowth(currentYear.getRevenue().subtract(preYear.getRevenue()));
            BigDecimal rateGrowth = currentYear.getGrowth()
                    .divide(preYear.getRevenue(), 2, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal(100));
            currentYear.setRateGrowth(rateGrowth.intValue());
        }
        return roots;
    }

    public PagingResponse<BillDto> getMyBill(PagingRequest<SearchBillRequest> request) {
        User currentUser = this.userService.getNonNullCurrentUser();
        request.getData().setUserId(currentUser.getId());
        return this.searchBill(request);
    }

    public List<BillDetail> getBillDetail(String billId) {
        return this.billRepository.findBillDetail(billId)
                .map(Bill::getDetails)
                .orElseThrow();
    }

    @Transactional
    public void paidBill(String billId) {
        Bill bill = this.billRepository.findById(billId).orElseThrow();
        Map<String, Object> paypalBill = this.paypalService.getPaypalBill(bill.getBillPaypalId());
        if (!"APPROVED".equals(paypalBill.get("status"))) {
            throw new BusinessException(ErrorCode.NOT_PAID, bill.getPaymentLink());
        }
        bill.setStatus(BillStatus.APPROVED);
        bill.setPaidDate(new Date());
        List<Item> items = bill.getDetails().stream()
                .map(bd -> {
                    Product product = bd.getProduct();
                    Optional<Item> opt = this.itemRepository.findByProductAndOwner(product, bill.getCreator());
                    if (opt.isPresent()) {
                        Item i = opt.get();
                        i.setQuantity(i.getQuantity() + bd.getQuantity());
                        return i;
                    }
                    Item item = new Item();
                    item.setProduct(product);
                    item.setOwner(bill.getCreator());
                    item.setQuantity(bd.getQuantity());
                    return item;
                }).toList();
        this.itemRepository.saveAll(items);
        this.billRepository.save(bill);
    }

    @Transactional
    public BillCreationResponse checkout(BillCreationRequest request) throws JsonProcessingException {
        List<Cart> carts = this.cartRepository.findByIds(request.getCartIds());
        String billId = UUID.randomUUID().toString();
        OrderPaypalCreationResponse paypalCreated = this.paypalService.createOrder(carts, billId);

        User currentUser = this.userService.getNonNullCurrentUser();

        Bill bill = new Bill();
        bill.setId(billId);
        bill.setBillPaypalId(paypalCreated.getId());
        bill.setStatus(BillStatus.CREATED);
        bill.setCreator(currentUser);
        bill.setPaymentLink(paypalCreated.getLinkPayment());

        AtomicReference<BigDecimal> total = new AtomicReference<>(new BigDecimal(0));

        List<BillDetail> billDetails = carts.stream().map(cart -> {
            BillDetail billDetail = new BillDetail();
            billDetail.setPrice(cart.getProduct().getPrice());
            billDetail.setQuantity(cart.getQuantity());
            billDetail.setProduct(cart.getProduct());
            BigDecimal newTotal = total.get().add(cart.getProduct().getPrice().multiply(new BigDecimal(cart.getQuantity())));
            total.set(newTotal);
            billDetail.setBill(bill);
            return billDetail;
        }).toList();
        bill.setTotal(total.get());
        bill.setDetails(billDetails);
        this.billRepository.save(bill);
        this.cartRepository.deleteAll(carts);
        return BillCreationResponse.builder()
                .linkPayment(paypalCreated.getLinkPayment())
                .build();
    }
}

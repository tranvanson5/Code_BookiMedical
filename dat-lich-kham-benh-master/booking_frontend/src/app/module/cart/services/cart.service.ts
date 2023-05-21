import { Injectable, inject } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BookingBackend } from "src/app/core";
import { PagingRequest, PagingResponse } from "../../shared/paging/models/paging.model";
import { Cart } from "../models/cart.model";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private readonly bookingBackend = inject(BookingBackend);
    public readonly cartSelector = new Subject<{check: boolean, cart: Cart}>();
    public readonly cartSelector$ = this.cartSelector.asObservable();

    public getMyCart(req: PagingRequest<any>): Observable<PagingResponse<Cart>> {
        return this.bookingBackend.post<PagingResponse<Cart>>('/carts/my-cart', req);
    }

    public addToCart(request: {productId: number, quantity: number}): Observable<void> {
        return this.bookingBackend.post<void>('/carts', request);
    }

    public updateQuantity(cart: {cartId: number, quantity: number}): Observable<void> {
        return this.bookingBackend.put<void>('/carts', cart);
    }

    public deleteCart(id: number): Observable<void> {
        return this.bookingBackend.delete<void>(`/carts/${id}`);
    }
}
import { Component } from '@angular/core';
import { CartWrapperContainer } from 'src/app/module/cart';

@Component({
    selector: 'cart-page',
    templateUrl: './cart.page.html',
    standalone: true,
    imports: [
        CartWrapperContainer
    ]
})
export class CartPage {

}
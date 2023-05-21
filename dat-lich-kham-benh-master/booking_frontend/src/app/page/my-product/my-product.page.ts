import { Component } from "@angular/core";
import { MyProductContainer } from "src/app/module/service-package/containers/my-product/my-product.container";

@Component({
    selector: 'my-product',
    template: '<app-my-product></app-my-product>',
    standalone: true,
    imports: [
        MyProductContainer
    ]
})
export class MyProductPage {
    
}
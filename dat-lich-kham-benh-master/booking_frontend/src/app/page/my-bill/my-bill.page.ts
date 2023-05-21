import { Component } from "@angular/core";
import { BillWrapperContainer } from "src/app/module/bill/containers/bill-wrapper/bill-wrapper.container";

@Component({
    selector: 'my-bill',
    template: '<app-bill-container></app-bill-container>',
    standalone: true,
    imports: [
        BillWrapperContainer
    ]
})
export class MyBillPage {
    
}
import { Component } from "@angular/core";
import { BillTableComponent } from "../../components/bill-table/bill-table.component";

@Component({
    selector: 'app-bill-container',
    templateUrl: './bill-wrapper.container.html',
    standalone: true,
    imports: [
        BillTableComponent
    ]
})
export class BillWrapperContainer {
    
}
import { Component } from "@angular/core";
import { AppointmentListContainer } from "src/app/module";

@Component({
    selector: 'my-appointment-page',
    templateUrl: './my-appointment.page.html',
    standalone: true,
    imports: [
        AppointmentListContainer
    ]
})
export class MyAppointmentPage {

}
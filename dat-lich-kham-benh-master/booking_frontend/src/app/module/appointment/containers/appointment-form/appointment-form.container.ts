import { Component } from '@angular/core';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';

@Component({
    selector: 'app-appointment-form-container',
    templateUrl: './appointment-form.container.html',
    styleUrls: ['./appointment-form.container.scss'],
    standalone: true,
    imports: [
        AppointmentFormComponent
    ]
})
export class AppointmentFormContainer { }
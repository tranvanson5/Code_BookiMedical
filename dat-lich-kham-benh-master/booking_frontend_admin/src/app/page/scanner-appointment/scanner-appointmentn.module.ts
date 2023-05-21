import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ScannerAppointmentContainer } from './scanner-appointment.container';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ScannerAppointmentContainer
            }
        ])
    ],
    declarations: [ 
        ScannerAppointmentContainer 
    ]
})
export class ScannerAppointmentModule {}
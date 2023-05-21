import { Component, inject } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentFormComponent } from '../../appointment';

@Component({
    selector: 'app-background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss'],
    standalone: true,
    imports: [
        NgbModalModule,
        AppointmentFormComponent,
    ]
})
export class BackgroundComponent {

    private ngbModal = inject(NgbModal);

    public openAppointmentForm(): void {

        this.ngbModal.open(AppointmentFormComponent, {
            animation: true,
            size: 'md'
        })
    }

}
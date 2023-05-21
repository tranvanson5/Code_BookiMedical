import { Component } from '@angular/core';
import {
    BackgroundComponent,
    IntroduceComponent,
    ServiceListContainer,
    AppointmentFormComponent,
    AppointmentFormContainer,
    DoctorInfoContainer,
    FeedbackInfoContainer,
} from 'src/app/module';
import { ServiceContainer } from 'src/app/module/service-package/containers/service/service.container';

@Component({
    selector: 'home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [
        BackgroundComponent,
        IntroduceComponent,
        ServiceContainer,
        AppointmentFormComponent,
        AppointmentFormContainer,
        DoctorInfoContainer,
        FeedbackInfoContainer,
    ]
})
export class HomePage {}
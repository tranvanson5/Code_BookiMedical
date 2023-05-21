import { DoctorInfoContainer } from './../../module/doctor/containers/doctor-info/doctor-info.container';
import { Component } from '@angular/core';
import { IntroduceComponent } from 'src/app/module';
import { DepartmentContainer } from 'src/app/module/department/containers/department.container';

@Component({
    selector: 'about-page',
    template: `
        <app-introduce></app-introduce>
        <!-- <app-doctor-info-container></app-doctor-info-container> -->
        <app-department-container></app-department-container>
    `,
    standalone: true,
    imports: [
        IntroduceComponent,
        DoctorInfoContainer,
        DepartmentContainer,
    ]
})
export class AboutPage {

}
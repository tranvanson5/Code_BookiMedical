import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { SafePipe } from 'src/app/core';

@Component({
    selector: 'app-doctor-info',
    templateUrl: './doctor-info.component.html',
    styleUrls: ['./doctor-info.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SafePipe
    ]
})
export class DoctorInfoComponent {
    @Input()
    public data: Doctor;
}
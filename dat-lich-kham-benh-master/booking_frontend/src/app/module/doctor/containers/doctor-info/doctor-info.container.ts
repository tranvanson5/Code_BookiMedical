import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DoctorInfoComponent } from '../../components/doctor-info/doctor-info.component';
import { Doctor } from '../../models/doctor.model';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-doctor-info-container',
    templateUrl: './doctor-info.container.html',
    styleUrls: ['./doctor-info.container.scss'],
    standalone: true,
    imports: [
        CommonModule,
        DoctorInfoComponent,
        CarouselModule,
    ]
})
export class DoctorInfoContainer {

    public doctors: Doctor[] = [
        {
            code: 'DOCTOR_1',
            name: 'Cardiology Specialist',
            bio: 'Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor',
            avatar: 'assets/img/team-1.jpg',
            socials: [
                {
                    name: 'twitter',
                    link: '',
                    icon: 'fab fa-twitter'
                },
                {
                    name: 'facebook',
                    link: '',
                    icon: 'fab fa-facebook-f'
                },
                {
                    name: 'linkedin',
                    link: '',
                    icon: 'fab fa-linkedin-in'
                }
            ]
        },
        {
            code: 'DOCTOR_2',
            name: 'Cardiology Specialist',
            bio: 'Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor',
            avatar: 'assets/img/team-2.jpg',
            socials: [
                {
                    name: 'twitter',
                    link: '',
                    icon: 'fab fa-twitter'
                },
                {
                    name: 'facebook',
                    link: '',
                    icon: 'fab fa-facebook-f'
                },
                {
                    name: 'linkedin',
                    link: '',
                    icon: 'fab fa-linkedin-in'
                }
            ]
        },
        {
            code: 'DOCTOR_3',
            name: 'Cardiology Specialist',
            bio: 'Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor',
            avatar: 'assets/img/team-3.jpg',
            socials: [
                {
                    name: 'twitter',
                    link: '',
                    icon: 'fab fa-twitter'
                },
                {
                    name: 'facebook',
                    link: '',
                    icon: 'fab fa-facebook-f'
                },
                {
                    name: 'linkedin',
                    link: '',
                    icon: 'fab fa-linkedin-in'
                }
            ]
        }
    ];

    public customOptions: OwlOptions = {
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            992: {
                items: 2,
            },
        },
      };
}
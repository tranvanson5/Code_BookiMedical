import { FeedbackInfoComponent } from './../../components/feedback-info/feedback-info.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Feedback } from '../../models/feedback.model';
import { Gender } from 'src/app/module/appointment/models/appointment-creation.model';

@Component({
    selector: 'app-feedback-info-container',
    templateUrl: './feedback-info.container.html',
    styleUrls: ['./feedback-info.container.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FeedbackInfoComponent,
        CarouselModule
    ]
})
export class FeedbackInfoContainer {
    
    public feedbacks: Feedback[] = [
        {
            creator: {
                avatar: 'assets/img/testimonial-1.jpg',
                fullName: 'Profession',
                username: '',
                active: true,
                address: '',
                dob: '',
                email: '',
                gender: Gender.FEMALE,
                id: 1,
                phone: ''
            },
            content: 'Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat. Erat dolor rebum sit ipsum.'
        },
        {
            creator: {
                avatar: 'assets/img/testimonial-2.jpg',
                fullName: 'Profession',
                username: '',
                active: true,
                address: '',
                dob: '',
                email: '',
                gender: Gender.FEMALE,
                id: 1,
                phone: ''
            },
            content: 'Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat. Erat dolor rebum sit ipsum.'
        },
        {
            creator: {
                avatar: 'assets/img/testimonial-3.jpg',
                fullName: 'Profession',
                username: '',
                active: true,
                address: '',
                dob: '',
                email: '',
                gender: Gender.FEMALE,
                id: 1,
                phone: ''
            },
            content: 'Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat. Erat dolor rebum sit ipsum.'
        }
    ]

    public config: OwlOptions = {
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    }
}
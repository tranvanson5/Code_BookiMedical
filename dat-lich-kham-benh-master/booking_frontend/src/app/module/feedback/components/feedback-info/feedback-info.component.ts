import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Feedback } from '../../models/feedback.model';

@Component({
    selector: 'app-feedback-info',
    templateUrl: './feedback-info.component.html',
    styleUrls: ['./feedback-info.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})
export class FeedbackInfoComponent {

    @Input()
    public data: Feedback;
    
}
import { Component } from '@angular/core';
import { FeedbackInfoContainer, ServiceListContainer } from 'src/app/module';
import { ServiceContainer } from 'src/app/module/service-package/containers/service/service.container';

@Component({
    selector: 'service-page',
    template: `
        <app-service-container></app-service-container>
        <app-feedback-info-container></app-feedback-info-container>
    `,
    standalone: true,
    imports: [
        ServiceContainer,
        FeedbackInfoContainer
    ]
})
export class ServicePage {}
import { Component } from "@angular/core";
import { FeedbackFormComponent } from "src/app/module";

@Component({
    selector: 'contact-page',
    templateUrl: './contact.page.html',
    standalone: true,
    imports: [
        FeedbackFormComponent
    ]
})
export class ContactPage {

}
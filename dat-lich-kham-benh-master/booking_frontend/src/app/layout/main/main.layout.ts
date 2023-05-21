import { Component, OnInit } from "@angular/core";
import { FacebookService, InitParams } from 'ngx-facebook';
import { environment } from "src/environments/environment";

@Component({
    selector: 'main-layout',
    templateUrl: './main.layout.html',
    styleUrls: ['./main.layout.scss'],

})
export class MainLayout implements OnInit {

    fbPageId = environment.fbPageId;

    constructor(
        private facebookService: FacebookService
    ) { }

    ngOnInit(): void {
        this.initFacebookService();
    }
    private initFacebookService(): void {
        const initParams: InitParams = { 
            xfbml: true, 
            version: 'v3.2' 
        };
        this.facebookService.init(initParams);
    }

    public scrollTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
}
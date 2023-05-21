import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { recursive } from "../base/_helpers/helper";
import { AuthService } from "./services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

    $unsubscribe = new Subject();
    
    formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.formGroup = this.fb.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        })
    }

    get getControl() {
        return this.formGroup.controls;
    }

    submit(): void {
        recursive(this.formGroup);

        if (this.formGroup.invalid) {
            return;
        }
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        this.authService.login(this.formGroup.value)
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe()
        
    }
    
    ngOnDestroy(): void {
        this.$unsubscribe && this.$unsubscribe.unsubscribe();
    }
}
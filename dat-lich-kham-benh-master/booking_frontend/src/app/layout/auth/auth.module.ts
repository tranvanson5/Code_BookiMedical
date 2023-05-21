import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes } from "./Routes";
import { CommonModule } from "@angular/common";
import { AuthLayout } from "./auth.layout";

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    declarations: [
        AuthLayout
    ]
})
export class AuthModule {}
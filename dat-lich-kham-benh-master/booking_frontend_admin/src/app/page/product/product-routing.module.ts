import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizateGuard } from "src/app/base/core/guard/authorizate.guard";
import { ProductContainer } from "./product.container";
import { AuthGuard } from "src/app/base/core/guard/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: ProductContainer,
        canActivate: [AuthGuard, AuthorizateGuard],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}
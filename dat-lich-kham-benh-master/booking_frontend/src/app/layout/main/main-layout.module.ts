import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import * as Components from './components';
import { MainLayout } from './main.layout';
import { routes } from './Routes';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        Components.MainSubheaderComponent,
        Components.MainHeaderComponent,
        Components.MainFooterComponent,
        MainLayout,
    ]
})
export class MainLayoutModule { }
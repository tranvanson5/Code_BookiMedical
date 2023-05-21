import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './core/services/http.interceptor';
import { SpinnerComponent } from './module/shared/spinner/spinner.component';
import { FacebookModule } from 'ngx-facebook';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./layout').then(module => module.MainLayoutModule)
	},
	{
		path: 'auth',
		loadChildren: () => import('./layout').then(module => module.AuthModule)
	}
]

@NgModule({
	declarations: [
		AppComponent,
		SpinnerComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FacebookModule.forRoot(),
		ToastrModule.forRoot({
			enableHtml: true
		}),
		RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EventComponent } from './components/tour/event/event.component';
import { NavigateComponent } from './components/navigate/navigate.component';
import { NumericFormControlDirective } from './directives/numericFormControl.directive';
import { AdminloginComponent } from "./components/adminlogin/adminlogin.component";
import { RegisterComponent } from './components/register/register.component';

import { AgmCoreModule } from '@agm/core';
import { TourTimeComponent } from './components/tour/tour-time/tour-time.component';
import { TourComponent } from './components/tour/tour.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: AppComponent },
	{ path: 'tour', component: TourComponent },
	{ path: 'admin', component: AdminloginComponent },
	{ path: 'register', component: RegisterComponent }
]

@NgModule({
	declarations: [
		AppComponent,
		EventComponent,
		NavigateComponent,
		NumericFormControlDirective,
		TourTimeComponent,
		TourComponent,
		AdminloginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true }
		),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyDY85XunkRxZh142fdwf4cpHqg7Q4Yv9Sc'
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}

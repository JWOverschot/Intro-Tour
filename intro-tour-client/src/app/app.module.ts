import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { UserNameService } from './services/user-name.service';
import { ScoreService } from './services/score.service';
import { SocketsService } from './services/sockets.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LocationPageComponent } from './components/location-page/location-page.component';
import { NavigateComponent } from './components/navigate/navigate.component';
import { TeamCreateComponent } from './components/team-create/team-create.component';
import { MinutesSecondsPipe } from './pipes/minutes-seconds.pipe';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PointReplacerPipe } from './pipes/point-replacer.pipe';
import { TeamJoinComponent } from './components/team-join/team-join.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsComponent } from './components/settings/settings.component';

const appRoutes: Routes = [
	{ path: 'location', component: LocationPageComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'team-create', component: TeamCreateComponent },
	{ path: 'team-join', component: TeamJoinComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '', component: LoginComponent },
	{ path: 'leaderboard', component: LeaderboardComponent },
	{ path: 'settings', component: SettingsComponent }
]

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		LocationPageComponent,
		NavigateComponent,
		TeamCreateComponent,
		MinutesSecondsPipe,
		LeaderboardComponent,
		PointReplacerPipe,
		TeamJoinComponent,
        HeaderComponent,
        SettingsComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true }
		),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyDY85XunkRxZh142fdwf4cpHqg7Q4Yv9Sc'
		})
	],
	providers: [
		UserNameService,
		ScoreService,
		SocketsService
	],
	bootstrap: [AppComponent]
})
export class AppModule {

}

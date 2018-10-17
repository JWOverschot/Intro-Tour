import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  teamName;
  teamPin;

  constructor (private teamService: TeamService, private localstorageService: LocalstorageService) {}

  ngOnInit(){
    //teamname in header
    if(this.localstorageService.getItem('team') == null){
      this.teamService.currentTeamName.subscribe(name => this.teamName = name);
    }else{
      this.teamName = this.localstorageService.getItem('team').team_name;
    }
    
  }

}

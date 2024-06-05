import { Component } from '@angular/core';
import { AppService } from './prime/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  users=[];
  constructor(private appservice:AppService){}

  userList(){
    this.appservice.getUser().subscribe(
      response =>{
        this.users=response;
      }
    )
  }
}

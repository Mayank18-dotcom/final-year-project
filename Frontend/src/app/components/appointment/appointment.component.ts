import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import { Router } from '@angular/router';
export class Appointment {
  public username: any;
  public city: any;
  public hospital: any;
  public date: any;
  public time: any;
}
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  registerUserData = new Appointment();
  constructor(private service:AppService,public router:Router) { }

  ngOnInit() {
  }
  registerUser(){
    console.log(this.registerUserData)
    // this.loader = true;
    setTimeout(()=>{
      this.service.dailyform(this.registerUserData)
      .subscribe(
        (res:any) =>{
          // this.router.navigate(['/']);
        },
        (err)=>{
          // alert(err);
          console.log(err);
          // this.router.navigate(['/']);
        }
      )
    },1000)
    this.router.navigate(['/']);
  }
  check(){
    console.log(this.registerUserData)
    // if(this.registerUserData.time1 == null){
    //   this.registerUserData.time1 = 'null'
    // }
    // if(this.registerUserData.time2 == null){
    //   this.registerUserData.time2 = 'null'
    // }
    // if(this.registerUserData.time3 == null){
    //   this.registerUserData.time3 = 'null'
    // }
    this.registerUser();
  }
}

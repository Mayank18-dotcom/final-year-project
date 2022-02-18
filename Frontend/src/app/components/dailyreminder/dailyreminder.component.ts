import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
export class Med {
  public username: any;
  public meds: any;
  public phno: any;
  public time1: any;
  public time2: any;
  public time3: any;
}
@Component({
  selector: 'app-dailyreminder',
  templateUrl: './dailyreminder.component.html',
  styleUrls: ['./dailyreminder.component.css']
})
export class DailyreminderComponent implements OnInit {
  registerUserData = new Med();
  // loader = false;
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

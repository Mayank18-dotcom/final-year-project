import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import { Router } from '@angular/router';
export class Med {
  public username: any;
  public phno: any;
  public meds: any;
  public date: any;
  public time: any;
}


@Component({
  selector: 'app-renewalreminder',
  templateUrl: './renewalreminder.component.html',
  styleUrls: ['./renewalreminder.component.css']
})
export class RenewalreminderComponent implements OnInit {
  registerUserData = new Med();
  constructor(private service:AppService,public router:Router) { }

  ngOnInit() {
  }
  registerUser(){
    console.log(this.registerUserData)
    // this.loader = true;
    setTimeout(()=>{
      this.service.renewalform(this.registerUserData)
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
    console.log(this.registerUserData);
    this.registerUser();
  }
}

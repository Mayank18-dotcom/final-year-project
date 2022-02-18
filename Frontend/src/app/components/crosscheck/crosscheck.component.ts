import { Component, OnInit, ValueSansProvider } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router";
import { AppService } from "../../app.service";
import {Location} from '@angular/common';

export class NewData {
  public username: any;
  public img: any;
  public previmg: any;
  public medicinename: any;
  public creditScore: any;
  public datenow: any;
  public timenow: any;
  public dateprev: any;
  public timeprev: any;
}

@Component({
  selector: 'app-crosscheck',
  templateUrl: './crosscheck.component.html',
  styleUrls: ['./crosscheck.component.css']
})

export class CrosscheckComponent implements OnInit {
  username:any;
  results:any;
  user:any;
  allData:any;
  loader = false;
  constructor(private rt:Router , private router : ActivatedRoute, private service : AppService,private _location: Location) { }

  ngOnInit() {
    this.loader = true;
    var ad = [];
    this.service.getadministrator().subscribe(res=>{
      this.results = res;
      // console.log(this.results);
      this.results.forEach(function (value){
        // console.log(value.username);
        var un = value.username;
        var cs = value.creditScore;
        value.trackingdata.forEach(function (value2){
          var d = new NewData();
          d.username = un;
          d.img = value2.current_img;
          d.previmg = value2.previous_img;
          d.medicinename = value2.medname;
          d.creditScore = cs;
          d.datenow = value2.current_date;
          d.timenow = value2.current_time;
          d.dateprev = value2.previous_date;
          d.timeprev = value2.previous_time;
          ad.push(d);
        })
      })
      this.allData = ad;
    })
    console.log(this.allData);
    this.loader = false;
  }
  getLinkInfo(user){
    this.user = user;
  }
  creditInc(){
    this.service.updatemaincount(this.user).subscribe(res=>{
      window.location.reload();
    })
  }
  creditDec(){
    this.service.updatemaincountdec(this.user).subscribe(res=>{
      window.location.reload();
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  username : any;
  constructor(public router:Router) { }

  ngOnInit() {
    this.username = JSON.parse(window.localStorage.getItem('un'));
    console.log(this.username);
  }
  check(){
    if(this.username === null){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/admin/',this.username]);
    }
  }

}

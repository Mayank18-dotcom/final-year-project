import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from "./components/signup/signup.component";
import { AdmindashComponent } from "./components/admindash/admindash.component";
// import { StatsComponent } from "./components/stats/stats.component";
import { AuthGuard } from "./auth.guard";
import { HomeComponent } from './components/home/home.component';
import { CrosscheckComponent } from './components/crosscheck/crosscheck.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { DailyreminderComponent } from './components/dailyreminder/dailyreminder.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { RenewalreminderComponent } from './components/renewalreminder/renewalreminder.component';

const routes: Routes = [
  {path:'',component:MainpageComponent},
  {path:'form',component:DailyreminderComponent,canActivate:[AuthGuard]},
  {path:'appointment',component:AppointmentComponent,canActivate:[AuthGuard]},
  {path:'medicinereminder',component:RenewalreminderComponent,canActivate:[AuthGuard]},
  {path:'adminmain',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'admin/:username',component:AdmindashComponent,canActivate:[AuthGuard]},
  {path:'admins/post',component:CrosscheckComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

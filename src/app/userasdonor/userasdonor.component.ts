import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donor } from '../donor';
import { NgForm } from '@angular/forms';
import { DonorService } from '../donor.service';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-userasdonor',
  templateUrl: './userasdonor.component.html',
  styleUrls: ['./userasdonor.component.css']
})
export class UserasdonorComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  msg = '';
  donor = new Donor();
  profileDetails : Observable<User[]> | undefined;

  constructor(private _router : Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void 
  {
    this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    }   
    this.loggedUser = this.tempUser;
    this.msg = '';
    this.getProfileDetails(this.loggedUser);
  }
  
  getProfileDetails(loggedUser :string){
    this.profileDetails=this.donorService.getProfileDetails(this.loggedUser);
    console.log(this.profileDetails);
  }

  navigateHome()
  {
    this._router.navigate(['/userdashboard']);
  }

  addDonor()
  {
    this.donorService.requestForAddingDonor(this.donor).subscribe(
      data => {
        console.log("Added as a Donor Successfully");
        this.msg = "Donor Added Successfully !!!";
        this._router.navigate(['/userdashboard']);
      },
      error => {
        console.log("Process Failed");
        console.log(error.error);
      }
    )
  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAPIService } from 'src/app/shared/services/user-api.service';


@Component({
  selector: 'app-manage-temple',
  templateUrl: './manage-temple.component.html',
  styleUrls: ['./manage-temple.component.scss']
})
export class ManageTempleComponent implements OnInit {
  constructor(private router: Router, public apiclass: UserAPIService) {
    this.apiclass.appcommanconfig().subscribe((resp) => {
      console.log(resp);
      const Resp: any = resp;
      const temp_postobj: {TempleID: string} = {TempleID: Resp.templeID};

      this.apiclass.callAPI('gettempleaddressdetails.php', temp_postobj).subscribe((templeresp) => {
          const tempresp: any = templeresp;
          this.templeobj = tempresp[0];
      });
  });
   }
  imagelocation: any;
  appconfigdata: any;
templeobj: any;
'';

  ngOnInit(): void {
    this.imagelocation = this.apiclass.imageurl;

    // gettempleaddressdetails.php
  }
  addeventFunction() {
    debugger;
    this.router.navigate(['/add-event']);
  }
  opengalFunction() {
    this.router.navigate(['/temple-image']);
  }}

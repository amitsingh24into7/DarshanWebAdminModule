import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { UserAPIService } from 'src/app/shared/services/user-api.service';
import { EventTimeFormComponent } from '../event-time-form/event-time-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DonationUrlFormComponent } from '../donation-url-form/donation-url-form.component';
import { UpdateEventComponent } from '../update-event/update-event.component';
import { EventImageComponent } from '../event-image/event-image.component';
@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {
  eventobj: any;
  imagelocation: any;
  event_timeobj: any;
  ve_timelist: {userid: string, eventid: string} = {userid: '', eventid: ''};
  appconfigdata: any;
  loginuserinfo: any;
  public configobj: {configtype: string} = {configtype: 'LANGUAGE'};
  resp_lang: any;
  resp_Donation_obj: any;
  timestamp: any;
  constructor(public router: Router, private location: Location, public apiclass: UserAPIService, public dialog: MatDialog) {
    this.timestamp = Math.floor(Date.now() / 1000);


   }

  ngOnInit(): void {


this.onloadeFunction();

  }

  onloadeFunction() {
    this.eventobj = this.location.getState();
    debugger;
    this.imagelocation = this.apiclass.imageurl;
    this.apiclass.appcommanconfig().subscribe((res) => {
      this.appconfigdata = res;
      this.ve_timelist.eventid = this.eventobj.EventsID;

      const tempuser = this.apiclass.getlocaldata('APIlogininfo');
      this.loginuserinfo = tempuser.user;
      this.ve_timelist.userid = this.loginuserinfo.ID;
        this.apiclass.callAPI('geteventtimelistbyeventid.php', this.ve_timelist).subscribe((resp_time => {
          debugger;
          this.event_timeobj = resp_time;
          this.apiclass.callAPI('get_t_e_payment_url.php', {userid: this.loginuserinfo.ID, eventid: this.eventobj.EventsID}).subscribe((resp_Donation_obj => {
            debugger;
            this.resp_Donation_obj = resp_Donation_obj;
            this.timestamp = Math.floor(Date.now() / 1000);
          }));
        }));
      debugger;
    });
    this.apiclass.callAPI('getconfigdata.php', this.configobj).subscribe((resp_lang => {
      debugger;
      this.resp_lang = resp_lang;
    }));
  }
  edit_time_Function(item) {
    const dialogRef = this.dialog.open(EventTimeFormComponent, {data: item});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.onloadeFunction();
      }
    });
  }
  delete_time_Function(item) {
    debugger;
    this.apiclass.callAPI('deleteeventstime.php', {templeid: this.appconfigdata.templeID, timeid: item.ID, userid: this.loginuserinfo.ID}).subscribe((resp_ => {
      debugger;
      const resp: any = resp_;
      if (resp.status === 'success') {
        debugger;
          // let index = this.event_timeobj.data.indexOf(item);

          // if(index > -1){
          //   this.event_timeobj.splice(index, 1);
          //   this.event_timeobj=this.event_timeobj
          //   this.onloadeFunction();
          // }
          this.onloadeFunction();
        }
    }));
  }
  editD_utlFunction(item) {
    // tslint:disable-next-line:no-debugger
    debugger;

    const dialogRef = this.dialog.open(DonationUrlFormComponent, {data: item});
    dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    if (result) {
      this.onloadeFunction();
    }
  });
  }

  openDonationUrlDialog(eventobj) {
    const dialogRef = this.dialog.open(DonationUrlFormComponent, {data: eventobj});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      debugger;
       if (result) {
        this.onloadeFunction();
      }
      this.timestamp = Math.floor(Date.now() / 1000);
      // tslint:disable-next-line:no-debugger
    });

  }
addeventImage(tempobj: any) {
  const tempdata = {data: tempobj, fromopen: 'imagetype13'};
  const dialogRef = this.dialog.open(EventImageComponent, {data: tempdata});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // tslint:disable-next-line:no-debugger
      debugger;
      // if (result) {
        this.onloadeFunction();

      // }
    });
  }

  opengalFunction(tempobj) {
    const dialogRef = this.dialog.open(EventImageComponent, {data: tempobj});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // tslint:disable-next-line:no-debugger
      debugger;
      // if (result) {
        this.onloadeFunction();

      // }
    });
  }
  editFunction(tempobj: any) {
    const dialogRef = this.dialog.open(UpdateEventComponent, {data: tempobj});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // tslint:disable-next-line:no-debugger
      debugger;
      if (result) {

      }
    });
  }
  deleteD_utlFunction(item) {
    this.apiclass.callAPI('delete_pay_url.php', item).subscribe((resp_ => {
      // tslint:disable-next-line:no-debugger
      debugger;
      const resp: any = resp_;
      if (resp.status === 'success') {
        debugger;
        this.onloadeFunction();
          // let index = this.resp_Donation_obj.data.indexOf(item);

          // if(index > -1){
          //   this.resp_Donation_obj.splice(index, 1);
          //   this.resp_Donation_obj=this.resp_Donation_obj
          //   this.onloadeFunction();
          // }
        }
    }));
  }
  addDonationFunction(EventsID) {
    debugger;
    const dialogRef = this.dialog.open(DonationUrlFormComponent, {data: {E_ID: EventsID}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.onloadeFunction();
      }
    });
  }
addTimeFunction(EventsID) {
  const dialogRef = this.dialog.open(EventTimeFormComponent, {data: {E_ID: EventsID}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.onloadeFunction();
      }
    });
}

}

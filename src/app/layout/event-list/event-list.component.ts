import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { UserAPIService } from 'src/app/shared/services/user-api.service';
// import { EventTimeFormComponent } from '../event-time-form/event-time-form.component';
import { UpdateEventComponent } from '../update-event/update-event.component';
export interface PeriodicElement {
  EventsID: string;
isvolunteering: string;
isDonation: string;
EventToDate: string;
EventFromDate: string;
photo_album_page_name: string;
photo_album_page_url: string;
video_album_page_name: string;
video_album_page_url: string;
TempleID: string;
EventsType: string;
EventsTitle: string;
EventsShortDesc: string;
EventsLongDesc: string;
OBPossible: string;
OBPageName: string;
OBURL: string;
CreatedBy: string;
CreatedDate: string;
modifiedby: string;
modifieddate: string;
ImageName: string;
ImageURL: string;
EventImageType: string;
}


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;



  // displayedColumns: string[] = ['#']
  displayedColumns: string[] = ['#', 'EventImage', 'EventsTitle', 'EventsShortDesc', 'EventFromDate', 'EventToDate', 'action'];
  // dataSource = ELEMENT_DATA;

  // eventlistobj:any;

  public userID: any;
      private imglocation: any;
  dataSource: any;
  timestamp: number;
  constructor(public apiclass: UserAPIService, private router: Router, public dialog: MatDialog, ) {
    this.timestamp = Math.floor(Date.now() / 1000);
   }

  ngOnInit(): void {
    this.imglocation = this.apiclass.imageurl;
    this.onloadeFunction();
  }
onloadeFunction() {
  this.apiclass.appcommanconfig().subscribe((configresp) => {
    const tempobj: any = configresp;
    const localdata: any = localStorage.getItem('APIlogininfo');
    const tempobj_user: any = JSON.parse(localdata);
    this.userID = tempobj_user.user.ID;
    debugger;


    // if(tempobj_user)
    const tempPostOBJ: {userid: string, templeid: string} = { userid: tempobj_user.user.ID, templeid: tempobj.templeID};
    this.apiclass.callAPI('gettempleeventsbyadmin.php', tempPostOBJ).subscribe((eventresp) => {
       debugger;
       const tempobj: any = eventresp;
       this.dataSource = new MatTableDataSource<any>(tempobj);
       this.dataSource.paginator = this.paginator;
    // this.eventlistobj=eventresp
   });

});
}

detailFunction(tempobj: any) {
  const navigationExtras: NavigationExtras = {
    queryParams: tempobj
};
  this.router.navigate(['/detail-event'], { state: tempobj });
}
copyFunction(copyObj: any) {
    ///// not working
    this.apiclass.callAPI('copy_event.php', copyObj).subscribe((resp) => {
        // let tempobj=[];
        // //inserted_EventsID
        // debugger
        // let tempres:any;
        // tempres=resp;
        // copyObj.EventsID=tempres.inserted_EventsID;
        // tempobj.push(copyObj);

        // for(let i = 0; i < this.dataSource.data.length; i++){
        // tempobj.push(this.dataSource.data[i]);
        // }
        // //this.user.loaderdismiss()
        // this.dataSource=new MatTableDataSource<any>(tempobj);
        // //this.dataSource=tempobj;
        this.onloadeFunction();
        });

}
deleteFunction(tempobj: any) {
    const postobj: {EventsID: string, action: string, userid: string} = {EventsID: tempobj.EventsID, action: '0', userid: this.userID};
    this.apiclass.callAPI('DeleteTempleEvent.php', postobj).subscribe((resp) => {
        const tempresp: any = resp;
        debugger;
        if (tempresp.status === 'success') {
          debugger;
            const index = this.dataSource.data.indexOf(tempobj);

            if (index > -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
            }

        }

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
addEventFunction() {
  this.router.navigate(['/add-event']);
}
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserAPIService } from 'src/app/shared/services/user-api.service';
import { DonationUrlFormComponent } from '../donation-url-form/donation-url-form.component';
import { EventTimeFormComponent } from '../event-time-form/event-time-form.component';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
/** Error when invalid control is dirty, touched, or submitted. */



@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  public currentdateof = new Date();
  public ischeckedCheckbox = true;
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';
  @ViewChild('thUploadFileInput') thuploadFileInput: ElementRef;
  thmyfilename = 'Select File';
  displayedColumns: string[] = ['position', 'title', 'amount', 'action'];
  displayedEventTimeListColumns: string[] = ['position', 'eventDay', 'ftime', 'ttime', 'action'];
  public templeservicetime: any = [];
  public eventpostobj: {EventsTitle: string,
    EventsType: string,
    EventsLongDesc: string,
    EventsShortDesc: string,
    appid: string,
    clientid: string,
    VideoAlbumURL: string,
    userid: string,
    Videoalubumname: string,
    EventsID: string,
    TempleID: string,
    F_EventsDate: string,
    Photoalubumname: string,
    PhotoAlbumURL: string,
    t_EventsDate: string,
    lang: string,
    isvolunteering: string,
    isDonation: string} = {EventsTitle: '',
    EventsType: '',
    EventsLongDesc: '',
    EventsShortDesc: '',
    appid: '',
    clientid: '',
    VideoAlbumURL: '',
    userid: '',
    Videoalubumname: '',
    EventsID: '',
    TempleID: '',
    F_EventsDate: '',
    Photoalubumname: '',
    PhotoAlbumURL: '',
    t_EventsDate: '',
    lang: '',
    isvolunteering: '',
    isDonation: ''};
  // dataSource = ELEMENT_DATA;
public postobj = {configtype: 'POOJA_SERVICE'};
public isLinear = false;
  dataSource: any;
  addeventForm: FormGroup;
  submitted: boolean;
  // tslint:disable-next-line:max-line-length
  public account: {EventsTitle: string, EventsType: string, EventsLongDesc: string, EventsShortDesc: string, appid: string, clientid: string, userid: number, EventsID: string, TempleID: number, F_EventsDate: string, t_EventsDate: string, Photoalubumname: string, PhotoAlbumURL: string, Videoalubumname: string, VideoAlbumURL: string, lang: string, isvolunteering: string,  isDonation: string

  } = {EventsTitle: '', EventsType: '', EventsLongDesc: '', EventsShortDesc: '', appid: '',
  clientid: '',
  VideoAlbumURL: '',
  userid: null,
  Videoalubumname: '', EventsID: '',
  TempleID: null, F_EventsDate: '', Photoalubumname: '', PhotoAlbumURL: '',
  t_EventsDate: '',
  lang: '',
  isvolunteering: '',
  isDonation: ''
};
public donationurlboj: any = new MatTableDataSource<any>();
public eventtimeboj: any = new MatTableDataSource<any>();
  img12_Base64Path: any;
  appconfigdata: any;
  loginuserinfo: any;
  public img13_Base64Path: any = [];
  public tomindate: any;
  previousUrls: string;
  currentUrl: string;
  constructor(private _formBuilder: FormBuilder, private router: Router, public apiclass: UserAPIService,  private location: Location, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.submitted = false;
    debugger;
    // this.router.events
    // .pipe(filter((e: any) => e instanceof RoutesRecognized),
    //     pairwise()
    // ).subscribe((e: any) => {
    //  this.previousUrl = e[0].urlAfterRedirects;
    //     console.log(e[0].urlAfterRedirects); // previous url
    // });

     this.previousUrls = this.router.url;
    // this.previousUrl = this.currentUrl;

    // router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     if (this.currentUrl) {

    //         this.previousUrls = this.currentUrl;

    //       this.currentUrl = event.url;
    //     }
    //     this.currentUrl = event.url;
    //   }
    // });
  }

  ischecked() {
    alert();
  }
  ngOnInit(): void {
    let localobj: any[];
    localobj = this.apiclass.getlocaldata('donationurlboj');
    debugger;
    console.log(localobj);
    // this.donationurlboj=[localobj];
    if (localobj != null) {
      localobj.forEach(element => {
        this.donationurlboj.data.push(element);
      });
    }
    // event time list-----------------
    let et_localobj: any[];
     et_localobj = this.apiclass.getlocaldata('addeeventTimeObj');
     if (et_localobj != null) {
      et_localobj.forEach(element => {
        this.eventtimeboj.data.push(element);
      });
    }
    const temp_ev = JSON.parse(this.apiclass.getlocaldata('addtempleevent'));
      if (temp_ev) {
        this.account = temp_ev;
      }
    // this.donationurlboj.push(localobj);
    this.addeventForm = this.formBuilder.group({
      EventsTitle: [this.account.EventsTitle, Validators.required],
      EventsShortDesc: [this.account.EventsShortDesc, Validators.required],
      EventsType: [ this.account.EventsType, Validators.required],
      isvolunteering: ['Yes', Validators.required],
      isDonation: ['Yes', Validators.required],
      fpicker: [this.account.F_EventsDate, Validators.required],
      tpicker: [this.account.t_EventsDate, Validators.required],
      p_album_n: [this.account.PhotoAlbumURL],
      p_url_n: [ this.account.Photoalubumname],
      v_album_n: [this.account.Videoalubumname],
      v_url_n: [this.account.VideoAlbumURL],
      l_Description: [ this.account.EventsLongDesc]
  });

    this.apiclass.callAPI('getconfigdata.php', this.postobj).subscribe((eventresp) => {
      debugger;
      this.dataSource = eventresp;
   // this.eventlistobj=eventresp
  });
  this.apiclass.appcommanconfig().subscribe((res) => {
    this.appconfigdata = res;
    this.eventpostobj.TempleID = this.appconfigdata.templeID;
    this.eventpostobj.appid = this.appconfigdata.APPID;
    this.eventpostobj.clientid = this.appconfigdata.CLIENTID;
    const tempuser = this.apiclass.getlocaldata('APIlogininfo');
    this.loginuserinfo = tempuser.user;
    this.eventpostobj.userid = this.loginuserinfo.ID;

    debugger;
  });
  }
  gobackFunction() {
    this.location.back();
  }
  //
  get f() { return this.addeventForm.controls; }
  onClickSubmit() {
    debugger;
    this.submitted = true;

        // stop here if form is invalid
        if (this.addeventForm.invalid) {
            return;
        }
   this.account.EventsTitle = this.f.EventsTitle.value;
   this.account.EventsShortDesc = this.f.EventsShortDesc.value;
   this.account.EventsLongDesc = this.f.l_Description.value;
   this.account.EventsType = this.f.EventsType.value;
   this.account.F_EventsDate = this.f.fpicker.value;
   this.account.t_EventsDate = this.f.tpicker.value;
   this.account.isvolunteering = this.f.isvolunteering.value;
   this.account.isDonation = this.f.isDonation.value;
   this.account.PhotoAlbumURL = this.f.p_url_n.value;
   this.account.Photoalubumname = this.f.p_album_n.value;
   this.account.VideoAlbumURL = this.f.v_url_n.value;
   this.account.Videoalubumname = this.f.v_album_n.value;
   // localStorage.setItem('addtempleevent',);
    this.apiclass.setlocaldata('addtempleevent', JSON.stringify(this.account));
  }

  openDonationUrlDialog() {
    const dialogRef = this.dialog.open(DonationUrlFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // tslint:disable-next-line:no-debugger
      debugger;
      if (result) {
        const localobj = this.apiclass.getlocaldata('addpaymentURLobj_add');
        // tslint:disable-next-line:no-debugger
        debugger;
        console.log(localobj);
        this.donationurlboj.data.push(localobj);

        this.donationurlboj = new MatTableDataSource<any>(this.donationurlboj.data);
        this.apiclass.setlocaldata('donationurlboj', this.donationurlboj.data);
      }
    });

  }
  changefdatefunction(ev) {

   this.tomindate = ev.value;
  }
  openeventtimeForm() {
    const dialogRef = this.dialog.open(EventTimeFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      debugger;
      if (result) {
        const localobj = this.apiclass.getlocaldata('addeeventTimeObj_add');
        debugger;
        console.log(localobj);
        this.eventtimeboj.data.push(localobj);

        this.eventtimeboj = new MatTableDataSource<any>(this.eventtimeboj.data);
        this.apiclass.setlocaldata('addeeventTimeObj', this.eventtimeboj.data);
      }
    });
  }
  deleteFunction(donationobj) {
    // this.donationurlboj.filter=
    const index = this.donationurlboj.data.indexOf(donationobj);
  debugger;
    if (index > -1) {
      // this.donationurlboj.splice(index, 1);
      this.donationurlboj.data.splice(index, 1);
      this.donationurlboj = new MatTableDataSource<any>(this.donationurlboj.data);
      // this.donationurlboj.data=this.donationurlboj
      this.apiclass.setlocaldata('donationurlboj', this.donationurlboj.data);
    }
  }


  event_time_deleteFunction(donationobj) {
    const index = this.eventtimeboj.data.indexOf(donationobj);
    debugger;
      if (index > -1) {
        // this.donationurlboj.splice(index, 1);
        this.eventtimeboj.data.splice(index, 1);
        this.eventtimeboj = new MatTableDataSource<any>(this.eventtimeboj.data);
        // this.donationurlboj.data=this.donationurlboj
        this.apiclass.setlocaldata('addeeventTimeObj', this.eventtimeboj.data);
      }
  }

  thfileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {


      this.thmyfilename = '';
      Array.from(fileInput.target.files).forEach((file: File) => {
        console.log(file);
        this.thmyfilename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          debugger;
          // Return Base64 Data URL
          this.img13_Base64Path.push(e.target.result) ;

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.thuploadFileInput.nativeElement.value = '';
    } else {
      this.thmyfilename = 'Select File';
    }
  }




  fileChangeEvent(fileInput: any) {
    const reader = new FileReader();
    if (fileInput.target.files && fileInput.target.files[0]) {

        const file = fileInput.target.files[0];

      const img = new Image();
      img.src = window.URL.createObjectURL( file );

      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        debugger;
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL( img.src );

        if ( width <= 1000 && height <= 250 ) {
           alert('size should be 1000*250 px');
        } else {
            this.myfilename = '';
            Array.from(fileInput.target.files).forEach((file: File) => {
              console.log(file);
              this.myfilename += file.name + ',';
            });

            // const reader = new FileReader();
            // reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {
                debugger;
                // Return Base64 Data URL
                this.img12_Base64Path = e.target.result;

              };
           // };
            reader.readAsDataURL(fileInput.target.files[0]);

            // Reset File Input to Selct Same file again
            this.uploadFileInput.nativeElement.value = '';
        }
      };
    } else {
      this.myfilename = 'Select File';
    }
  }
  insertEventFunction() {
    const postobj: any = [];
    this.eventpostobj.EventsTitle = this.account.EventsTitle;
    this.eventpostobj.EventsShortDesc = this.account.EventsShortDesc;
    this.eventpostobj.EventsLongDesc = this.account.EventsLongDesc;
    this.eventpostobj.EventsType = this.account.EventsType;
    this.eventpostobj.F_EventsDate = this.account.F_EventsDate;
    this.eventpostobj.t_EventsDate = this.account.t_EventsDate;
    this.eventpostobj.isvolunteering = this.account.isvolunteering;
    this.eventpostobj.isDonation = this.account.isDonation;
    this.eventpostobj.PhotoAlbumURL = this.account.PhotoAlbumURL;
    this.eventpostobj.Photoalubumname = this.account.Photoalubumname;
    this.eventpostobj.VideoAlbumURL = this.account.VideoAlbumURL;
    this.eventpostobj.Videoalubumname = this.account.Videoalubumname;
    // this.eventpostobj.TempleID=
    // this.eventpostobj.userid=
    postobj.push(this.eventpostobj);
const temp_event_timeobj: {clientid: string,
  appid: string,
  templeid: string,
  eventtimeid: string,
  Day: string,
  FromTime: string,
  ToTime: string,
  userid: string,
  timzone: string,
  Details: string,
  Remarks: string,
  servicetimeid: string,
  EventsDate: string,
  EventsType: string} = {clientid: '',
    appid: '',
    templeid: '',
    eventtimeid: '',
    Day: '',
    FromTime: '',
    ToTime: '',
    userid: '',
    timzone: '',
    Details: '',
    Remarks: '',
    servicetimeid: '',
    EventsDate: '',
    EventsType: ''};
    const tempobj = this.apiclass.getlocaldata('addeeventTimeObj');
    tempobj.forEach(element => {
      console.log(element);
      temp_event_timeobj.Day = element.Day;
      temp_event_timeobj.Details = element.Details;
      // temp_event_timeobj.FromTime=(moment(element.FromTime)).format('HH:mm a')
      temp_event_timeobj.FromTime = element.FromTime;
      temp_event_timeobj.Remarks = element.Remarks;
      temp_event_timeobj.timzone = element.Timezone;
      // temp_event_timeobj.ToTime=(moment(element.ToTime)).format('HH:mm a')
      temp_event_timeobj.ToTime = element.ToTime;
      temp_event_timeobj.EventsDate = element.epicker;
      this.templeservicetime.push(temp_event_timeobj);

    });
    const temp: {templeservicetime: any[]} = {templeservicetime: this.templeservicetime};
    postobj.push(temp);
    const tempDonationUrl: {title: string,
    url: string,
    desc: string,
    amount: string,
    remarks: string} = { title: '',
      url: '',
      desc: '',
      amount: '',
      remarks: ''};
      const durl: any = [];
      const d_url = this.apiclass.getlocaldata('donationurlboj');
      d_url.forEach(element => {
        tempDonationUrl.title = element.title;
        tempDonationUrl.url = element.url;
        tempDonationUrl.amount = element.amount;
        tempDonationUrl.remarks = element.remarks;
        tempDonationUrl.desc = element.l_Description;
        durl.push(tempDonationUrl);
      });

      postobj.push([tempDonationUrl]);
      const photo12: {photo12: any[], photo13: any[], isbanner: boolean} = {photo12: [this.img12_Base64Path], photo13: [this.img13_Base64Path], isbanner: this.ischeckedCheckbox};
      postobj.push(photo12);
    debugger;
    this.apiclass.callAPI('inserttempleevents.php', postobj).subscribe((resp) => {
      debugger;
      const res: any = resp;
      if (res.status === 'success') {
        this.router.navigate(['/event-list']);
        localStorage.removeItem('donationurlboj');
        localStorage.removeItem('addeeventTimeObj');
        localStorage.removeItem('addtempleevent');
      }
      // console.log(resp)
    });
  }
  checkedfunction(event) {
    if (this.ischeckedCheckbox === true) {
      this.ischeckedCheckbox = false;
    } else {
      this.ischeckedCheckbox = true;
    }
    // this.ischeckedCheckbox=false
    // debugger
    // console.log(JSON.stringify(event))
    // alert();
  }
}

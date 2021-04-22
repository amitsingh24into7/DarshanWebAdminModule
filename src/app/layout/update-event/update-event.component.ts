import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAPIService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  // public frommindate=new Date();
  public eventpostobj: {EventsID: string,
    isvolunteering: string,
    isDonation: string,
    EventToDate: string,
    EventFromDate: string,
    photo_album_page_name: string,
    photo_album_page_url: string,
    video_album_page_name: string,
    video_album_page_url: string,
    TempleID: string,
    EventsType: string,
    EventsTitle: string,
    EventsShortDesc: string,
    EventsLongDesc: string,
    OBPossible: string,
    OBPageName: string,
    OBURL: string,
    CreatedBy: string,
    CreatedDate: string,
    modifiedby: string,
    modifieddate: string,
    ImageName: string,
    ImageURL: string,
    EventImageType: string} = {EventsID: '',
    isvolunteering: '',
    isDonation: '',
    EventToDate: '',
    EventFromDate: '',
    photo_album_page_name: '',
    photo_album_page_url: '',
    video_album_page_name: '',
    video_album_page_url: '',
    TempleID: '',
    EventsType: '',
    EventsTitle: '',
    EventsShortDesc: '',
    EventsLongDesc: '',
    OBPossible: '',
    OBPageName: '',
    OBURL: '',
    CreatedBy: '',
    CreatedDate: '',
    modifiedby: '',
    modifieddate: '',
    ImageName: '',
    ImageURL: '',
    EventImageType: ''};
  public postobj = {configtype: 'POOJA_SERVICE'};
  addeventForm: FormGroup;
  public tomindate: any;
  public dataSource: any;
  public eventobj: any;
  constructor(private formBuilder: FormBuilder, public apiclass: UserAPIService, public dialogRef: MatDialogRef<UpdateEventComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.eventobj = data;
      console.log(JSON.stringify( data));
     }

  ngOnInit(): void {

    this.apiclass.callAPI('getconfigdata.php', this.postobj).subscribe((eventresp) => {
      debugger;
      this.dataSource = eventresp;
   // this.eventlistobj=eventresp
  });
//   "EventsID":"213",
// "isvolunteering":"Yes",
// "isDonation":"Yes",
// "EventToDate":"2021-02-02",
// "EventFromDate":"2021-01-31",
// "photo_album_page_name":"",
// "photo_album_page_url":"",
// "video_album_page_name":"",
// "video_album_page_url":"",
// "TempleID":"105",
// "EventsType":"2",
// "EventsTitle":"TestEvents",
// "EventsShortDesc":"TestEvent TestEvent TestEvent TestEvent",
// "EventsLongDesc":"",
// "OBPossible":"0",
// "OBPageName":"",
// "OBURL":"",
// "CreatedBy":"124",
// "CreatedDate":"2021-02-01",
// "modifiedby":null,
// "modifieddate":null,
// "ImageName":"Events_Banner_298.jpeg",
// "ImageURL":"darshanapp/uploadFiles/105_uploadFiles/Events_Banner_298.jpeg",
// "EventImageType":"12"

    this.addeventForm = this.formBuilder.group({
      EventsTitle: [this.eventobj.EventsTitle, Validators.required],
      EventsShortDesc: [this.eventobj.EventsShortDesc, Validators.required],
      EventsType: [ this.eventobj.EventsType, Validators.required],
      isvolunteering: [this.eventobj.isvolunteering, Validators.required],
      isDonation: [this.eventobj.isDonation, Validators.required],
      fpicker: [this.eventobj.EventFromDate, Validators.required],
      tpicker: [this.eventobj.EventToDate, Validators.required],
      p_album_n: [this.eventobj.photo_album_page_name],
      p_url_n: [ this.eventobj.photo_album_page_url],
      v_album_n: [this.eventobj.video_album_page_name],
      v_url_n: [this.eventobj.video_album_page_url],
      l_Description: [this.eventobj.EventsLongDesc]
  });

  }
  get f() { return this.addeventForm.controls; }
  changefdatefunction(ev) {

    this.tomindate = ev.value;
   }
  onClickSubmit() {
    this.eventobj.EventsTitle = this.f.EventsTitle.value;
    this.eventobj.EventsShortDesc = this.f.EventsShortDesc.value;
    this.eventobj.EventsLongDesc = this.f.l_Description.value;
    this.eventobj.EventsType = this.f.EventsType.value;
    this.eventobj.EventFromDate = this.f.fpicker.value;
    this.eventobj.EventToDate = this.f.tpicker.value;
    this.eventobj.isvolunteering = this.f.isvolunteering.value;
    this.eventobj.isDonation = this.f.isDonation.value;
    this.eventobj.photo_album_page_url = this.f.p_url_n.value;
    this.eventobj.photo_album_page_name = this.f.p_album_n.value;
    this.eventobj.video_album_page_url = this.f.v_url_n.value;
    this.eventobj.video_album_page_name = this.f.v_album_n.value;
    this.eventobj.lang = 'English';
    this.apiclass.callAPI('updateeventsmain.php', this.eventobj).subscribe((resp) => {
      debugger;

      // let respobj:any=resp
      // if(respobj.status== "success")

    });
  }
}

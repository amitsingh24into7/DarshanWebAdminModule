import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAPIService } from 'src/app/shared/services/user-api.service';
import { UpdateEventComponent } from '../update-event/update-event.component';

@Component({
  selector: 'app-event-image',
  templateUrl: './event-image.component.html',
  styleUrls: ['./event-image.component.scss']
})
export class EventImageComponent implements OnInit {
  public eventobj: any;
  public myfilename: string;
  public img12_Base64Path: any;
  public userID: any;
  imagetype: boolean;
  imageresp: any;
  imagelocation: string;
  public img13_Base64Path: any = [];
  thmyfilename: string;

  constructor(private formBuilder: FormBuilder, public apiclass: UserAPIService, public dialogRef: MatDialogRef<UpdateEventComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.eventobj = data;
      console.log(JSON.stringify( data));
     }


  ngOnInit(): void {
    this.imagelocation = this.apiclass.imageurl;
    // geteventsimage.php
    const localdata: any = localStorage.getItem('APIlogininfo');
    // tslint:disable-next-line:prefer-const
    let tempobj_user: any = JSON.parse(localdata);
    this.userID = tempobj_user.user.ID;
    // tslint:disable-next-line:no-debugger
    if (this.eventobj.fromopen) {
      const tempobj = { eventid: this.eventobj.data.EventsID, userid: this.userID };
      this.imagetype = true;
      this.apiclass.callAPI('geteventsimage.php', tempobj).subscribe((resp) => {

        // tslint:disable-next-line:no-debugger
        debugger;

        const respobj: any = resp;
        // tslint:disable-next-line:whitespace
        this.imageresp = respobj;

      });
    } else {
      this.imagetype = false;
    }
    debugger;

  }


  fileChangeEvent(fileInput: any) {
    const reader = new FileReader();
    if (fileInput.target.files && fileInput.target.files[0]) {

        const file = fileInput.target.files[0];

      const img = new Image();
      img.src = window.URL.createObjectURL( file );

      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        // tslint:disable-next-line:no-debugger
       // debugger;
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL( img.src );
       // if ( width  && height ) {
        // if ( width <= 1000 && height <= 250 ) {
           // alert('size should be 1000*250 px');
      //  } else {
            this.myfilename = '';
            // tslint:disable-next-line:no-shadowed-variable
            Array.from(fileInput.target.files).forEach((file: File) => {
              console.log(file);
              this.myfilename += file.name + ',';
            });

            // const reader = new FileReader();
            // reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              this.img12_Base64Path = e.target.result;
              // image.onload = rs => {
              //   // tslint:disable-next-line:no-debugger
              //   debugger;
              //   // Return Base64 Data URL
              //   this.img12_Base64Path = e.target.result;

              // };
           // };
            reader.readAsDataURL(fileInput.target.files[0]);

            // Reset File Input to Selct Same file again
           // this.uploadFileInput.nativeElement.value = '';
       // }
      };
    } else {
      this.myfilename = 'Select File';
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
          // tslint:disable-next-line:no-debugger
          debugger;
          // Return Base64 Data URL
          this.img13_Base64Path.push(e.target.result) ;

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      // this.thuploadFileInput.nativeElement.value = '';
    } else {
      this.thmyfilename = 'Select File';
    }
  }


submitfunction() {
  // tslint:disable-next-line:no-debugger
  debugger;
  // tslint:disable-next-line:no-unused-expression
  this.eventobj;
  // tslint:disable-next-line:max-line-length


  // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:prefer-const
  // tslint:disable-next-line:max-line-length
  const temppostobj: { EventsID: string, photo12: any[], photo13: [[]], userid: string, ImageID: string, imagetype: string, isbanner: boolean; } = { EventsID: this.eventobj.EventsID, photo12: [this.img12_Base64Path], photo13: [[]], userid: this.userID, ImageID: '', imagetype: '12', isbanner: true };
  this.apiclass.callAPI('updateteventsimage.php', temppostobj).subscribe((respobj) => {});
  }


  thsubmitfunction() {
    // tslint:disable-next-line:no-debugger
    debugger;
    // tslint:disable-next-line:no-unused-expression
    // this.eventobj;
    // tslint:disable-next-line:max-line-length


    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:max-line-length
    const temppostobj: { EventsID: string, photo12: any[], photo13: [[]], userid: string, ImageID: string, imagetype: string, isbanner: boolean; } = { EventsID: this.eventobj.data.EventsID, photo12: [], photo13: [this.img13_Base64Path], userid: this.userID, ImageID: '', imagetype: '13', isbanner: false };
    this.apiclass.callAPI('updateteventsimage.php', temppostobj).subscribe((respobj) => {});
    }
}

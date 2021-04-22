import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { UserAPIService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-iframe-load',
  templateUrl: './iframe-load.component.html',
  styleUrls: ['./iframe-load.component.scss']
})
export class IframeLoadComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef
public iframeurl=''
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public apiclass:UserAPIService) { }

  ngOnInit(): void {
    this.iframeurl=this.data;
    console.log(this.iframeurl)
  }
  ngAfterViewInit() {
    debugger
    this.iframe.nativeElement.setAttribute('src', this.iframeurl);
   }

}

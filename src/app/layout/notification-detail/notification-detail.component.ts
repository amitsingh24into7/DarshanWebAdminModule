import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { UserAPIService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {
  imglist: any;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public apiclass:UserAPIService,) { }

  ngOnInit(): void {
    
    console.log(JSON.stringify( this.data))
    this.apiclass.callAPI('gettemplateImageByID.php',{templateID:this.data.id}).subscribe(resp=>{
      this.imglist=resp;
     
    })
  }

}

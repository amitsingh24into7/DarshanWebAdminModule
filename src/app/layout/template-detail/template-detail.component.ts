import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { UserAPIService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {
  templedetail: any;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public apiclass:UserAPIService) { }

  ngOnInit(): void {
   
debugger;
    this.templedetail=this.data
    this.templedetail.message=decodeURI(this.templedetail.message);
    //this.templedetail.message=this.templedetail.message.replace(/\\/g, '');
   
  }


  transform(value: string,replacewith): string {
    return value.replace(replacewith, '');
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserAPIService } from 'src/app/shared/services/user-api.service';
import { IframeLoadComponent } from '../iframe-load/iframe-load.component';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {
public emailtemp_list:any;
public templeobj:any;
public userLogin:any;
@ViewChild(MatPaginator) paginator: MatPaginator;
dataSource: any;
displayedColumns: string[] = ['#','name','action'];
  constructor(public apiclass:UserAPIService,private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.apiclass.callAPI('getemailTemplatateList.php',{}).subscribe((dataresp)=>{
      let tempobj:any=dataresp
      this.emailtemp_list=tempobj
      this.dataSource=new MatTableDataSource<any>(tempobj);
      this.dataSource.paginator = this.paginator;
    })
    this.apiclass.appcommanconfig().subscribe((configresp)=>{
      this.templeobj=configresp
      debugger;
     
    let localdata:any=localStorage.getItem('APIlogininfo')
        this.userLogin=JSON.parse(localdata);
      })
  }
  copyFunction(element){
    let postobj:{additionalinfo:any,formobj:any}={
      additionalinfo:{appid:'',clientid:'',roleid:'',userid:'',templeID:''},
      formobj:{subject:'',message:''}
    }
    debugger
    postobj.additionalinfo.appid=this.templeobj.APPID;
    postobj.additionalinfo.clientid=this.templeobj.CLIENTID;
    postobj.additionalinfo.roleid=this.templeobj.ROLE_ID;
    postobj.additionalinfo.userid=this.userLogin.user.ID;
    postobj.additionalinfo.templeID=this.templeobj.templeID;
    //console.log(this.templeobj);
    //console.log(this.userLogin);
    postobj.formobj.subject='Sample Template';
    postobj.formobj.message=element.filecontent;
    this.apiclass.callAPI('insertTemplate.php',postobj).subscribe((esp)=>{
      if(status=="success"){
        alert('Your template added success !')
      }
      // this.apiclass.callAPI('getemailTemplatateList.php',{}).subscribe((dataresp)=>{
      //   let tempobj:any=dataresp
      //   this.dataSource=new MatTableDataSource<any>(tempobj);
      // this.dataSource.paginator = this.paginator;
      // })
    })
  }
  detailFunction(element){
    //alert(elsement);
    const dialogRef = this.dialog.open(IframeLoadComponent,{data:this.apiclass.rootfolder+'emailTemplate/'+element.filename});

  }

}

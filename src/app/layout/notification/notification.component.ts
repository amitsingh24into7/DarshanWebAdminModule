import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SocialAuthService } from 'angularx-social-login';

import { UserAPIService } from 'src/app/shared/services/user-api.service';
import { IframeLoadComponent } from '../iframe-load/iframe-load.component';
import { NotificationDetailComponent } from '../notification-detail/notification-detail.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public postboj :{userid:string,templeid:string,accessToken:string}={userid:'',templeid:'',accessToken:''}
  userID: any;
  templeID: any;
  displayedColumns: string[] = ['#','Title','DateTime','notificationType', 'Action'];
  dataSource: any;
  googleappUrl: Object;
  constructor(public apiclass:UserAPIService,private dialog: MatDialog,
    private snackBar: MatSnackBar,private authService: SocialAuthService
) { }

  ngOnInit(): void {
    this.onloadeFunction();
    //this.authService.refreshAuthToken(mGoogleApiClient);
  }
  onloadeFunction(){
    this.apiclass.appcommanconfig().subscribe((configresp)=>{
      let tempobj:any=configresp
      let localdata:any=localStorage.getItem('APIlogininfo')
      let tempobj_user:any=JSON.parse(localdata);
      this.userID=tempobj_user.user.ID
      this.templeID=tempobj.templeID
      debugger
      this.postboj.accessToken=tempobj_user.user.authtoken
      this.postboj.templeid=this.templeID
      this.postboj.userid= this.userID
      this.apiclass.callAPI('get_my_notification.php',this.postboj).subscribe((dataResp)=>{
        let tempobj:any=dataResp
        this.dataSource=new MatTableDataSource<any>(tempobj);
        this.dataSource.paginator = this.paginator;
      })
    })

    this.apiclass.callAPI('getappurl.php',{}).subscribe(data=>{
      if(data){
        debugger;
       this.googleappUrl=data
      }
    })
  }
//get_my_notification.php
editFunction(elementobj){
  this.apiclass.appcommanconfig().subscribe((configresp)=>{
    let tempobj:any=configresp
    debugger;
   
  let localdata:any=localStorage.getItem('APIlogininfo')
      let tempobj_user:any=JSON.parse(localdata);
      
      //this.templeID=tempobj.templeID
  let url=this.apiclass.imageurl+'notificationFile/send_notification.php?from=mobileadsapp&accessToken='+tempobj_user.user.authtoken+'&appid='+tempobj.APPID+'&clientid='+tempobj.CLIENTID+'&roleid='+tempobj.ROLE_ID+'&templeid='+this.templeID+'&userid='+this.userID+'&myadsid='+elementobj.id
  //window.open(url, "_blank");
  const dialogRef = this.dialog.open(IframeLoadComponent,{data:url});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    debugger
    if(result){

    }
  })
})
}
deleteFunction(elementobj){
  let confirmval= confirm("Do you want to delete this ads?");
  if (confirmval == true) {
    debugger
  let postvla:{userid:string,id:string}={userid:this.userID,id:elementobj.id};
     this.apiclass.callAPI('deleteNotification.php',postvla).subscribe((datarespobj)=>{
      let tempobj:any=datarespobj
      let index = this.dataSource.data.indexOf(elementobj);
      
      if(tempobj.status=="success"){
        if(index > -1){
          this.dataSource.data.splice(index, 1);
          this.dataSource=new MatTableDataSource<any>(this.dataSource.data);
        }
      }

      
    })
  } else {
    //alert("You pressed oh ho!")
  }
}

detailFunction(elementobj){
  const dialogRef = this.dialog.open(NotificationDetailComponent,{data:elementobj});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    debugger
    if(result){

    }
  })
}
facebookshareFunction(notificationType,subject,message,id){
  var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?description='+subject+'&u='+this.apiclass.imageurl+'darshanapp/ogp/ads_'+id+'.html&picture='+this.apiclass.imageurl+'html_to_pdf_to_img/filename_'+id+'.jpg', 'facebook-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
  if(facebookWindow.focus) { facebookWindow.focus(); }
}

WahtsappshareFunction(notificationType,subject,message,id){
  debugger
  if(notificationType=='Normal'){
    let  whatsappWindow =  window.open('https://web.whatsapp.com/send?text='+message+'%0A'+this.googleappUrl[0]["appshare_for_Admin"]+'%0A%0AAndroid -   '+this.googleappUrl[0]["AppURL"], 'whatsapp-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
    if(whatsappWindow.focus) { whatsappWindow.focus(); }
  }else{
    let whatsappWindow =  window.open('https://web.whatsapp.com/send?text='+this.apiclass.rootfolder+'darshanapp/ogp/ads_'+id+'.html%0A'+this.googleappUrl[0]["appshare_for_Admin"]+'%0A%0AAndroid -   '+this.googleappUrl[0]["AppURL"], 'whatsapp-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
  if(whatsappWindow.focus) { whatsappWindow.focus(); }
  }
}
// fb_share(notificationType,subject,message,id){
//   // if(notificationType=='Normal'){
//   //   var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?description='+message+'&u=&picture=', 'facebook-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
//   //   if(facebookWindow.focus) { facebookWindow.focus(); }
//   // }else{
//     var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?description='+subject+'&u='+this.user.IMAGELOCATION+'darshanapp/ogp/ads_'+id+'.html&picture='+this.user.IMAGELOCATION+'html_to_pdf_to_img/filename_'+id+'.jpg', 'facebook-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
//     if(facebookWindow.focus) { facebookWindow.focus(); }
//  // }
  
//  }

//  whatsapp_share(notificationType,subject,message,id,appurl){
//   if(notificationType=='Normal'){
//     let  whatsappWindow =  window.open('https://web.whatsapp.com/send?text='+message+'%0A'+this.googleappUrl[0]["appshare_for_Admin"]+'%0A%0AAndroid -   '+appurl, 'whatsapp-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
//     if(whatsappWindow.focus) { whatsappWindow.focus(); }
//   }else{
//     let whatsappWindow =  window.open('https://web.whatsapp.com/send?text='+this.user.IMAGELOCATION+'darshanapp/ogp/ads_'+id+'.html%0A'+this.googleappUrl[0]["appshare_for_Admin"]+'%0A%0AAndroid -   '+appurl, 'whatsapp-popup',  'height='+screen.availHeight+',width='+screen.availWidth);
//   if(whatsappWindow.focus) { whatsappWindow.focus(); }
//   }
//  }
sendNotification(){
  this.apiclass.appcommanconfig().subscribe((configresp)=>{
    let tempobj:any=configresp
    let localdata:any=localStorage.getItem('APIlogininfo')
    let tempobj_user:any=JSON.parse(localdata);
    debugger;
  let url= this.apiclass.imageurl+'notificationFile/send_notification.php?from=mobileadsapp&accessToken='+tempobj_user.user.authtoken+'&appid='+tempobj.APPID+'&clientid='+tempobj.CLIENTID+'&email='+tempobj_user.user.UserID+'&templeid='+this.templeID+'&userid='+this.userID+'&username='+tempobj_user.user.UserName;
 // window.open(url, "_blank");
 const dialogRef = this.dialog.open(IframeLoadComponent,{data:url});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    debugger
    if(result){

    }
  })
  })
}
  }

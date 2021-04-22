import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAPIService } from 'src/app/shared/services/user-api.service';
import { IframeLoadComponent } from '../iframe-load/iframe-load.component';

@Component({
  selector: 'app-aarti',
  templateUrl: './aarti.component.html',
  styleUrls: ['./aarti.component.scss']
})
export class AartiComponent implements OnInit {
  appcommancon: any;
  userID: any;
  templeID: any;
  constructor(public apiclass: UserAPIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.onloadeFunction();
  }
  onloadeFunction() {
    this.apiclass.appcommanconfig().subscribe((configresp) => {
      // tslint:disable-next-line:prefer-const
      let tempobj: any = configresp;
      // tslint:disable-next-line:no-debugger
      debugger;
      this.appcommancon = configresp;
      // tslint:disable-next-line:prefer-const
      let localdata: any = localStorage.getItem('APIlogininfo');
      // tslint:disable-next-line:prefer-const
      let tempobj_user: any = JSON.parse(localdata);
      this.userID = tempobj_user.user.ID;
      this.templeID = tempobj.templeID;
      // tslint:disable-next-line:no-debugger
      debugger ;
    });

  }

  reminderFunction() {

   // tslint:disable-next-line:max-line-length
   const url = 'https://motleystack.com/darshanapp_common_dev/fb_post/striming_Schedul.php?from=mobileadsapp&appid=' + this.appcommancon.APPID + '&clientid=' + this.appcommancon.CLIENTID + '&templeID=' + this.appcommancon.templeID + '&aarati=aarati&roleid=' + this.appcommancon.ROLE_ID + '&userID=' + this.userID;


      const dialogRef = this.dialog.open(IframeLoadComponent, {data: url});

      dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          // tslint:disable-next-line:no-debugger
          debugger;
      });

  }
  goliveFunction() {
    this.launchExternalApp('fb://', 'com.facebook.lite', 'fb://page/', 'https://www.facebook.com/', '');
  }
  liveFunction() {
   // 'https://ways2worship.com/video_str/?from=mobileadsapp&appid=DARSHANAPP&clientid=CLIENTID6&templeID=105&userID=117';
   // tslint:disable-next-line:max-line-length
   const _httpUrl = 'https://ways2worship.com/video_str/?from=mobileadsapp&appid=' + this.appcommancon.APPID + '&clientid=' + this.appcommancon.CLIENTID + 'templeID=' + this.appcommancon.templeID + '&userID=' +  + this.userID;
   window.open(_httpUrl, '_blank');
  }


  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;
      // const browser: ThemeableBrowserObject = this.themeableBrowser.create(httpUrl + username, '_blank', this.options);

      window.open(httpUrl + username, '_blank');
  }
}

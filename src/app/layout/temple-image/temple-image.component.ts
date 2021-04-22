import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-temple-image',
  templateUrl: './temple-image.component.html',
  styleUrls: ['./temple-image.component.scss']
})
export class TempleImageComponent implements OnInit {
  templeimageobj: any;
  userID: any;
  imagelocation: string;

  constructor(public apiclass: UserAPIService) {

   }

  ngOnInit(): void {
    this.imagelocation = this.apiclass.imageurl;

    const localdata: any = localStorage.getItem('APIlogininfo');
      // tslint:disable-next-line:prefer-const
      let tempobj_user: any = JSON.parse(localdata);
      this.userID = tempobj_user.user.ID;
    this.apiclass.appcommanconfig().subscribe((resp) => {
      console.log(resp);
      // tslint:disable-next-line:no-debugger
      debugger ;
      const Resp: any = resp;
      // tslint:disable-next-line:max-line-length
      const temp_postobj: {clientid: string, appid: string, TempleID: string, userid: string} = {clientid: Resp.CLIENTID, appid: Resp.APPID, TempleID: Resp.templeID, userid: this.userID};

      this.apiclass.callAPI('gettempleimages.php', temp_postobj).subscribe((templeresp) => {
          const tempresp: any = templeresp;
          this.templeimageobj = tempresp;
      });
  });
  }
  addTempleImage() {

  }

}

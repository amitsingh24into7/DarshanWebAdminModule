import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAPIService } from '../shared/services/user-api.service';
import { SocialAuthService } from 'angularx-social-login';
import {  GoogleLoginProvider } from 'angularx-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginobj: {userid: string, password: string, provider: string, DeviceID: string} = {
        userid: '', password: '', provider: '', DeviceID: ''
      };
    constructor(private router: Router, public apiclass: UserAPIService, private authService: SocialAuthService) { }

    ngOnInit() { }

    // onLogin() {
    //     this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    //     this.router.navigate(['/dashboard']);
    // }
    onLogin() {
        // this.router.navigateByUrl('/dashboard');
        debugger;
        // this.authService.authState.subscribe((user) => {
        //     console.log(user);
        // })
            this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
                (user) => {
                    console.log(user);
                    debugger;
                  // let userobj=user
                  // console.log(socialPlatform+" sign in data : " , user);
                  localStorage.setItem('logininfo', JSON.stringify(user));
                  this.loginobj.DeviceID = '';
                  this.loginobj.password = '';
                  this.loginobj.provider = 'Google';
                  this.loginobj.userid = user.email;
                //   this.postobj.gmailID=user.id
                //   //this.postobj.facebookid=user.
                //   this.postobj.authtoken=user.authToken
                //   this.postobj.email=user.email
                //   this.postobj.provider='Google'
                //   this.postobj.username=user.name
                //   this.postobj.userid=user.email;
                    // this.utilityService.callAPI()
                    // insertuser.php
                    const  insertovj: {username: string, email: string, userid: string, password: string, appid: string, clientid: string, facebookid: string, gmailID: string, authtoken: string, provider: string, Profileimage: string, app_version: string} = {
                        username: user.name,
                        email: user.email,
                        userid: user.email,
                        password: '',
                        appid: '',
                        clientid: '',
                        facebookid: '',
                        gmailID: user.id,
                        authtoken: user.authToken,
                        provider: 'Google',
                        Profileimage: user.photoUrl,
                        app_version: ''};


                    // this.apiclass.callAPI('insertuser.php',insertovj).subscribe((resp)=>{
                    this.apiclass.callAPI('getuserdetails.php', this.loginobj).subscribe((resp) => {
                        // this.servicelistobj=resp
                        debugger;
                        const tempresp: any = resp;
                        if (tempresp.user.user_role === 'admin') {
                            console.log(JSON.stringify(resp));
                            localStorage.setItem('APIlogininfo', JSON.stringify(resp));
                            this.apiclass.isLogin = true;
                            localStorage.setItem('isLoggedin', 'true');
                           // this.router.navigateByUrl('/dashboard');
                            this.router.navigate(['/dashboard']);
                        } else {
                            alert('you are not admin person !');
                        }
                    });
               // })
                });

}
}

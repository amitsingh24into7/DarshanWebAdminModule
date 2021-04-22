import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserAPIService } from 'src/app/shared/services/user-api.service';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;
    templeDetailOBJ: any;
    constructor(public router: Router, private translate: TranslateService,public apiclass:UserAPIService,) {
        this.router.events.subscribe(val => {
            //debugger
           if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
                
           }else{
            if (this.isToggled()) {
                this.toggleSidebar();
                
           }
           }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.apiclass.appcommanconfig().subscribe((resp)=>{
            console.log(resp);
            let Resp:any=resp
            let temp_postobj:{TempleID: string}={TempleID:Resp.templeID}

            this.apiclass.callAPI('gettempleaddressdetails.php',temp_postobj).subscribe((templeresp)=>{
                let tempresp:any=templeresp
                this.templeDetailOBJ=tempresp[0];
            })
        })
    }

    isToggled(): boolean {
        debugger
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.clear();
       
        this.router.navigate(['/login']);
       
           
            
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}

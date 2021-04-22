import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { UserAPIService } from 'src/app/shared/services/user-api.service';
import { IframeLoadComponent } from '../iframe-load/iframe-load.component';
// import { TemplateDetailComponent } from '../template-detail/template-detail.component';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];
    menuobj: Object;
    userID: any;
    templeID: any;
    appcommancon: any;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(public apiclass: UserAPIService, private dialog: MatDialog) {
        this.places = [
            {
                imgSrc: 'assets/images/card-1.jpg',
                place: 'Cozy 5 Stars Apartment',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
                charge: '$899/night',
                location: 'Barcelona, Spain'
            },
            {
                imgSrc: 'assets/images/card-2.jpg',
                place: 'Office Studio',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
                charge: '$1,119/night',
                location: 'London, UK'
            },
            {
                imgSrc: 'assets/images/card-3.jpg',
                place: 'Beautiful Castle',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
                charge: '$459/night',
                location: 'Milan, Italy'
            }
        ];
    }

    ngOnInit() {
        this.apiclass.callAPI('report_Menu.php', {}).subscribe(resp => {
            this.menuobj = resp;
          });
          this.onloadeFunction();
    }
    opendetailPageFunction(menuobj) {
        debugger;
               // tslint:disable-next-line:max-line-length
               // let url=this.apiclass.imageurl+'notificationFile/send_notification.php?from=mobileadsapp&accessToken='+tempobj_user.user.authtoken+'&appid='+tempobj.APPID+'&clientid='+tempobj.CLIENTID+'&roleid='+tempobj.ROLE_ID+'&templeid='+this.templeID+'&userid='+this.userID+'&myadsid='+elementobj.id
        // window.open(url, "_blank");

        const url = menuobj.MenuURL + '?appid=' + this.appcommancon.APPID + '&templeid=' + this.templeID + '&userid=' + this.userID + '&roleid=' + this.appcommancon.ROLE_ID;
        window.open(url, '_blank');
        // const dialogRef = this.dialog.open(IframeLoadComponent,{data:url});

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(`Dialog result: ${result}`);
        //     debugger
        //     if(result){

        //     }
        // })
        // const dialogRef = this.dialog.open(TemplateDetailComponent,{data:menuobj});

        // dialogRef.afterClosed().subscribe(result => {
        //   console.log(`Dialog result: ${result}`);
        //   debugger
        //   if(result){

        //   }
        // })
    }

    onloadeFunction() {
        this.apiclass.appcommanconfig().subscribe((configresp) => {
          const tempobj: any = configresp;
          debugger;
          this.appcommancon = configresp;
          const localdata: any = localStorage.getItem('APIlogininfo');
          const tempobj_user: any = JSON.parse(localdata);
          this.userID = tempobj_user.user.ID;
          this.templeID = tempobj.templeID;
          debugger;

        //   this.apiclass.callAPI('get_my_notification.php',this.postboj).subscribe((dataResp)=>{
        //     let tempobj:any=dataResp
        //     this.dataSource=new MatTableDataSource<any>(tempobj);
        //     this.dataSource.paginator = this.paginator;
        //   })
        });

        // this.apiclass.callAPI('getappurl.php',{}).subscribe(data=>{
        //   if(data){
        //     debugger;
        //    this.googleappUrl=data
        //   }
        // })
      }
}

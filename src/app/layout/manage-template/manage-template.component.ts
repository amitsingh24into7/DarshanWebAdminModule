import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserAPIService } from 'src/app/shared/services/user-api.service';
import { IframeLoadComponent } from '../iframe-load/iframe-load.component';
import { TemplateDetailComponent } from '../template-detail/template-detail.component';

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html',
  styleUrls: ['./manage-template.component.scss']
})
export class ManageTemplateComponent implements OnInit {
  userID: any;
  templeID: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public postboj :{userid:string,templeid:string}={userid:'',templeid:''}
  displayedColumns: string[] = ['#','subject','DateTime','type', 'Action'];
  dataSource: any;
  emailtemp_list: any;
  templeobj: any;
  userLogin: any;
  constructor(public apiclass:UserAPIService,private dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.onloadeFunction()
    this.apiclass.appcommanconfig().subscribe((configresp)=>{
      this.templeobj=configresp
      debugger;
     
    let localdata:any=localStorage.getItem('APIlogininfo')
        this.userLogin=JSON.parse(localdata);
      })
  }
  onloadeFunction(){
    this.apiclass.appcommanconfig().subscribe((configresp)=>{
      let tempobj:any=configresp
      let localdata:any=localStorage.getItem('APIlogininfo')
      let tempobj_user:any=JSON.parse(localdata);
      this.userID=tempobj_user.user.ID
      this.templeID=tempobj.templeID
      debugger
      //this.postboj.accessToken=tempobj_user.user.authtoken
      this.postboj.templeid=this.templeID
      this.postboj.userid= this.userID
      this.apiclass.callAPI('getTemplate.php',this.postboj).subscribe((dataResp)=>{
        let tempobj:any=dataResp
        debugger;
        //fix email Template-----------------
        this.apiclass.callAPI('getemailTemplatateList.php',{}).subscribe((dataresp)=>{
          let tempresp:any=dataresp
          tempresp.forEach(childObj=> {
           // value.checked = parentChecked;
           let tempobjofemail:{id:string,
            subject:string,
           message:string,
            templeID:string,
            userid:string,
            created_by:string,
            type:string,
            created_date:string}={id:'',
              subject:childObj.filename,
             message:childObj.filecontent,
              templeID:'',
              userid:'',
              created_by:'',
              type:'',
              created_date:''}
              debugger
              if(childObj.filename!='..'){
                if(childObj.filename!='.'){
                tempobj.push(tempobjofemail);
                }
              }
             
         });
          
      
        //   this.emailtemp_list=tempobj
        //   this.dataSource=new MatTableDataSource<any>(tempobj);
        //   this.dataSource.paginator = this.paginator;
        this.dataSource=new MatTableDataSource<any>(tempobj);
        this.dataSource.paginator = this.paginator;
         })
        //-----------------------------------
       
      })
    })

    // this.apiclass.callAPI('getappurl.php',{}).subscribe(data=>{
    //   if(data){
    //     debugger;
    //   // this.googleappUrl=data
    //   }
    // })
  }
  addtemplateFunction(){
    //'notificationFile/insertTemplate.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&templeID='+this.account.templeID+'&username='+this.account.username+'&email='+this.account.email+'&userid='+this.account.userid
debugger
    this.apiclass.appcommanconfig().subscribe((configresp)=>{
      let tempobj:any=configresp
      debugger;
     
    let localdata:any=localStorage.getItem('APIlogininfo')
        let tempobj_user:any=JSON.parse(localdata);
        
    let url=this.apiclass.imageurl+'notificationFile/insertTemplate.php?from=webapp&accessToken='+tempobj_user.user.authtoken+'&appid='+tempobj.APPID+'&clientid='+tempobj.CLIENTID+'&roleid='+tempobj.ROLE_ID+'&templeID='+this.templeID+'&userid='+this.userID+'&username='+tempobj_user.user.UserName+'&email='+tempobj_user.user.UserID
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
    postobj.formobj.subject=element.subject;
    postobj.formobj.message=element.message;
    this.apiclass.callAPI('insertTemplate.php',postobj).subscribe((resp)=>{
      let insertResp:any=resp
      if(insertResp.status=="success"){
        alert('Your template added success !')
        this.onloadeFunction()
      }
      // this.apiclass.callAPI('getemailTemplatateList.php',{}).subscribe((dataresp)=>{
      //   let tempobj:any=dataresp
      //   this.dataSource=new MatTableDataSource<any>(tempobj);
      // this.dataSource.paginator = this.paginator;
      // })
    })
  }
  deleteFunction(element){
    let postdata: { userid:string,  id: string } = { 
      userid:this.userID,
      id:element.id
  };
  //this.dataSource=new MatTableDataSource<any>(tempobj);
  let index = this.dataSource.data.indexOf(element);
  this.apiclass.callAPI('delete_Template.php',postdata).subscribe((respdata)=>{
    let tempobj:any=respdata
    if(tempobj.status=="success"){
    if(index > -1){
      this.dataSource.data.splice(index, 1);
      this.dataSource=new MatTableDataSource<any>(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      }
    }
  })
  }

  editFunction(elementobj){
    this.apiclass.appcommanconfig().subscribe((configresp)=>{
      let tempobj:any=configresp
      debugger;
     
    let localdata:any=localStorage.getItem('APIlogininfo')
        let tempobj_user:any=JSON.parse(localdata);
        //'notificationFile/insertTemplate.php?from=mobileadsapp&accessToken='+this.account.accessToken+'&appid='+this.account.appid+'&clientid='+this.account.clientid+'&templeid='+this.account.templeid+'&userid='+this.account.userid+'&roleid='+this.account.roleid+'&templateiID='+templateiID
        //this.templeID=tempobj.templeID
    let url=this.apiclass.imageurl+'notificationFile/insertTemplate.php?from=webapp&accessToken='+tempobj_user.user.authtoken+'&appid='+tempobj.APPID+'&clientid='+tempobj.CLIENTID+'&roleid='+tempobj.ROLE_ID+'&templeID='+this.templeID+'&userid='+this.userID+'&myadsid='+elementobj.id+'&templateiID='+elementobj.id
    //window.open(url, "_blank");
    const dialogRef = this.dialog.open(IframeLoadComponent,{data:url});
  
    dialogRef.afterClosed().subscribe(result => {
      this.onloadeFunction()
      console.log(`Dialog result: ${result}`);
      debugger
      if(result){
  
      }
    })
  })
  }
  detailFunction(element){
    const dialogRef = this.dialog.open(TemplateDetailComponent,{data:element, height: '600px',
    width: '800px'});

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    debugger
    if(result){

    }
  })
  }
}

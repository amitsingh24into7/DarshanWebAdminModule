import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UserAPIService } from 'src/app/shared/services/user-api.service';
import * as moment from 'moment';
@Component({
  selector: 'app-event-time-form',
  templateUrl: './event-time-form.component.html',
  styleUrls: ['./event-time-form.component.scss']
})

export class EventTimeFormComponent implements OnInit {
  events: string[] = [];
  public updateobj:{templeid:string,
    eventtimeid:string,
    Day:string,
    FromTime:string,
    ToTime:string,
    userid:string,
    timzone:string,
    Details:string,
    Remarks:string,
    servicetimeid:string,
    EventsDate:string,
    EventsType:string}={templeid:'',
      eventtimeid:'',
      Day:'',
      FromTime:'',
      ToTime:'',
      userid:'',
      timzone:'',
      Details:'',
      Remarks:'',
      servicetimeid:'',
      EventsDate:'',
      EventsType:''}
 
  //datevalue(ev): EventEmitter<MatDatepickerInputEvent<Date>>;
  submitted: boolean;
  eventtimeForm: FormGroup;
  public dayname:string
  public time_Zone:any;
  epicker = new FormGroup({
    
  })
  event_date: Date;
  public events_t_obj: any;
  loginuserinfo: any;
  constructor(private formBuilder: FormBuilder,public apiclass:UserAPIService,public dialogRef: MatDialogRef<EventTimeFormComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      debugger;
      this.events_t_obj=data
    }
  event_timeobj:{epicker:string,Day:string,FromTime:string,ToTime:string,Timezone:string,Details:string,Remarks:string}={epicker:'',Day:'',FromTime:'',ToTime:'',Timezone:'',Details:'',Remarks:''};

  datevalue(type: string, event: MatDatepickerInputEvent<Date>) {
    //alert();
    this.events.push(`${type}: ${event.value}`);
    var tempevent:any = new Date(event.value);
      var options = { weekday: 'long' };
       this.dayname=tempevent.toLocaleDateString('en-US', options)
      // //alert(ev.month+"/"+ev.day+"/"+ev.year)
      this.eventtimeForm = this.formBuilder.group({
        // Timezone: [this.time_Zone],
         
        //   Details: [''],
        //   Remarks: [''],
        // Day: [this.dayname],
        epicker: [event.value],
        Day: [this.dayname],
        FromTime: [''],
       ToTime: [''],
        Timezone: [this.time_Zone],
        Details: [''],
        Remarks: ['']
      })
  }
//  datevalue(ev){
//    alert(JSON.stringify(ev))

//       // debugger;
//       // var event = new Date(ev);
//       // var options = { weekday: 'long' };
//       // this.dayname=event.toLocaleDateString('en-US', options)
//       // //alert(ev.month+"/"+ev.day+"/"+ev.year)
//       // this.eventtimeForm = this.formBuilder.group({
        
//       //   Day: [this.dayname],})
//     }
  ngOnInit(): void {
    debugger;
    let tempuser=this.apiclass.getlocaldata('APIlogininfo')
    this.loginuserinfo=tempuser.user
    
    if(this.events_t_obj!=null){
      if(this.events_t_obj.E_ID){ ///----single time add according to event ID
        this.apiclass.appcommanconfig().subscribe((configres)=>{
          let templeID:any
          templeID=configres;
          let postobj:{TempleID:string}={TempleID:templeID.templeID}
          this.apiclass.callAPI('get_temple_tine_zone.php',postobj).subscribe((timezonerespobj)=>{
            let temptime_obj:any=timezonerespobj;
          this.time_Zone=temptime_obj.temple_def_time_zone
               var options = { weekday: 'long' };
        var tempevent:any = new Date(this.events_t_obj.E_ID.EventFromDate);
        this.dayname=tempevent.toLocaleDateString('en-US', options)
        
        this.eventtimeForm = this.formBuilder.group({
          
        epicker: [tempevent],
        Day: [this.dayname],
        FromTime: [''],
       ToTime: [''],
        Timezone: [this.time_Zone],
        Details: [''],
        Remarks: ['']
        })
          })
        })



        var options = { weekday: 'long' };
        var tempevent:any = new Date(this.events_t_obj.E_ID.EventFromDate);
        this.dayname=tempevent.toLocaleDateString('en-US', options)
        
        this.eventtimeForm = this.formBuilder.group({
          
        epicker: [tempevent],
        Day: [this.dayname],
        FromTime: [''],
       ToTime: [''],
        Timezone: [this.time_Zone],
        Details: [''],
        Remarks: ['']
        })
      }else{
        this.eventtimeForm = this.formBuilder.group({
          
          // Timezone: [this.time_Zone],
         
          // Details: [''],
          // Remarks: [''],
          // Day: [this.dayname]
          epicker: [this.events_t_obj.EventsDate],
        Day: [this.events_t_obj.Day],
        FromTime: [new Date(this.events_t_obj.FromTime)],
       ToTime: [new Date(this.events_t_obj.ToTime)],
        Timezone: [this.events_t_obj.timzone],
        Details: [this.events_t_obj.Details],
        Remarks: [this.events_t_obj.Remarks]
        })
      }
     
    
    }else{
      this.apiclass.appcommanconfig().subscribe((configres)=>{
        let templeID:any
        templeID=configres;
        let postobj:{TempleID:string}={TempleID:templeID.templeID}
        this.apiclass.callAPI('get_temple_tine_zone.php',postobj).subscribe((timezonerespobj)=>{
          let temptime_obj:any=timezonerespobj;
          this.time_Zone=temptime_obj.temple_def_time_zone
          this.eventtimeForm = this.formBuilder.group({
          
            // Timezone: [this.time_Zone],
           
            // Details: [''],
            // Remarks: [''],
            // Day: [this.dayname]
            epicker: [this.event_date],
          Day: [this.dayname],
          FromTime: [''],
         ToTime: [''],
          Timezone: [this.time_Zone],
          Details: [''],
          Remarks: ['']
          })
            
        })
      })
      let tempobj=JSON.parse(this.apiclass.getlocaldata('addtempleevent'));
      debugger
      this.event_date = new Date(tempobj.F_EventsDate);
      
        var options = { weekday: 'long' };
        this.dayname=this.event_date.toLocaleDateString('en-US', options)
      this.eventtimeForm = this.formBuilder.group({
        epicker: [this.event_date],
        Day: [this.dayname],
        FromTime: [''],
       ToTime: [''],
        Timezone: [''],
        Details: [''],
        Remarks: ['']
    });
    }
    
  // this.eventtimeForm = this.formBuilder.group({
  //   epicker: [event]})
   }
  get f() { return this.eventtimeForm.controls; }
  onClickSubmit(){
    debugger;
    if(this.events_t_obj!=null){
      if(this.events_t_obj.E_ID){
        this.apiclass.appcommanconfig().subscribe((configres)=>{
          let temple_ID:any
          temple_ID=configres;
          //var t_id=
          let insert_time_obj:{
      
            templeid:string,
            eventtimeid:string,
            Day:string,
            FromTime:string,
            ToTime:string,
            userid:string,
            timzone:string,
            Details:string,
            Remarks:string,
            servicetimeid:string,
            EventsDate:string,
            EventsType:string,
            }={
            templeid:temple_ID.templeID,
            eventtimeid:this.events_t_obj.E_ID.EventsID,
            Day:this.f.Day.value,
            FromTime:this.f.FromTime.value,
            ToTime:this.f.ToTime.value,
            userid:this.loginuserinfo.ID,
            timzone:this.f.Timezone.value,
            Details:this.f.Details.value,
            Remarks:this.f.Remarks.value,
            servicetimeid:'',
            EventsDate:this.f.epicker.value,
            EventsType:this.events_t_obj.E_ID.EventsType}
            this.apiclass.callAPI('inserteventtimingbyeventid.php',insert_time_obj).subscribe((res_data)=>{
              debugger;
                    })
        })
        
    
      
      }else{
        this.updateobj.templeid=this.events_t_obj.TempleID
      this.updateobj.eventtimeid=this.events_t_obj.EventsID
      this.updateobj.Day=this.f.Day.value
      this.updateobj.FromTime=this.f.FromTime.value
      this.updateobj.ToTime=this.f.ToTime.value
      this.updateobj.userid=this.loginuserinfo.ID
      this.updateobj.timzone=this.f.Timezone.value
      this.updateobj.Details=this.f.Details.value
      this.updateobj.Remarks=this.f.Remarks.value
      this.updateobj.servicetimeid=this.events_t_obj.ID
      this.updateobj.EventsDate=this.f.epicker.value
      //this.updateobj.EventsType=''
      this.apiclass.callAPI('updateeventstiming.php',this.updateobj).subscribe((res_data)=>{
debugger;
      })
      }
      
    }
    else{
      debugger
      this.submitted = true;
  
          // stop here if form is invalid
          if (this.eventtimeForm.invalid) {
              return;
          }
         console.log(this.f);
          //this.payurlobj.amount=this.f.amount.value
          this.event_timeobj.epicker=this.f.epicker.value
          this.event_timeobj.Day=this.f.Day.value
          this.event_timeobj.FromTime=this.f.FromTime.value
          this.event_timeobj.ToTime=this.f.ToTime.value
          this.event_timeobj.Timezone=this.f.Timezone.value
          this.event_timeobj.Details=this.f.Details.value
          this.event_timeobj.Remarks=this.f.Remarks.value
          this.apiclass.setlocaldata('addeeventTimeObj_add',this.event_timeobj);
    }
   
      }
      timeChangeHandler(event){

      }
}

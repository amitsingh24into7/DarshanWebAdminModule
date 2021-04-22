import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAPIService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-donation-url-form',
  templateUrl: './donation-url-form.component.html',
  styleUrls: ['./donation-url-form.component.scss']
})
export class DonationUrlFormComponent implements OnInit {
  donationurlForm: FormGroup;
  submitted: boolean;
  // tslint:disable-next-line:max-line-length
  payurlobj: {title: string, url: string, desc: string, amount: string, remarks: string} = {title: '', url: '', desc: '', amount: '', remarks: ''};
  public events_Donation_obj: any;

  constructor(private formBuilder: FormBuilder, public apiclass: UserAPIService, public dialogRef: MatDialogRef<DonationUrlFormComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.events_Donation_obj = data;
    }

  ngOnInit(): void {
    // tslint:disable-next-line:no-debugger
    debugger;
    if (this.events_Donation_obj != null) {
      // tslint:disable-next-line:no-debugger
      debugger;
      this.donationurlForm = this.formBuilder.group({
        title: [this.events_Donation_obj.title, Validators.required],
        url: [this.events_Donation_obj.payment_url, Validators.required],
        amount: [this.events_Donation_obj.amount, Validators.required],
        remarks: [this.events_Donation_obj.remarks],
        l_Description: [this.events_Donation_obj.payment_desc]
    });
    } else {
      this.donationurlForm = this.formBuilder.group({
        title: ['', Validators.required],
        url: ['USD', Validators.required],
        amount: ['', Validators.required],
        remarks: [''],
        l_Description: ['']
    });
    }

  }
  get f() { return this.donationurlForm.controls; }
  onClickSubmit() {
    debugger;
    if (this.events_Donation_obj.EventsID && this.events_Donation_obj.TempleID) {
const postobj: {TempleID: string, EventsID: string,  url: string, title: string,
  desc: string,
  amount: string,
  remarks: string} = {TempleID: this.events_Donation_obj.TempleID, EventsID: this.events_Donation_obj.EventsID,  url: this.f.url.value,
    title: this.f.title.value,
    desc: this.f.l_Description.value,
    amount:  this.f.amount.value,
    remarks:  this.f.remarks.value};
    this.apiclass.callAPI('insert_payment_url.php', postobj).subscribe(resp_ => {
      // tslint:disable-next-line:no-debugger
      debugger;
      const resp: any = resp_;
      if (resp.status === 'success') {
      }
    });
    } else {
      this.submitted = true;
      if (this.events_Donation_obj != null) {
        const urlobj: {title: string,
        url: string,
        desc: string,
        amount: string,
        remarks: string,
        id: string} = {title: this.f.title.value,
          url: this.f.url.value,
          desc: this.f.l_Description.value,
          amount: this.f.amount.value,
          remarks: this.f.remarks.value,
          id: this.events_Donation_obj.id};
          this.apiclass.callAPI('update_pay_url.php', urlobj).subscribe((respobj) => {});
      } else {
         // stop here if form is invalid
         if (this.donationurlForm.invalid) {
          return;
      }

      this.payurlobj.amount = this.f.amount.value;
      this.payurlobj.desc = this.f.l_Description.value;
      this.payurlobj.url = this.f.url.value;
      this.payurlobj.title = this.f.title.value;
      this.payurlobj.remarks = this.f.remarks.value;
      this.apiclass.setlocaldata('addpaymentURLobj_add', this.payurlobj);
      }

    }

  }
}

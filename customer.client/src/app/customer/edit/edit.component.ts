import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';
import { HttpService } from '../services/http/http.service';
import { CustomerData } from '../customer.component';
import { APIData } from '../add/add.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  custid: string;
  step = 0;
  GenderOptions: string[] = ['m', 'f'];
  CountryOptions: string[] = ['US'];
  CustomerForm: FormGroup;
  CustomerData: CustomerData[] = [];
  ApiData: APIData[];
  custData: any[] = [];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private as: AlertService, private apiService: HttpService) { }
  ngOnInit(): void {
    this.custid = this.route.snapshot.paramMap.get('id')
    this.apiService.getById('https://getinvoices.azurewebsites.net/api', this.custid).subscribe((data: any[]) => {
      this.bindData(data);
    });
    this.CustomerForm = this.fb.group({
      CustomerId: ['', [Validators.required]],
      Firstname: ['', [Validators.required]],
      Lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      Phone_Number: ['', [Validators.required, Validators.maxLength(15)]],
      Country_Code: [''],
      Gender: [''],
      Balance: ['', [Validators.required]],
      Currency: ['']
    });
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  //on submit save form details
  save() {
    if (!this.CustomerForm.valid) {
      this.as.openDialog();
      this.as.closeAllDialog(3000);
      return;
    }
    this.CustomerData[0] = this.CustomerForm.value;
    this.ApiData = this.CustomerData.map((items: any) => {
      let Data: APIData = {
        id: `${items.CustomerId}`,
        firstname: `${items.Firstname}`,
        lastname: `${items.Lastname}`,
        email: `${items.email}`,
        phone_Number: `${items.Phone_Number}`,
        country_code: `${items.Country_Code}`,
        gender: `${items.Gender}`,
        balance: Number(`${items.Balance}`),
        currency: `${items.Currency}`
      };
      return Data;
    });
    this.apiService.update('https://getinvoices.azurewebsites.net/api', this.ApiData[0].id, JSON.stringify(this.ApiData[0])).subscribe((data: any[]) => { });
    setTimeout(() => {
      this.router.navigate(['/customer']);
    },
      1000);
  }
  //map api data to obj and update form data
  bindData(data: any[]) {
    this.custData[0] = data;
    this.CustomerData = this.custData.map((items: any) => {
      let Data: CustomerData = {
        CustomerId: `${items.id}`,
        Firstname: `${items.firstname}`,
        Lastname: `${items.lastname}`,
        email: `${items.email}`,
        Phone_Number: `${items.phone_Number}`,
        Country_Code: `${items.country_code}`,
        Gender: `${items.gender}`,
        Balance: Number(`${items.balance}`),
        Currency: `${items.currency}`
      };
      return Data;
    });
    this.CustomerForm.setValue(this.CustomerData[0]);
  }
}

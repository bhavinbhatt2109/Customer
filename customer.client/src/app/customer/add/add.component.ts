import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';
import { HttpService } from '../services/http/http.service';
import { CustomerData } from '../customer.component';

export interface APIData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_Number: string;
  country_code: string;
  gender: string;
  balance: number;
  currency: string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  step = 0;
  GenderOptions: string[] = ['m', 'f'];
  CountryOptions: string[] = ['US'];
  CustomerForm: FormGroup;
  CustomerData: CustomerData[] = [];
  ApiData: APIData[];
  constructor(private fb: FormBuilder,private router: Router,private route: ActivatedRoute,private as: AlertService,private apiService: HttpService) { }
  ngOnInit(): void {
    this.CustomerForm = this.fb.group({
      CustomerId: ['', [Validators.required]],
      Firstname: ['', [Validators.required]],
      Lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      Phone_Number: ['', [Validators.required,Validators.maxLength(15)]],
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
  //on submit save form details and route to customer list
  save() {
    if (!this.CustomerForm.valid) {
      this.as.openDialog();
      this.as.closeAllDialog(3000);
      return;
    }
    this.CustomerData[0] = this.CustomerForm.value;
    this.ApiData =  this.CustomerData.map((items: any) => {
      let Data : APIData =  {
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
    this.apiService.add('https://getinvoices.azurewebsites.net/api/customer', JSON.stringify(this.ApiData[0])).subscribe((data: any[]) => { });
    this.router.navigate(['/customer']);
  }
}
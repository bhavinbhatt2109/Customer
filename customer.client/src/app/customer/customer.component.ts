import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from './services/http/http.service';

export interface CustomerData {
  CustomerId: string;
  Firstname: string;
  Lastname: string;
  email: string;
  Phone_Number: string;
  Country_Code: string;
  Gender: string;
  Balance: number;
  Currency: string;
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})

export class CustomerComponent {
  displayedColumns: string[] = ['CustomerId', 'Firstname', 'Lastname', 'email', 'Phone_Number', 'Country_Code', 'Gender', 'Balance', 'Edit', 'Delete'];
  dataSource: MatTableDataSource<CustomerData>;
  CustomerDataList: CustomerData[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private apiService: HttpService,private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
      this.GetAll();
  }
  //map api response to object
  bindData(data: any[]){
    this.CustomerDataList =  data.map((items: any) => {
      let Data : CustomerData =  {
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
  }
  //route to new page to add customers
  Add(){
    this.router.navigate(['/add']);
  }
  //route to new page to edit customers
  Edit(id: string){
    this.router.navigate(['/edit', { id: id }]);
  }
  //delete customers
  Delete(id: string){
    this.apiService.delete('https://getinvoices.azurewebsites.net/api', id).subscribe((data: any[]) => {
      this.GetAll();
    });
  }
  //get all customers as list
  GetAll(){
      this.apiService.get('https://getinvoices.azurewebsites.net/api/Customers').subscribe((data: any[]) => {
      this.bindData(data);
      this.dataSource = new MatTableDataSource(this.CustomerDataList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}

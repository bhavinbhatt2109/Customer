import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';;
import { EditComponent } from './customer/edit/edit.component';
import { AddComponent } from './customer/add/add.component';
import { AlertComponent } from './customer/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertService } from './customer/services/alert/alert.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AddComponent,
    EditComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRippleModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule 
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }

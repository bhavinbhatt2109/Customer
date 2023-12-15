import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AlertComponent } from '../../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(public dialog: MatDialog) {}
  //open alert popup
  openDialog() {
    this.dialog.open(AlertComponent);
  }
  //close alert popup
  closeAllDialog(time: any) {
    setTimeout(()=> this.dialog.closeAll(), time);
  }
}

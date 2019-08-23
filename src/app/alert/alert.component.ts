import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent  {

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
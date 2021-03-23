import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-successful-registration',
  templateUrl: './successful-registration.component.html',
  styleUrls: ['./successful-registration.component.scss']
})
export class SuccessfulRegistrationComponent implements OnInit {

  constructor(private dialog: MatDialogRef<any>) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialog.close(SuccessfulRegistrationComponent);
  }

}

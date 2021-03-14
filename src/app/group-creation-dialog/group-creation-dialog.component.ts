import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'group-creation-dialog',
  templateUrl: 'group-creation-dialog.component.html',
})
export class GroupCreationDialogComponent {

  constructor(public dialogRef: MatDialogRef<GroupCreationDialogComponent>) { }

  onCancel(): void {
    this.dialogRef.close();
  }
}

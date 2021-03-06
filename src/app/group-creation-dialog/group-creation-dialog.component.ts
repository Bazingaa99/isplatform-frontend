import { Component, Inject } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
  
@Component({ 
  selector: 'group-creation-dialog', 
  templateUrl: 'group-creation-dialog.component.html', 
}) 
export class GroupCreationDialogComponent { 
  
  constructor( 
    public dialogRef: MatDialogRef<GroupCreationDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { } 
  
  onCancel(): void { 
    this.dialogRef.close(); 
  } 
  
}
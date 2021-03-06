import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GroupCreationDialogComponent } from './group-creation-dialog.component'; 
  
@NgModule({ 
  declarations: [GroupCreationDialogComponent], 
  entryComponents: [GroupCreationDialogComponent], 
  imports: [ 
    FormsModule, 
    MatButtonModule, 
    CommonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
  ], 
}) 
export class ExampleDialogModule {} 
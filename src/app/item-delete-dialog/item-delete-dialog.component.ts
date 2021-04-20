import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '../services/item.service';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';

@Component({
  selector: 'item-delete-dialog',
  templateUrl: './item-delete-dialog.component.html',
  styleUrls: ['./item-delete-dialog.component.scss']
})
export class ItemDeleteDialogComponent implements OnInit {
  dialog: any;

  constructor(private itemService: ItemService,
              private updateService: UpdateUsersGroupsService,
              private snackBar: MatSnackBar,
              public itemDeleteDialog: MatDialogRef<ItemDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public itemId: number) { }

  ngOnInit(): void {
  }

  deleteItem(itemId: number): void {
    this.itemDeleteDialog.close();
    this.itemService.deleteItem(itemId, localStorage.getItem('email')).subscribe(
      () => {
        this.updateService.sendUpdate();
        this.snackBar.open("Item successfuly deleted","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      },
      (httpErrorResponse: HttpErrorResponse) => {
        let errorString = ""
        console.log(httpErrorResponse.error.errors[0].defaultMessage);
        let errors = httpErrorResponse.error.errors;
        if(errors.length > 0){
        for(let i = 0; i < errors.length; i++){
            errorString += errors[i].defaultMessage + "\n"
          }
          this.snackBar.open(errorString,"✓",{
            duration: 400000000000000,
            panelClass: ['red-snackbar']
          })
        }else{
          this.snackBar.open("Couldn't delete item. Please try again.","✓",{
            duration: 400000000000000,
            panelClass: ['red-snackbar']
          })
        }
      }
    )
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { Item } from '../shared/item';
import { RequestService } from '../services/request.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Request } from '../shared/request';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'item-dialog',
  templateUrl: './requested-item-dialog.component.html',
  styleUrls: ['./requested-item-dialog.component.scss']
})
export class RequestedItemDialogComponent implements OnInit {
  currentUserEmail: string;
  isItemRequested: boolean;

  constructor( public updateDialog: MatDialog,
                public requestedItemDialog: MatDialogRef<RequestedItemDialogComponent>,
                public requestService: RequestService,
                public itemService: ItemService,
                public router: Router,
                public snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA) public request: any ) {
                  console.log(request);
                }

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem('email')
  }

  openItemUpdateDialog(itemData): void {
    this.updateDialog.open(ItemCreationDialogComponent, {
      data: itemData,
    });
  }

  closeItemDialog(): void {
    this.requestedItemDialog.close(RequestedItemDialogComponent);
  }

  removeRequest(requestId: number){
    this.requestService.deleteRequest(requestId);
  }

  dueDate(date: string, days: number) {
    var dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + days);
    var result = dueDate.toISOString().split('T')[0]
    return result;
  }

  responseToRequest(requestId: number, acceptance: boolean){
    console.log(acceptance,requestId)
    this.requestService.responseToRequest(requestId, acceptance).subscribe(
      () => {
        this.snackBar.open("You have succesfully responded","✓",{
          duration: 400000000000000,
          panelClass: ['green-snackbar']
        })
      })
  }
}

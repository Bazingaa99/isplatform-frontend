import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item } from '../shared/item';
import { Router } from '@angular/router';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-creation-dialog',
  templateUrl: './item-creation-dialog.component.html',
  styleUrls: ['./item-creation-dialog.component.scss']
})
export class ItemCreationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ItemCreationDialogComponent>,
              private categoryService: CategoryService,
              private itemService: ItemService,
              private router: Router,
              private updateService: UpdateUsersGroupsService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public updatableItemData: Item) { }

  public categories: Category[];
  public item: Item;
  public userId: number;
  public groupId: number;
  public isHidden = false;

  public itemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    category: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, Validators.max(180), Validators.min(1)])
  })

  get name(){return this.itemForm.get('name')}
  get description(){return this.itemForm.get('description')}
  get category(){return this.itemForm.get('category')}
  get duration(){return this.itemForm.get('duration')}

  ngOnInit(): void {
    this.getCategories();
    this.groupId = Number(this.router.url.slice(12, this.router.url.length));
    if(this.updatableItemData != null){
      var div = document.getElementById('item-form-title');
      div.innerHTML = div.innerHTML.replace('Add','Update');
      div = document.getElementById('submit-button');
      div.innerHTML = div.innerHTML.replace('Create','Update');
      this.isHidden = this.updatableItemData.isHidden;

      this.itemForm.patchValue({name: this.updatableItemData.name,
        description: this.updatableItemData.description,
        category: this.updatableItemData.category['id'],
        duration: this.updatableItemData.duration,
        owner_id: this.updatableItemData.owner_id});
    }
  }

  onCancel(): void {
    this.dialogRef.close(ItemCreationDialogComponent);
  }

  public onSubmitItem(): void {
    this.dialogRef.close();
    if (this.itemForm.valid){
      this.item = {
        group: this.groupId,
        category: this.itemForm.get('category').value,
        name: this.itemForm.get('name').value,
        description: this.itemForm.get('description').value,
        duration: this.itemForm.get('duration').value,
        isHidden: this.isHidden,
      }
      if(this.updatableItemData === null){
        this.itemService.addItem(this.item, localStorage.getItem('email')).subscribe(
          () => {
            this.updateService.sendUpdate();
            this.snackBar.open("Item successfuly added","✓",{
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
              this.snackBar.open("Couldn't add item. Please try again.","✓",{
                duration: 400000000000000,
                panelClass: ['red-snackbar']
              })
            }
          }
        )
      } else {
        this.item.id = this.updatableItemData.id;
        this.itemService.updateItem(this.item, localStorage.getItem('email')).subscribe(
          () => {
            this.updateService.sendUpdate();
            this.snackBar.open("Item successfuly updated","✓",{
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
              this.snackBar.open("Couldn't update item. Please try again.","✓",{
                duration: 400000000000000,
                panelClass: ['red-snackbar']
              })
            }
          }
        )
      }
    }
  }
  
  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        console.log(this.categories);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item } from '../shared/item';
import { Router } from '@angular/router';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFileUploadModule } from 'angular-material-fileupload';

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
              private MatFileUploadModule: MatFileUploadModule,
              @Inject(MAT_DIALOG_DATA) public updatableItemData: Item,) { }

  public categories: Category[];
  public item: Item;
  public userId: number;
  public groupId: number;
  public isHidden = false;
  public image: File;
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
        owner_id: this.updatableItemData.owner_id
      });
      this.setOldImage(this.updatableItemData)
    }
  }

  onCancel(): void {
    this.dialogRef.close(ItemCreationDialogComponent);
  }

  public onSubmitItem(): void {
    this.itemForm.value.image = this.image;
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
          res => {
            if(this.image){
              this.itemService.addAttachment(res.id, this.image).subscribe( response=>
                {
                this.updateService.sendUpdate();
                }
              )
            }
            this.updateService.sendUpdate();
            this.snackBar.open("Item successfuly added","✓",{
              duration: 400000000000000,
              panelClass: ['green-snackbar']
            })
          },
          (httpErrorResponse: HttpErrorResponse) => {
            let errorString = ""
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
          res => {
            console.log(this.image)
            if(this.image){
              console.log(this.image)
              this.itemService.addAttachment(this.item.id, this.image).subscribe( response=>
                {
                this.updateService.sendUpdate();
                }
              )
            }
            this.updateService.sendUpdate();
            this.snackBar.open("Item successfuly updated","✓",{
              duration: 400000000000000,
              panelClass: ['green-snackbar']
            })
          },
          (httpErrorResponse: HttpErrorResponse) => {
            let errorString = ""
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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onFileSelected(event): void {
    if (event.target.files[0]) {

      this.image = event.target.files[0];

      window.URL = window.URL || window.webkitURL;
      const img = new Image();
      let reader = new FileReader();
      img.src = window.URL.createObjectURL( this.image );
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        setTimeout(() => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
    
          window.URL.revokeObjectURL( img.src );
          if ( width < 250 || height < 200 ) {
            alert('photo should be not smaller than 250x250 size');
            event.srcElement.value = null;
          }
        }, 500);
      }
    }
    //   this.itemForm.controls.image.updateValueAndValidity();
    //   this.itemForm.controls.image.clearValidators();
    // } 
    else {
      this.onFileNotSelected();
    }
  }
  onFileNotSelected(): void {
    this.itemForm.value.image = null;
    this.image = null;
  }

   setOldImage(item:Item)
  {
    let fileInputElement =  (<HTMLInputElement>document.getElementById('image'));
    let data = item.image
    let file = new File([data], item.imageName,{type:"image/jpeg", lastModified:new Date().getTime()});
    this.image = file
    let container = new DataTransfer();
    container.items.add(file);
    fileInputElement.files = container.files;
  }
}
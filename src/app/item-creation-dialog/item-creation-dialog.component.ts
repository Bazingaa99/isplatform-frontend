import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item } from '../shared/item';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/user'
import {MatSnackBar} from '@angular/material/snack-bar';
import { UpdateUsersGroupsService } from '../services/update-users-group.service';
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
              private userService: UserService,
              private snackBar: MatSnackBar,
              private serviceUpdate: UpdateUsersGroupsService) { }

  public categories: Category[];
  public item: Item;
  public userId: number;
  public groupId: number;

  public addItemForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]*')]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    category: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, Validators.max(180)])
  })

  get name(){return this.addItemForm.get('name')}
  get description(){return this.addItemForm.get('description')}
  get category(){return this.addItemForm.get('category')}
  get duration(){return this.addItemForm.get('duration')}

  ngOnInit(): void {
    this.getCategories();
    this.getUserId();
    this.groupId = Number(this.router.url.slice(12, this.router.url.length));
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.addItemForm.valid){
      this.dialogRef.close();
      this.item = {
        group: this.groupId,
        owner: this.userId, //have to get current user
        category: this.addItemForm.get('category').value,
        name: this.addItemForm.get('name').value,
        description: this.addItemForm.get('description').value,
        duration: this.addItemForm.get('duration').value,
      }

      this.itemService.addItem(this.item).subscribe(
        (response: Item) => {
          this.serviceUpdate.sendUpdate();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  }

  public getUserId(): void {
    this.userService.getUserByEmail(localStorage.getItem('email')).subscribe(
      (response: User) => {
        this.userId = response.id;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
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

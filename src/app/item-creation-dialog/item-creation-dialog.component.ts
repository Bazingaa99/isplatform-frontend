import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/category';

@Component({
  selector: 'app-item-creation-dialog',
  templateUrl: './item-creation-dialog.component.html',
  styleUrls: ['./item-creation-dialog.component.scss']
})
export class ItemCreationDialogComponent implements OnInit {
  public categories: Category[];

  constructor(public dialogRef: MatDialogRef<ItemCreationDialogComponent>, private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.getCategories();
  }

  onCancel(): void {
    this.dialogRef.close();
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

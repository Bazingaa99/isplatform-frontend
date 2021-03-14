import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../shared/item';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})

export class ItemsComponent implements OnInit {
  public items: Item[];

  constructor(private router: Router, private itemService: ItemService) {}

  ngOnInit(): void {
    this.getItems();
  }

  public getItems(): void {
    this.itemService.getItems().subscribe(
      (response: Item[]) => {
        this.items = response;
        console.log(this.items);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

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
  public

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private itemService: ItemService) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.getItems(id);
  }

  public getItems(id: string): void {
    this.itemService.getItems(id).subscribe(
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

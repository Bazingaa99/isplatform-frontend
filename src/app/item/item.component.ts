import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ItemService } from '../services/item/item.service';
import { Item } from '../shared/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
    public items: Item[];

    constructor(private router: Router,
                private itemService: ItemService,
                private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.getItems();
    }

    public getItems(): void{
        this.itemService.getItems().subscribe(
            (response: Item[]) => {
              this.items = response;
              console.log(this.items);
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
        )
    }
}

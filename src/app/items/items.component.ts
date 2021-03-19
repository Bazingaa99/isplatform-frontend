import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../shared/item';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})

export class ItemsComponent implements OnInit {
  public items: Item[];
  public pageSize: number;
  public pageSlice;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private itemService: ItemService) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.pageSize = 12;
    this.getItems(id);
  }

  public getItems(id: string): void {
    this.itemService.getItems(id).subscribe(
      (response: Item[]) => {
        this.items = response;
        this.pageSlice = this.items.slice(0, this.pageSize);
        console.log(this.pageSlice, this.pageSize);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.items.length){
      endIndex = this.items.length;
    }

    this.pageSlice = this.items.slice(startIndex, endIndex);
  }
}

import { Component, OnInit} from '@angular/core';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups = [];

  constructor(private _groupsService: GroupsService) { }

  ngOnInit(): void {
    this.groups = this._groupsService.getGroups();
  }
}
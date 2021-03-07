import { Component, OnInit} from '@angular/core';
import { GroupsService } from '../groups.service';
import { MatDialog } from '@angular/material/dialog'; 
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component'; 


@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss',]
})
export class GroupsComponent implements OnInit {

  public groups = [];

  animal: string; 
  name: string; 

  constructor(private _groupsService: GroupsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.groups = this._groupsService.getGroups();
  }

  openDialog(): void { 
    this.dialog.open(GroupCreationDialogComponent, { 
      width: '100%', 
      data: { name: this.name, animal: this.animal } 
    }); 
  }
}

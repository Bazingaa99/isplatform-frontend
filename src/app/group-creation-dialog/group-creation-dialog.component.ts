import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'group-creation-dialog',
  templateUrl: './group-creation-dialog.component.html',
  styleUrls: ['./group-creation-dialog.component.css']
})
export class GroupCreationDialogComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  groupForm = this.formBuilder.group({
    groupName:[''],
    groupDescription:['']
  });
  ngOnInit(): void {
  }

}

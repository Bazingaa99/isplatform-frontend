import { Injectable } from '@angular/core';

@Injectable()
export class GroupsService {

  constructor() { }

  getGroups() {
    return [
        {"Group_Id": 1, "Admin_Id": 1, "Name": "59 bendrabutis", "Description": "VU 59 bendrabucio grupe", "GroupCode": 1},
        {"Group_Id": 2, "Admin_Id": 1, "Name": "IT grupe", "Description": "2017 IT grupe", "GroupCode": 1},
        {"Group_Id": 3, "Admin_Id": 1, "Name": "WIN", "Description": "WIN is acronym", "GroupCode": 1}
    ];
  }
}

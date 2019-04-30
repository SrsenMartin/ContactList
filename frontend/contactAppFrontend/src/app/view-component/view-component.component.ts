import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from 'src/Shared/api.service';
import { Contact } from 'src/model/contact';
import { Tag } from 'src/model/tag';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css']
})
export class ViewComponentComponent implements OnInit {

  contact: Contact;
  tags: Tag[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, public dialogRef: MatDialogRef<ViewComponentComponent>) { }

  ngOnInit() {
    this.contact = this.data.contact;
    this.api.getTagsByContact(String(this.contact.contactId)).subscribe(
      res => {
        this.tags = res;
      },
      err => {

      });
  }


}

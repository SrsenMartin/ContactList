import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/model/contact';
import { ApiService } from 'src/Shared/api.service';
import { Tag } from 'src/model/tag';
import { log } from 'util';
import { TagDTO } from 'src/modelDTO/tag';

@Component({
  selector: 'app-contacts-component',
  templateUrl: './contacts-component.component.html',
  styleUrls: ['./contacts-component.component.css']
})
export class ContactsComponentComponent implements OnInit {

  contacts: Contact[] = []
  tags: Tag[] = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllContacts();
    this.getAllTags();
  }

  public getAllContacts() {
    this.api.getAllContacts().subscribe(
      res => {
        this.contacts = res;
      },
      err => {

      });
  }

  public getAllTags() {
    this.api.getAllTags().subscribe(
      res => {
        this.tags = res;
      },
      err => {

      });
  }

  public addTag() {
    var tagName = <HTMLInputElement>document.getElementById('tagInput');
    this.api.createTag(new TagDTO(tagName.value, null)).subscribe(
      res => {
        this.tags.push(res);
        tagName.value = "";
      },
      err => {

      }
    );
  }

  public onSearchChange(value: String) {
    if (value == null || value == "") {
      value = "*";
    }

    this.api.search(value).subscribe(
      res => {
        this.contacts = res;
      },
      err => {

      }
    );
  }
}

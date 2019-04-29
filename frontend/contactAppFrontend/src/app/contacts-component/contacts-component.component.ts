import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/model/contact';
import { ApiService } from 'src/Shared/api.service';
import { Tag } from 'src/model/tag';
import { log } from 'util';
import { TagDTO } from 'src/modelDTO/tag';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateContactComponent } from '../create-contact/create-contact.component';
import { UpdateContactComponent } from '../update-contact/update-contact.component';

@Component({
  selector: 'app-contacts-component',
  templateUrl: './contacts-component.component.html',
  styleUrls: ['./contacts-component.component.css']
})
export class ContactsComponentComponent implements OnInit {

  contacts: Contact[] = []
  tags: Tag[] = []

  constructor(private api: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllContacts();
    this.getAllTags();
  }

  public getAllContacts() {
    var searchFilter = <HTMLInputElement>document.getElementById('searchFilter');
    searchFilter.value = "";
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

  public filterTag(tag: Tag) {
    console.log(tag);
  }

  public deleteTag(tag: Tag) {
    this.api.deleteTag(String(tag.tagId)).subscribe(
      res => {
        this.tags = this.tags.filter(t => t.tagId != tag.tagId);
      },
      err => {

      }
    );
  }

  public deleteContact(contact: Contact) {
    this.api.deleteContact(String(contact.contactId)).subscribe(
      res => {
        this.contacts = this.contacts.filter(c => c.contactId != contact.contactId);
      },
      err => {

      }
    );
  }

  public viewContact(contact: Contact) {
    console.log(contact);
  }

  public createPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(CreateContactComponent, dialogConfig).afterClosed().subscribe(response => {
      if (response) {
        this.contacts.push(response.data);
      }
    });
  }

  public updatePopup(contact: Contact) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      id: contact.contactId,
      name: contact.name,
      lastName: contact.lastName,
      adress: contact.adress,
      numbers: contact.numbers,
      emails: contact.emails
    };
    this.dialog.open(UpdateContactComponent, dialogConfig).afterClosed().subscribe(response => {
      if (response) {
        var cont = response.data;
        var el = this.contacts.find(c => c.contactId == cont.contactId);
        el.name = cont.name;
        el.lastName = cont.lastName;
        el.adress = cont.adress;
        el.numbers = cont.numbers;
        el.emails = cont.emails;
      }
    });
  }

  public addTag() {
    var tagName = <HTMLInputElement>document.getElementById('tagInput');
    this.api.createTag(new TagDTO(tagName.value)).subscribe(
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

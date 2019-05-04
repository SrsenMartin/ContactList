import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/model/contact';
import { ApiService } from 'src/Shared/api.service';
import { Tag } from 'src/model/tag';
import { log } from 'util';
import { TagDTO } from 'src/modelDTO/tag';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateContactComponent } from '../create-contact/create-contact.component';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import { UpdateTagComponent } from '../update-tag/update-tag.component';
import { ViewComponentComponent } from '../view-component/view-component.component';
import { ContactTags } from 'src/model/contactTags';

@Component({
  selector: 'app-contacts-component',
  templateUrl: './contacts-component.component.html',
  styleUrls: ['./contacts-component.component.css']
})
export class ContactsComponentComponent implements OnInit {

  contacts: Contact[] = [];
  tags: Tag[] = [];
  showTags: boolean = false;
  currShow: String = "Contacts";
  selectedIndex: Number = -1;

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
        this.selectedIndex = -1;
        this.contacts = res;
        this.currShow = "Contacts";
        this.showTags = false;
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

  public filterTag(tag: Tag, index: Number) {
    this.api.getContactsByTag(String(tag.tagId)).subscribe(
      res => {
        this.selectedIndex = index;
        this.contacts = res;
        this.currShow = tag.tagName;
        this.showTags = false;
      },
      err => {

      });
  }

  public deleteTag(tag: Tag, index: Number) {
    this.api.deleteTag(String(tag.tagId)).subscribe(
      res => {
        if (this.selectedIndex > index) this.selectedIndex = +this.selectedIndex - 1;
        this.tags = this.tags.filter(t => t.tagId != tag.tagId);
        if (this.currShow == tag.tagName) this.getAllContacts();
      },
      err => {

      }
    );
  }

  public deleteContact(contact: Contact) {
    this.api.deleteContact(String(contact.contactId)).subscribe(
      res => {
        this.contacts = this.contacts.filter(c => c.contactId != contact.contactId);
        this.check();
        this.getAllTags();
      },
      err => {

      }
    );
  }

  public addSelected(tag: Tag) {
    var items = [];
    for (let i = 0; i < this.contacts.length; i++) {
      var parentBox = <HTMLInputElement>document.getElementById(String(this.contacts[i].contactId));
      if (parentBox.checked) {
        items.push(String(this.contacts[i].contactId));
      }

    }

    this.api.addContactsToTag(String(tag.tagId), items).subscribe(
      res => {
        console.log(res);
        var t = this.tags.find(curr => curr.tagId == tag.tagId);
        for (let i = 0; i < res.length; i++) {
          t.contactTags.push(res[i]);
        }
      },
      err => {

      }
    );
  }

  public viewContact(contact: Contact) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      contact: contact
    };
    this.dialog.open(ViewComponentComponent, dialogConfig);
  }

  public check() {
    var show = false;
    for (let i = 0; i < this.contacts.length; i++) {
      var parentBox = <HTMLInputElement>document.getElementById(String(this.contacts[i].contactId));
      if (parentBox.checked) {
        show = true;
        break;
      }

    }
    this.showTags = show;
  }

  public updateTag(tag: Tag) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    dialogConfig.data = {
      tag: new Tag(tag.tagId, tag.tagName)
    };
    this.dialog.open(UpdateTagComponent, dialogConfig).afterClosed().subscribe(response => {
      if (response) {
        var t = response.data;
        var et = this.tags.find(x => x.tagId == t.tagId);
        if (this.currShow == et.tagName) this.currShow = t.tagName;
        et.tagName = t.tagName;
      }
    });
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
        res.contactTags = []
        this.tags.push(res);
        tagName.value = "";
      },
      err => {

      }
    );
  }

  public onSearchChange(value: String) {
    this.selectedIndex = -1;
    if (value == null || value == "") {
      this.getAllContacts();
      return;
    }
    if (value == "*") {
      if (this.currShow != "Contacts") this.getAllContacts();
      return;
    }

    this.api.search(value).subscribe(
      res => {
        this.contacts = res;
        this.currShow = value;
        this.showTags = false;
      },
      err => {

      }
    );
  }
}

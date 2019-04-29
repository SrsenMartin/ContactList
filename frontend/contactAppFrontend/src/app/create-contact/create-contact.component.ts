import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApiService } from 'src/Shared/api.service';
import { PhoneNumberDTO } from 'src/modelDTO/phoneNumber';
import { EmailDTO } from 'src/modelDTO/email';
import { ContactDTO } from 'src/modelDTO/contact';
import { error } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  error: boolean = false;
  myPhoneForm: FormGroup;
  myEmailForm: FormGroup;

  constructor(private api: ApiService, public dialogRef: MatDialogRef<CreateContactComponent>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myPhoneForm = this.formBuilder.group({
      phoneNumber: ['',],
      phoneNumbers: this.formBuilder.array([
        this.initPhoneNumber(),
      ])
    });
    this.myEmailForm = this.formBuilder.group({
      email: ['',],
      emails: this.formBuilder.array([
        this.initEmail(),
      ])
    });
  }

  initPhoneNumber() {
    return this.formBuilder.group({
      phoneNumber: [''],
    });
  }

  initEmail() {
    return this.formBuilder.group({
      email: [''],
    });
  }

  addPhoneField() {
    const control = <FormArray>this.myPhoneForm.controls['phoneNumbers'];
    control.push(this.initPhoneNumber());
  }

  addEmailField() {
    const control = <FormArray>this.myEmailForm.controls['emails'];
    control.push(this.initEmail());
  }

  public onClose() {
    this.dialogRef.close();
  }

  public validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public onSubmit() {
    var nameInput = <HTMLInputElement>document.getElementById('name');
    var lastNameInput = <HTMLInputElement>document.getElementById('lastName');
    var adressInput = <HTMLInputElement>document.getElementById('adress');

    if (nameInput.value == null || nameInput.value.length < 2) {
      this.error = true;
    } else {
      this.error = false;
    }

    var numberArray = this.myPhoneForm.value.phoneNumbers;
    var re = new RegExp("^[0-9]*$");
    var phones = [];
    for (let i = 0; i < numberArray.length; i++) {
      var num = String(numberArray[i].phoneNumber);
      if (num == "" || num == null || !re.test(num)) continue;
      phones.push(new PhoneNumberDTO(num));
    }

    var emailArray = this.myEmailForm.value.emails;
    var emails = [];
    for (let i = 0; i < emailArray.length; i++) {
      var e = String(emailArray[i].email);
      if (e == "" || e == null || !this.validateEmail(e)) continue;
      emails.push(new EmailDTO(e));
    }

    const contact = new ContactDTO(nameInput.value, lastNameInput.value, adressInput.value, phones, emails, null);

    this.api.createContact(contact).subscribe(
      c => {
        this.dialogRef.close({ data: c });
      },
      error1 => {
        console.log(error1);
      }
    );
  }

}

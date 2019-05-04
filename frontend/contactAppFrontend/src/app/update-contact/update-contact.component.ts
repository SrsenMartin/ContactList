import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApiService } from 'src/Shared/api.service';
import { PhoneNumberDTO } from 'src/modelDTO/phoneNumber';
import { EmailDTO } from 'src/modelDTO/email';
import { ContactDTO } from 'src/modelDTO/contact';
import { error } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from 'src/model/contact';
import { PhoneNumber } from 'src/model/phoneNumber';
import { Email } from 'src/model/email';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})

export class UpdateContactComponent implements OnInit {

  error: boolean = false;
  myPhoneForm: FormGroup;
  myEmailForm: FormGroup;
  arr: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, public dialogRef: MatDialogRef<UpdateContactComponent>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    var nameInput = <HTMLInputElement>document.getElementById('name');
    var lastNameInput = <HTMLInputElement>document.getElementById('lastName');
    var adressInput = <HTMLInputElement>document.getElementById('adress');

    nameInput.value = this.data.name;
    lastNameInput.value = this.data.lastName;
    adressInput.value = this.data.adress;

    var numbers = this.data.numbers;
    var emails = this.data.emails;

    if (numbers == null || numbers.length == 0) {
      this.myPhoneForm = this.formBuilder.group({
        phoneNumber: ['',],
        phoneNumbers: this.formBuilder.array([
          this.initPhoneNumber(""),
        ])
      });
    } else {
      this.myPhoneForm = this.formBuilder.group({
        phoneNumber: ['',],
        phoneNumbers: this.formBuilder.array([
          this.initPhoneNumber(numbers[0].phoneNumber),
        ])
      });
      for (let i = 1; i < numbers.length; i++) {
        this.addPhoneField(numbers[i].phoneNumber);
      }
    }

    if (emails == null || emails.length == 0) {
      this.myEmailForm = this.formBuilder.group({
        email: ['',],
        emails: this.formBuilder.array([
          this.initEmail(""),
        ])
      });
    } else {
      this.myEmailForm = this.formBuilder.group({
        email: ['',],
        emails: this.formBuilder.array([
          this.initEmail(emails[0].emailAdress),
        ])
      });
      for (let i = 1; i < emails.length; i++) {
        this.addEmailField(emails[i].emailAdress);
      }
    }
  }

  initPhoneNumber(number: String) {
    return this.formBuilder.group({
      phoneNumber: [number],
    });
  }

  initEmail(email: String) {
    return this.formBuilder.group({
      email: [email],
    });
  }

  deletePhoneField(index: Number) {
    this.arr = this.myPhoneForm.controls["phoneNumbers"];
    this.arr.removeAt(index);
  }

  addPhoneField(number: String) {
    const control = <FormArray>this.myPhoneForm.controls['phoneNumbers'];
    control.push(this.initPhoneNumber(number));
  }

  deleteEmailField(index: Number) {
    this.arr = this.myEmailForm.controls["emails"];
    this.arr.removeAt(index);
  }

  addEmailField(email: String) {
    const control = <FormArray>this.myEmailForm.controls['emails'];
    control.push(this.initEmail(email));
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
    var phones = this.data.numbers;
    for (let i = 0, index = 0; i < numberArray.length; i++) {
      var num = String(numberArray[i].phoneNumber);
      if (!num || num == "" || !re.test(num)) {
        continue;
      }

      if (index < phones.length) {
        phones[index].phoneNumber = num;
      } else {
        phones.push(new PhoneNumber(num));
      }

      index++;
    }

    var emailArray = this.myEmailForm.value.emails;
    var emails = this.data.emails;
    for (let i = 0, index = 0; i < emailArray.length; i++) {
      var e = String(emailArray[i].email);
      if (!e || e == "" || !this.validateEmail(e)) {
        continue;
      }
      if (index < emails.length) {
        emails[index].emailAdress = e;
      } else {
        emails.push(new Email(e));
      }

      index++;
    }

    const contact = new Contact(this.data.id, nameInput.value, lastNameInput.value, adressInput.value, phones, emails, null);

    this.api.updateContact(contact).subscribe(
      c => {
        this.dialogRef.close({ data: c });
      },
      error1 => {
        console.log(error1);
      }
    );
  }

}


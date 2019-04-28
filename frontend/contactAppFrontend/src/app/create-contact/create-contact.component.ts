import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApiService } from 'src/Shared/api.service';
import { PhoneNumberDTO } from 'src/modelDTO/phoneNumber';
import { EmailDTO } from 'src/modelDTO/email';
import { ContactDTO } from 'src/modelDTO/contact';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  numbers: PhoneNumberDTO[] = [];
  emails: EmailDTO[] = [];

  constructor(private api: ApiService, public dialogRef: MatDialogRef<CreateContactComponent>) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {


    return;
    const contact = new ContactDTO(null, null, this.numbers, this.emails, null);

    this.api.createContact(contact).subscribe(
      ad => {
        this.dialogRef.close({ data: ad });
      },
      error1 => {
        console.log(error1);
      }
    );
  }

}

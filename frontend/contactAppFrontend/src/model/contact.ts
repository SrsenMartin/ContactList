import { PhoneNumber } from './phoneNumber';
import { Email } from './email';
import { ContactTags } from './contactTags';

export class Contact {
  contactId: Number;
  name: String;
  lastName: String;
  adress: String;
  numbers: PhoneNumber[];
  emails: Email[];
  contactTags: ContactTags[];

  constructor(contactId: Number, name: String, lastName: String, adress: String, numbers: PhoneNumber[], emails: Email[], contactTags: ContactTags[]) {
    this.name = name;
    this.lastName = lastName;
    this.numbers = numbers;
    this.emails = emails;
    this.contactTags = contactTags;
    this.contactId = contactId;
    this.adress = adress;
  }
}

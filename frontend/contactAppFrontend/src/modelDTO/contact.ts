import { PhoneNumberDTO } from './phoneNumber';
import { EmailDTO } from './email';
import { ContactTags } from '../model/contactTags';

export class ContactDTO {
  name: String;
  lastName: String;
  adress: String;
  numbers: PhoneNumberDTO[];
  emails: EmailDTO[];
  contactTags: ContactTags[];

  constructor(name: String, lastName: String, adress: String, numbers: PhoneNumberDTO[], emails: EmailDTO[], contactTags: ContactTags[]) {
    this.name = name;
    this.lastName = lastName;
    this.numbers = numbers;
    this.emails = emails;
    this.contactTags = contactTags;
  }
}

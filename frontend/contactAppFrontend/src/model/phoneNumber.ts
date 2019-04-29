import { Contact } from './contact';

export class PhoneNumber {
  numberId: Number;
  phoneNumber: String;
  contact: Contact;

  constructor(phoneNumber: String) {
    this.phoneNumber = phoneNumber;
  }
}

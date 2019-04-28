import { ContactDTO } from './contact';

export class PhoneNumberDTO {
  phoneNumber: String;
  contact: ContactDTO;

  constructor(phoneNumber: String, contact: ContactDTO) {
    this.phoneNumber = phoneNumber;
    this.contact = contact;
  }
}

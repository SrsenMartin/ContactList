import { ContactDTO } from './contact';

export class EmailDTO {
  emailAdress: String;
  contact: ContactDTO;

  constructor(emailAdress: String, contact: ContactDTO) {
    this.emailAdress = emailAdress;
    this.contact = contact;
  }
}

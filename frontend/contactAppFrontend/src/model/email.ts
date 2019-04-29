import { Contact } from './contact';

export class Email {
  emailId: Number;
  emailAdress: String;
  contact: Contact;

  constructor(emailAdress: String) {
    this.emailAdress = emailAdress;
  }
}

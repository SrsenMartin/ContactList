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
}

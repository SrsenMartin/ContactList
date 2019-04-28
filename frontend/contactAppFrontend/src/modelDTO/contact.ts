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
}

import { Contact } from './contact';
import { Tag } from './tag';

export class ContactTags {
  contactId: Number;
  tagId: Number;

  constructor(contactId: Number, tagId: Number) {
    this.contactId = contactId;
    this.tagId = tagId;
  }
}

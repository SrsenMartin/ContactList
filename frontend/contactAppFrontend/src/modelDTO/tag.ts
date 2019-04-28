import { ContactTags } from '../model/contactTags';

export class TagDTO {
  tagName: String;
  contactTags: ContactTags[];

  constructor(tagName: String, contactTags: ContactTags[]) {
    this.tagName = tagName;
    this.contactTags = contactTags;
  }
}

import { ContactTags } from './contactTags';

export class Tag {
  tagId: Number;
  tagName: String;
  contactTags: ContactTags[];

  constructor(tagId: Number, tagName: String) {
    this.tagId = tagId;
    this.tagName = tagName;
  }
}

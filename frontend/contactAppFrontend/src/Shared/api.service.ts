import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Contact } from 'src/model/contact';
import { ContactDTO } from 'src/modelDTO/contact';
import { Tag } from 'src/model/tag';
import { TagDTO } from 'src/modelDTO/tag';
import { ContactTags } from 'src/model/contactTags';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'http://localhost:5000/api';
  private URL_CONTACT = `${this.URL}/Contact`;
  private URL_TAG = `${this.URL}/Tag`;


  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.URL_CONTACT);
  }

  getContact(contactId: String): Observable<Contact> {
    return this.http.get<Contact>(this.URL_CONTACT + '/' + contactId);
  }

  getContactsByTag(tagId: String): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.URL_TAG + '/' + tagId + "/Contacts");
  }

  getTagsByContact(contactId: String): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.URL_CONTACT + '/' + contactId + "/Tags");
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(this.URL_CONTACT + '/' + contact.contactId, contact);
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(this.URL_TAG + "/" + tag.tagId, tag);
  }

  createContact(contact: ContactDTO): Observable<Contact> {
    return this.http.post<Contact>(this.URL_CONTACT, contact);
  }

  deleteContact(contactId: String): Observable<Object> {
    return this.http.delete(this.URL_CONTACT + '/' + contactId);
  }

  addContactsToTag(tagId: String, contactIds: String[]): Observable<ContactTags[]> {
    return this.http.post<ContactTags[]>(this.URL_TAG + "/AddContacts/" + tagId, contactIds);
  }

  deleteTag(tagId: String): Observable<Object> {
    return this.http.delete(this.URL_TAG + '/' + tagId);
  }

  search(filterString: String): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.URL_CONTACT + "/Search/" + filterString);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.URL_TAG);
  }

  createTag(tag: TagDTO): Observable<Tag> {
    return this.http.post<Tag>(this.URL_TAG, tag);
  }
}

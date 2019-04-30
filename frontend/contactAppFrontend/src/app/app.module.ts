import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactsComponentComponent } from './contacts-component/contacts-component.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { UpdateTagComponent } from './update-tag/update-tag.component';
import { ViewComponentComponent } from './view-component/view-component.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ContactsComponentComponent
  },
  {
    path: '**', component: NotFoundComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponentComponent,
    NotFoundComponent,
    CreateContactComponent,
    UpdateContactComponent,
    UpdateTagComponent,
    ViewComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateContactComponent, UpdateContactComponent, UpdateTagComponent, ViewComponentComponent]
})
export class AppModule { }

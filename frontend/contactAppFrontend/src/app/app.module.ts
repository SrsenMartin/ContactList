import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactsComponentComponent } from './contacts-component/contacts-component.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    CreateContactComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateContactComponent]
})
export class AppModule { }

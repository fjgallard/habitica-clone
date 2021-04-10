import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material.module';

const firestoreModules = [
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFirestoreModule, // firestore
  AngularFireAuthModule, // auth
  AngularFireStorageModule
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    ...firestoreModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

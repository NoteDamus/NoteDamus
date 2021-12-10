import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { MaterialModule } from '../app/material.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
//import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
//import { AngularFireAnalyticsModule, ScreenTrackingService,  UserTrackingService } from '@angular/fire/analytics';
//import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    
    BrowserModule, IonicModule.forRoot({
    rippleEffect: false,
    mode: 'ios',
    //scrollAssist: true,
    //scrollPadding: false,
    //mode: 'md'
  }),
  IonicStorageModule.forRoot(),

  HttpClientModule,
  AppRoutingModule, BrowserAnimationsModule, MaterialModule, 
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule.enablePersistence(),
  AngularFireAuthModule,
  AngularFireStorageModule,
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production,
    // Register the ServiceWorker as soon as the app is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  }), 
],
  providers: [
    AngularFirestore,
    InAppBrowser,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  
],
  bootstrap: [AppComponent],
})
export class AppModule {}

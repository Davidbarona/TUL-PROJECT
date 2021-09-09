import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// ionic module 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


//component modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//modules 
import { BackendModule } from './pages/backend/backend.module';
import { PagesModule } from './pages/pages.module';

//firebase Module 

import { AngularFireModule } from '@angular/fire/compat'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { environment } from 'src/environments/environment';
import {AngularFireStorageModule} from '@angular/fire/compat/storage'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [AppComponent],

  entryComponents: [],

  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    BackendModule,
    PagesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

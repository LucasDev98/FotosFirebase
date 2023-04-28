import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargarFotosComponent } from './components/cargar-fotos/cargar-fotos.component';
import { RoutingModule } from './app.routing.module'
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment'
import { NgDropDirective } from '../app/directives/ng-drop.directive';

//Firebase

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { getAuth, provideAuth} from '@angular/fire/auth';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargarFotosComponent,
    NgDropDirective
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

  ],
  providers: [ { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

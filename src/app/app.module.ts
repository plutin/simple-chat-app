import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MessagesWindowComponent } from './components/messages-window/messages-window.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {SharingService} from './services/sharing.service';
import {DataService} from './services/data.service';
import {FormsModule} from '@angular/forms';
import {UtilsService} from './services/utils.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    UsersListComponent,
    MessagesWindowComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule
  ],
  entryComponents: [ChatWindowComponent],
  providers: [SharingService, DataService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

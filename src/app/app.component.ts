import {OnInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy} from '@angular/core';
import {ChatWindowComponent} from './components/chat-window/chat-window.component';
import * as _ from 'lodash';
import {User} from "./models/user";
import {SharingService} from "./services/sharing.service";
import {DataService} from "./services/data.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'simple-chat-app';
  componentRef: any;
  components = [];
  numOffLineUsers = true;
  offlineUsers: User[];
  usersList: User[];

  subscription;
  @ViewChild('container', { static: true, read: ViewContainerRef }) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver,
              private sharingService: SharingService, private dataService: DataService) { }

  ngOnInit() {

    if (this.numOffLineUsers) {
      this.addChatComponent();
    }
    this.checkOfflineUsers();
    this.subscription = this.dataService.getUsersListStatus().subscribe(
      res => {
        if (res) {
          this.checkOfflineUsers();
          if (this.components.length > 0 ) {
            this.removeLoggedOutChat();
          }
        }
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }
  addChatComponent() {
    const factory = this.resolver.resolveComponentFactory(ChatWindowComponent);
    const componentRef = this.entry.createComponent(factory);
    this.components.push(componentRef);
  }
  checkOfflineUsers() {
    this.usersList = this.sharingService.getUserSettings('users-list') || this.sharingService.getUsers();
    this.offlineUsers = _.filter(this.usersList, {status : 'offline'});
    if ( this.offlineUsers.length > 0 ) {
      this.numOffLineUsers = true;
    } else {
      this.numOffLineUsers = false;
    }
  }

  removeLoggedOutChat() {
    for (const c in this.components) {
      if (this.components[c].instance.chatOwner.status === 'offline') {
        this.components[c].destroy();
        this.components.splice(parseInt(c, 10) - 1, 1);
      }
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

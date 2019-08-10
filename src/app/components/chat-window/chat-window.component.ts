import {Component, OnDestroy, OnInit, } from '@angular/core';
import {faCog, faPaperclip, faCommentAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../models/user';
import {SharingService} from '../../services/sharing.service';
import * as _ from 'lodash';
import {UtilsService} from '../../services/utils.service';
import {DataService} from '../../services/data.service';
import {Channel} from '../../models/channel';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  faSignOut = faSignOutAlt;
  faPaperClip = faPaperclip;
  faCommentDots = faCommentAlt;

  messageText = '';
  chatOwner: User;
  offlineUsers: User[];
  usersList: User[];
  currentChannel: Channel;
  subscription;
  constructor(private sharingService: SharingService, private utilsService: UtilsService, private dataService: DataService) { }

  ngOnInit() {
    this.usersList = this.sharingService.getUserSettings('users-list') || this.sharingService.getUsers();
    this.offlineUsers = _.filter(this.usersList, {status : 'offline'});
    if (this.offlineUsers.length > 0) {
      this.chatOwner = _.sample(this.offlineUsers);
      this.setStatus('online');
    } else {
      this.chatOwner = _.sample(this.usersList);
    }

    this.subscription = this.dataService.getCurrentChannel().subscribe(
      res => {
        if (this.currentChannel) {
          this.currentChannel.chatId = res.channelId;
        } else {
          this.currentChannel = {chatId: res.channelId, messages: []};
        }
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }
  sendMessage(messageText: string) {
    if (messageText !== '') {
      this.currentChannel.messages = this.sharingService.getUserSettings(this.currentChannel.chatId) ?
        this.sharingService.getUserSettings(this.currentChannel.chatId).messages : [];

      this.currentChannel.messages.push({
        senderId: this.chatOwner.id,
        text: messageText,
        timestamp: Date.now().toString(),
        delivered: false
      });

      this.sharingService.setSettings(this.currentChannel.chatId, this.currentChannel);
      this.messageText = '';
      this.dataService.setActiveChannel(this.currentChannel.chatId, this.chatOwner.id);
    }
  }
  setStatus(status: string) {
    this.chatOwner.status = status;
    this.usersList[ _.findIndex(this.usersList, {id: this.chatOwner.id})].status = status;
    this.sharingService.setSettings('users-list', this.usersList);
    this.dataService.updateUsersListStatus(true);
  }
  signOut() {
    this.setStatus('offline');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

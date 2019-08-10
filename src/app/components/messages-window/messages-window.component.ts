import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Channel} from '../../models/channel';
import {Message} from '../../models/message';
import {DataService} from '../../services/data.service';
import {SharingService} from '../../services/sharing.service';
import {faCheckDouble, faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-messages-window',
  templateUrl: './messages-window.component.html',
  styleUrls: ['./messages-window.component.css']
})
export class MessagesWindowComponent implements OnInit, OnDestroy {
  @Input() chatOwner: User;
  chatChannel: Channel;
  messages: Message[];
  channelOwnerId: number;
  subscription;
  faCheckDouble = faCheckDouble;
  faCheck = faCheck;
  constructor(private dataService: DataService, private sharingService: SharingService) { }

  ngOnInit() {
    this.subscription = this.dataService.getCurrentChannel().subscribe(
      res => {
        if (this.chatChannel) {
          this.chatChannel.chatId = res.channelId;
          this.channelOwnerId = res.chatOwnerId;
        } else {
          this.chatChannel = {chatId: res.channelId, messages: []};
          this.channelOwnerId = res.chatOwnerId;
        }
        this.refreshMessages();
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }
  refreshMessages() {
    if ( this.sharingService.getUserSettings(this.chatChannel.chatId) && (this.channelOwnerId === this.chatOwner.id) ) {
      this.chatChannel  = this.sharingService.getUserSettings(this.chatChannel.chatId);
      this.messages = this.chatChannel.messages;
      this.messages.forEach((el) => {
        if (el.senderId !== this.channelOwnerId) {
          el.delivered = true;
        }
      });
    } else if ( (!this.sharingService.getUserSettings(this.chatChannel.chatId) && (this.channelOwnerId === this.chatOwner.id))
        || this.chatChannel.chatId.indexOf('Default') > -1 ) {
      this.messages = [];
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

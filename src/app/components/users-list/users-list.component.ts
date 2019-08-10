import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SharingService} from '../../services/sharing.service';
import {User} from '../../models/user';
import {DataService} from '../../services/data.service';
import * as _ from 'lodash';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  @Input() chatOwner: User;
  users: User[];
  filteredUsers: User[];
  selectedUser: User;
  subscription;
  _contactFilter: string;
  get contactFilter() {
    return this._contactFilter;
  }

  set contactFilter(newValue: string) {
    this._contactFilter = newValue;
    this.filteredUsers = this.contactFilter ? this.filterList(this.contactFilter) : this.users;
  }
  constructor(private sharingService: SharingService,
              private dataService: DataService, private utilsService: UtilsService) {
  }

  ngOnInit() {
   this.getUsers();
   this.subscription = this.dataService.getUsersListStatus().subscribe(
      res => {
        if (res) {
          this.getUsers();
        }
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }
  getUsers() {
    this.users = this.sharingService.getUserSettings('users-list') || this.sharingService.getUsers();
    this.filteredUsers = _.filter(this.users, (obj) =>  obj.id !== this.chatOwner.id );
  }
  filterList(filterBy: string) {
    return this.users.filter(
      (user: User) => user.name.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) > -1
    );
  }
  selectContact(contact: User) {
    // Update users Array with new values, save it to localStorage and update Behaviour Subject
    const selectedChannelId  = this.utilsService.getSelectedChannelId(this.chatOwner.id, contact.id);
    this.users.map(obj => {
      obj.selected = false;
    });
    _.find(this.users, {id: contact.id}).selected = true;
    this.selectedUser = contact;
    this.sharingService.setSettings('users-list', this.users);
    this.dataService.setActiveChannel(selectedChannelId, this.chatOwner.id);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

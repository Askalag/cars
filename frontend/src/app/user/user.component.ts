import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {SimpleUserAuthInfo} from '../shared/simple-user-auth-info.model';
import {User} from './user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  panelOpenPersonal = false;
  panelOpenAuth = false;
  user: User = {id: null, name: '',  email: '', password: '', userName: ''};
  userInfo: SimpleUserAuthInfo = {userName: '', roles: [''], token: ''};

  constructor(private userService: UserService,
              private token: TokenStorageService) { }

  ngOnInit() {
    this.userInfo.userName = this.token.getUserName();
    if (this.userInfo.userName == null || undefined) {
      this.userInfo.userName = '';
    }
    this.userInfo.roles = this.token.getAuthorities();
    this.userInfo.token = this.token.getToken();
    this.userService.getUserByUserName(this.userInfo.userName.toString()).subscribe(user => {
      this.user = user;
    });
  }
}

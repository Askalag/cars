import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  public userInfoName: string;

  public action: string;

  constructor(private tokenStorage: TokenStorageService) {

  }


  onAction(action: string):void {
    this.action = action;
  }


  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        } else if (role === 'ROLE_JOKE') {
          this.authority = 'joke';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }

    this.userInfoName = this.tokenStorage.getUserName();
  }

}

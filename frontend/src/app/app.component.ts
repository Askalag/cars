import {Component, Input, OnInit} from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  public blur: boolean = false;

  constructor(private tokenStorage: TokenStorageService) {
  }

  onBlur() {
    this.blur = !this.blur;
  }

  onNotify(message:boolean):void {
    this.blur= message;
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
        }
        this.authority = 'user';
        return true;
      });
    }
  }

}

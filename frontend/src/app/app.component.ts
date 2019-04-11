import {Component, OnInit} from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private roles: string[];
  public userInfoName: string;

  public action: string;

  constructor(private tokenStorage: TokenStorageService) {}

  onAction(action: string): void {
    this.action = action;
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
    }

    this.userInfoName = this.tokenStorage.getUserName();
  }
}

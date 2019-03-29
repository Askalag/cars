import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  public simpleUserInfo: {userName: string, roles: string[], token: string} = {userName: '', roles: [], token: ''};
  @Output()
  public action = new EventEmitter<string>();

  constructor(private token: TokenStorageService) { }

  onAction(action: string):void {
    this.action.emit(action);
  }

  ngOnInit() {
    this.simpleUserInfo.userName = this.token.getUserName();
    this.simpleUserInfo.roles = this.token.getAuthorities();
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

}

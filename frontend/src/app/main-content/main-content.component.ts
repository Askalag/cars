import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  public userInfoName: string;
  @Output()
  public action = new EventEmitter<string>();

  constructor(private token: TokenStorageService) { }

  onAction(action: string):void {
    this.action.emit(action);
  }

  ngOnInit() {
    this.userInfoName = this.token.getUserName();
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

}

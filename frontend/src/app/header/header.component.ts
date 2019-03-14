import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

}

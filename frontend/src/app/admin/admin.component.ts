import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public board: string;
  public errorMessage: string;

  constructor(private userService: UserService) { }

  public ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      (data) => {
        this.board = data;
      },
      (error) => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      },
    );
  }
}

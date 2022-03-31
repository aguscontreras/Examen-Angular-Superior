import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss'],
})
export class CardDashboardComponent implements OnInit {
  @Input() set loggedUser(user: User | null) {
    if (user != null) {
      this.user = user;
    }
  }

  user: User;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  user$: Observable<User | null>;
  constructor(private readonly authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.user$ = this.authenticationService.user$;
  }
}

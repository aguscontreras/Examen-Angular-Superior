import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  user$: Observable<User | null>;
  constructor(private readonly authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.user$ = this.authenticationService.user$;
  }
}

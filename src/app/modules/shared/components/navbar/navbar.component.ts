import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onClikBtnLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}

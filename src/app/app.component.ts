import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user$: Observable<User | null>;
  constructor(private readonly authenticationService: AuthenticationService) {
    this.user$ = this.authenticationService.user$;
  }
}

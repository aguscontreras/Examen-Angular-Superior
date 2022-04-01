import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  private user: User | null;
  loginForm: FormGroup;

  get f() {
    return this.loginForm.controls;
  }

  subscriptions: Subscription;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    const userSusc = this.authenticationService.user$.subscribe({
      next: (user) => {
        this.user = user;
        if (this.user != null) {
          this.goToDashboard();
        }
      },
    });

    this.subscriptions.add(userSusc);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password, remember } = this.loginForm.value;

    this.authenticationService
      .loginUser(email, password, remember)
      .pipe(first())
      .subscribe({
        error: (err) => this.openErrorSnackBar(err.error),
      });
  }

  openErrorSnackBar(message: string): void {
    this.matSnackBar.open(message, 'Aceptar', {
      duration: 5000,
    });
  }

  goToDashboard(): void {
    const url = `/dashboard/${this.user?.role}`;
    this.router.navigate([url]);
  }
}

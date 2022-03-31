import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private readonly authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const { email, password, remember } = this.loginForm.value;

    this.authenticationService
      .loginUser(email, password, remember)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log(res);
        },

        error: (err) => this.openErrorSnackBar(err.error),
      });
  }

  openErrorSnackBar(message: string): void {
    this.matSnackBar.open(message, 'Aceptar', {
      duration: 5000,
    });
  }
}

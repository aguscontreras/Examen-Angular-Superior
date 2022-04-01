import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { first } from 'rxjs';
import { User } from '../../../models';
import { Role } from '../../../models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  profileForm: FormGroup;
  userDataForm: FormGroup;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const pattern = new RegExp(
      /(?=.*[A-Z])(?=.*[0-9])[#@£$-/:-?{-~!"^_`\[\]a-zA-Z0-9]{6,25}/
    );

    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(pattern)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(pattern)]],
    });

    this.userDataForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(12), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid || this.userDataForm.invalid) return;

    const userData: Partial<User> = {
      ...this.profileForm.value,
      ...this.userDataForm.value,
      role: Role.User,
    };

    this.authenticationService
      .registerNewUser(userData)
      .pipe(first())
      .subscribe({
        next: (user) => {
          const message = 'Bienvenido/a. Redirigiendo al Dashboard...';
          this.onSuccesfullRegistration(user, message);
        },
        error: (error) => this.onFailedRegistration(error.error),
      });
  }

  onSuccesfullRegistration(user: User, message: string): void {
    const snackBar = this.matSnackBar.open(message, 'Aceptar', {
      duration: 4200,
    });

    snackBar
      .afterDismissed()
      .pipe(first())
      .subscribe({
        next: () => this.router.navigate([`/dashboard/${user.role}`]),
      });
  }

  onFailedRegistration(message: string): void {
    this.matSnackBar.open(message, 'Aceptar', {
      duration: 4500,
    });
  }

  getErrorMessage(formControl: AbstractControl): string {
    const errors = formControl.errors || {};
    if ('required' in errors) return 'Este campo es requerido.';
    if ('pattern' in errors)
      return 'Debe contener al menos una Mayúscula y un Número.';
    if ('min' in errors) return 'Debe ser mayor a 12.';
    if ('max' in errors) return 'Fuera de rango máximo.';
    return '';
  }
}

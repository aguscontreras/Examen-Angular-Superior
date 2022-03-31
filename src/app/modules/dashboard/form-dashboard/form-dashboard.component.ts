import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models';
import { Role } from '../../../models';

@Component({
  selector: 'app-form-dashboard',
  templateUrl: './form-dashboard.component.html',
  styleUrls: ['./form-dashboard.component.scss'],
})
export class FormDashboardComponent implements OnInit {
  @Input() set loggedUser(user: User | null) {
    if (user != null) {
      this.user = user;
    }
  }

  form: FormGroup;
  user: User;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: [null],
      role: [
        { value: '', disabled: this.user?.role !== Role.Admin },
        Validators.required,
      ],
    });

    if (this.user != null) this.setUserData(this.user);
  }

  setUserData(user: User): void {
    this.form.patchValue({
      lastname: user.lastname,
      firstname: user.firstname,
      age: user.age,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  }
}

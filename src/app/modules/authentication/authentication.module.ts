import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from '../authentication/authentication-routing.module';
import { LoginComponent } from '../authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthenticationRoutingModule,
  ],
})
export class AuthenticationModule {}

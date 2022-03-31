import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FormDashboardComponent } from './form-dashboard/form-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardDashboardComponent } from './card-dashboard/card-dashboard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserDashboardComponent,
    FormDashboardComponent,
    CardDashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class DashboardModule {}

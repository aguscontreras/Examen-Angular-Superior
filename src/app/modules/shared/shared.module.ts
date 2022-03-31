import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';

const shared = [NavbarComponent];

@NgModule({
  declarations: [...shared],
  imports: [CommonModule, MaterialModule],
  exports: [...shared],
})
export class SharedModule {}

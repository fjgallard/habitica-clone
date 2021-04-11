import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';

import { MaterialModule } from 'src/app/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [DashboardComponent, NavbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,

    MaterialModule
  ]
})
export class DashboardModule { }

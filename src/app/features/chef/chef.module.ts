import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefRoutingModule } from './chef-routing.module';
import { ChefDashboardComponent } from './pages/dashboard/chef-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    ChefRoutingModule
  ]
})
export class ChefModule { }

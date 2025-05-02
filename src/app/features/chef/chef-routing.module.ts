import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefDashboardComponent } from './pages/dashboard/chef-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/chef-dashboard.component').then(m => m.ChefDashboardComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefRoutingModule { }

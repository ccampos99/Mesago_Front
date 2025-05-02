import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'mesero',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/mesero/mesero.module').then(m => m.MeseroModule)
      }
    ]
  },
  {
    path: 'chef',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/chef/chef.module').then(m => m.ChefModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

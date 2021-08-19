import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './_gards/auth.guard';

export const approutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // {
  //   path: '', // localhost:4200/members
  //   // runGuardsAndResolvers: 'always',
  //   // canActivate: [AuthGuard],
  //   // children: [{ path: 'register', component: RegisterComponent }],
  // },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

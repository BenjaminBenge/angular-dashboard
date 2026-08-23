import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'members',
    loadComponent: () => import('./features/members/members.component').then((m) => m.MembersComponent),
  },
  {
    path: 'employers',
    loadComponent: () => import('./features/employers/employers.component').then((m) => m.EmployersComponent),
  },
  {
    path: 'claims',
    loadComponent: () => import('./features/claims/claims.component').then((m) => m.ClaimsComponent),
  },
  {
    path: 'investments',
    loadComponent: () => import('./features/investments/investments.component').then((m) => m.InvestmentsComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/placeholder/placeholder.component').then((m) => m.PlaceholderComponent),
    data: { title: 'Settings' },
  },
  { path: '**', redirectTo: '/dashboard' },
];

import { Routes } from '@angular/router';
import { Login } from './shared/components/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { CreateIssue } from './features/issues/create-issue/create-issue';
import { IssuesList } from './features/issues/issues-list/issues-list';
import { EditIssue } from './features/issues/edit-issue/edit-issue';
import { Profile } from './features/profile/profile';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
  path: 'issues/create',
  component: CreateIssue,
},

{
  path: 'issues',
  component: IssuesList,
},
{
  path: 'issues/edit/:id',
  component: EditIssue,
},
{ path: 'profile', 
  component: Profile },
  
    ],
  },
];
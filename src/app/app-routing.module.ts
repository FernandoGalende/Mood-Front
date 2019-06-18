import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousComponent } from './anonymous/anonymous.component';
import { DashboardComponent } from './how-i-feel-today/dashboard/dashboard.component';
import { DashboardHrComponent } from './hr/dashboard-hr/dashboard-hr.component';
import { ThoughtsFeedComponent } from './hr/thoughts-feed/thoughts-feed.component';
import { KudosDashboardComponent } from './kudos/kudos-dashboard/kudos-dashboard.component';
import { NewKudoComponent } from './kudos/new-kudo/new-kudo.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './services/AuthGuard.guard';
import { HrGuard } from './services/hr-guard.guard';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { UserThoughtsComponent } from './suggestions/user-thoughts/user-thoughts.component';

export const ROUTES: Routes = [
  {
    path: 'suggestions',
    component: SuggestionsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'suggestions/mine',
    component: UserThoughtsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'kudos',
    component: KudosDashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'kudos/new',
    component: NewKudoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'moods',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'hr',
    component: DashboardHrComponent,
    canActivate: [AuthGuardService, HrGuard]
  },
  {
    path: 'hr/thoughts',
    component: ThoughtsFeedComponent,
    canActivate: [AuthGuardService, HrGuard]
  },
  {
    path: ':id',
    component: AnonymousComponent,
    canActivate: [AuthGuardService]
  },
  { path: '', redirectTo: 'moods', pathMatch: 'full' },
  { path: '**', redirectTo: 'moods' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

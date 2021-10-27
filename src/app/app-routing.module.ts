import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardMesaComponent } from './dashboard-mesa/dashboard-mesa.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { EditPollComponent } from './edit-poll/edit-poll.component';
import { VoteComponent } from './vote/vote.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mesa', component: DashboardMesaComponent },
  { path: 'mesa/create', component: CreatePollComponent },
  { path: 'mesa/poll/edit/:id', component: EditPollComponent},
  { path: 'vote/:id', component: VoteComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

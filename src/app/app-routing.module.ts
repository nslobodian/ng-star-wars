import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonComponent } from './person/person.component';

const routes: Routes = [
  { path: 'heros', component: PeopleComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PersonComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }

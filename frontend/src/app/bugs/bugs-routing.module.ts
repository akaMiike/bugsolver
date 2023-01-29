import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BugsComponent } from './components/bugs/bugs.component';
import { BugDetailsComponent } from './components/bug-details/bug-details.component';

const routes: Routes = [
  {path: '', component: BugsComponent, pathMatch: 'full'},
  {path: ':id', component: BugDetailsComponent, pathMatch: 'full'},
  {path: '**', redirectTo: 'bugs'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class BugsRoutingModule { }

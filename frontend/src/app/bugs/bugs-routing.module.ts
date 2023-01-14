import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BugsComponent } from './components/bugs.component';

const routes: Routes = [
  {path: '', component: BugsComponent, pathMatch: 'full'},
  {path: "**", redirectTo: ''}
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

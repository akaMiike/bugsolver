import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsRoutingModule } from './bugs-routing.module';
import { BugsComponent } from './components/bugs.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { BugDetailsComponent } from './components/bug-details/bug-details.component';

@NgModule({
  declarations: [
    BugsComponent,
    BugDetailsComponent
  ],
  imports: [
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    CommonModule,
    BugsRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BugsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsRoutingModule } from './bugs-routing.module';
import { BugsComponent } from './components/bugs/bugs.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { BugDetailsComponent } from './components/bug-details/bug-details.component';
import { NewBugComponent } from './components/new-bug/new-bug.component';
import { UpdateBugComponent } from './components/update-bug/update-bug.component';

@NgModule({
  declarations: [
    BugsComponent,
    BugDetailsComponent,
    NewBugComponent,
    UpdateBugComponent
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

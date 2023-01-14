import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsRoutingModule } from './bugs-routing.module';
import { BugsComponent } from './components/bugs.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    BugsComponent
  ],
  imports: [
    NgMultiSelectDropDownModule,
    CommonModule,
    BugsRoutingModule,
    TranslateModule,
    FormsModule
  ]
})
export class BugsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsRoutingModule } from './bugs-routing.module';
import { BugsComponent } from './bugs.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    BugsComponent
  ],
  imports: [
    CommonModule,
    BugsRoutingModule,
    TranslateModule
  ]
})
export class BugsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedRoutingModule } from './shared-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TranslateModule,
    HttpClientModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
  ]
})
export class SharedModule { }

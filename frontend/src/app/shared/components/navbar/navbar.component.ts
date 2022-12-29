import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  languageSelected!: string;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.selectLanguage(environment.defaultLanguage);
  }

  selectLanguage(language: string) {
    this.translate.use(language);
    this.languageSelected = this.translate.currentLang; 
  }

}

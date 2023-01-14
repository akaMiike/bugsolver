import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { Page } from 'src/app/shared/models/page.model';
import { CategoryService } from 'src/app/shared/service/category.service';
import { Bug } from '../models/bug.model';
import { BugsService } from '../service/bugs.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {

  categoriesList : any[] = [];

  categoriesDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    searchPlaceholderText: "Buscar",
    itemsShowLimit: 6,
    noDataAvailablePlaceholderText: "Nenhuma categoria encontrada.",
    allowSearchFilter: true
  };

  pageConfig = new Page<Bug>();

  
  constructor(
    private translate: TranslateService,
    private bugService: BugsService,
    private categoryService: CategoryService
  ) { }
    
  ngOnInit() {
    this.getCategories();
    this.getBugs(new Page<Bug>());
  }

  getBugs(params: Page<Bug>){
    this.bugService.getAll(params).subscribe( (page) => {
      this.pageConfig.content = page.content
    })
  }

  getCategories(){
    this.categoryService.getAll().subscribe( (categories) => {
      this.categoriesList = categories.map((category) => { return {id: category.id, name: category.name} })
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
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
  selectedCategories: any[] = [];

  form = this.fb.group({
    title: [''],
    categories: new FormControl([] as any[])
  })

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
    private fb: FormBuilder,
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
      this.pageConfig.totalElements = page.totalElements;
      this.pageConfig.content = page.content
    })
  }

  getBugsByPage(page: number){
    this.pageConfig.page = page;
    this.getBugs(this.pageConfig);
  }

  getBugsByFilter(){
    var categories = this.form.value.categories?.map(category => category.name).filter(c => c).join(',')
    console.log(categories)
    this.pageConfig.filters = {
      title :  this.form.value.title ?? null,
      categories: categories ?? []
    };
    this.getBugs(this.pageConfig);
  }

  getCategories(){
    this.categoryService.getAll().subscribe( (categories) => {
      this.categoriesList = categories.map((category) => { return {id: category.id, name: category.name} })
    })
  }

}

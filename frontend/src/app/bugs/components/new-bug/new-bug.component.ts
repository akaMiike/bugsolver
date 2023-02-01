import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/service/category.service';
import { FormValidationsService } from 'src/app/shared/service/form-validations.service';
import { BugsService } from '../../service/bugs/bugs.service';

@Component({
  selector: '.app-new-bug',
  templateUrl: './new-bug.component.html',
  styleUrls: ['./new-bug.component.css']
})
export class NewBugComponent implements OnInit, AfterViewInit{

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

  categoriesList : any[] = [];
  selectedCategories : any[] = [];
  loading = false;

  newBugForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    categories: new FormControl([] as any[], [Validators.required])
  })

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private bugsService: BugsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private formValidations: FormValidationsService,
    private router: Router
  ){}
  
  ngAfterViewInit(): void {
    this.newBugForm.markAsPristine();
  }
  
  ngOnInit(): void {
    this.getCategories();
  }

  hasError(formControlName: string): boolean {
    return this.formValidations.hasError(this.newBugForm, formControlName);
  }

  getMessageError(formControlName: string): string {
    return this.formValidations.getMessageError(this.newBugForm, formControlName);
  }

  createBug(){
    this.loading = true;
    this.bugsService.createBug(
      this.newBugForm.value.title!!,
      this.newBugForm.value.description!!,
      this.newBugForm.value.categories!!.map(c => ({id: c.id}))
    ).subscribe((newBug) => {
      this.toastr.success(
        this.translate.instant("BUG.CREATE.CREATED-MESSAGE")
      );
      this.router.navigate(['/bugs/' + newBug.id]);
    }).add(() => {this.loading = false});
  }

  getCategories(){
    this.categoryService.getAll().subscribe((categories) => {
      this.categoriesList = categories;
    })
  }
}

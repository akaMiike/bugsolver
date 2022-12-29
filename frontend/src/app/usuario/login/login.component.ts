import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormValidationsService } from 'src/app/shared/services/form-validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private formValidations: FormValidationsService
  ) { }

  ngOnInit(): void {
  }

  hasError(formControlName: string): boolean {
    return this.formValidations.hasError(this.form, formControlName);
  }

  getMessageError(formControlName: string): string {
    return this.formValidations.getMessageError(this.form, formControlName);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FormValidationsService } from 'src/app/shared/services/form-validations.service';
import { CustomValidations } from 'src/app/shared/utils/custom-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    username: ['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, CustomValidations.matchPassword('password')]]
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

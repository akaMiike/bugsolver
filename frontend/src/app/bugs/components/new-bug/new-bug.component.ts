import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-bug',
  templateUrl: './new-bug.component.html',
  styleUrls: ['./new-bug.component.css']
})
export class NewBugComponent {

  form = this.fb.group({
    title: ['', [Validators.required]],
    categories: new FormControl([] as any[], [Validators.required]),
    description: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder){}
}

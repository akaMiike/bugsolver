import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Bug } from '../../models/bug.model';
import { BugsService } from '../../service/bugs.service';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit{

  bugDetail = <Bug>{};
  bugId: number = 0;
  
  constructor(
    private bugsService: BugsService,
    private router: ActivatedRoute,
    private translate: TranslateService
  ){}

  ngOnInit(): void {
    this.bugId = this.router.snapshot.params['id'];
    this.bugsService.getById(this.bugId).subscribe(
      bug => {this.bugDetail = bug;}
    )
  }

}

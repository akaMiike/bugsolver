import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Page } from 'src/app/shared/models/page.model';
import { Bug } from '../../models/bug.model';
import { Reply } from '../../models/reply.model';
import { BugsService } from '../../service/bugs/bugs.service';
import { ReplyService } from '../../service/reply/reply.service';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css']
})
export class BugDetailsComponent implements OnInit{

  bugDetail = <Bug>{};
  bugId: number = 0;
  isPostOwner: boolean = false;
  isAuthenticated: boolean = false;

  pageReply: Page<Reply> = new Page<Reply>();

  replyForm = this.fb.group({
    description: ['', [Validators.required]]
  })
  
  constructor(
    private bugsService: BugsService,
    private replyService: ReplyService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    translate: TranslateService
  ){}

  ngOnInit(): void {
    this.bugId = this.router.snapshot.params['id'];
    this.getBugById();
    this.getReplies();
    this.authService.isAuthenticatedObs.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
    })
  }

  getReplies(){
    this.pageReply.size = 5;
    this.replyService.getAllByBugId(this.bugId, this.pageReply).subscribe((page) => {
      this.pageReply.content = page.content;
      this.pageReply.totalElements = page.totalElements;
    });
  }

  getRepliesByPage(page: number){
    this.pageReply.page = page;
    this.pageReply.sort = "created_at,DESC";
    this.getReplies();
  }

  getBugById(){
    this.bugsService.getById(this.bugId).subscribe(
      bug => {
        this.bugDetail = bug;
        this.isPostOwner = this.bugDetail.user.username === localStorage.getItem('LOGGED_IN_USERNAME');
      }
    )
  }

}

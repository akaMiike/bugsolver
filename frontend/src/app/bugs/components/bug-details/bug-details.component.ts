import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Page } from 'src/app/shared/models/page.model';
import { FormValidationsService } from 'src/app/shared/service/form-validations.service';
import { HtmlConverter } from 'src/app/shared/utils/html-converter';
import { Bug } from '../../models/bug.model';
import { Reply } from '../../models/reply.model';
import { BugsService } from '../../service/bugs/bugs.service';
import { ReplyService } from '../../service/reply/reply.service';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.css'],
})
export class BugDetailsComponent implements OnInit{

  bestAnswerId: number = 0;
  bugId: number = 0;
  bugDetail = <Bug>{};
  isPostOwner: boolean = false;
  isAnswerOwner: Map<number,boolean> = new Map<number,boolean>();
  isAuthenticated: boolean = false;

  pageReply: Page<Reply> = new Page<Reply>();

  replyForm = this.fb.group({
    description: ['', [Validators.required]]
  })
  
  constructor(
    private bugsService: BugsService,
    private replyService: ReplyService,
    private authService: AuthService,
    private routerAct: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private formValidations: FormValidationsService,
    private htmlConverter: HtmlConverter
  ){}

  ngOnInit(): void {
    this.bugId = this.routerAct.snapshot.params['id'];
    this.getBugById();
    this.getReplies();
    this.authService.isAuthenticatedObs.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated
    })
  }

  hasError(formControlName: string): boolean {
    return this.formValidations.hasError(this.replyForm, formControlName);
  }

  getMessageError(formControlName: string): string {
    return this.formValidations.getMessageError(this.replyForm, formControlName);
  }

  getReplies(){
    this.pageReply.size = 5;
    this.pageReply.sort = "createdAt,DESC"
    this.bugsService.getAllRepliesByBugId(this.bugId, this.pageReply).subscribe((page) => {
      page.content.forEach( (reply) => {
        this.isAnswerOwner.set(reply.id!!, this.isLoggedUserOwner(reply.user.username))
      })
      this.pageReply.content = page.content;
      this.pageReply.totalElements = page.totalElements;
    });
  }

  getRepliesByPage(page: number){
    this.pageReply.page = page;
    this.pageReply.sort = "createdAt,DESC";
    this.getReplies();
  }

  getBugById(){
    this.bugsService.getById(this.bugId).subscribe(
      bug => {
        bug.description = this.htmlConverter.getCodeSnippetAsHtml(bug.description)

        this.bugDetail = bug;
        this.isPostOwner = this.isLoggedUserOwner(this.bugDetail.user.username);
      },
      err => {
        if(err.status == 404){
          this.router.navigate(['/bugs']);
        }
      }
    )
  }

  deleteBug(): void{
    this.bugsService.deleteById(this.bugId).subscribe(() => {
    this.toastr.success(
        this.translate.instant("BUG.DELETED-SUCCESSFULLY")
      );
    });
    
    this.router.navigate(["/bugs"]);
  }

  setBestAnswer(){
    this.bugsService.updateBestAnswer(this.bugId, this.bestAnswerId).subscribe( () => 
    {
      this.toastr.success(
        this.translate.instant("BUG.BEST-ANSWER.UPDATED-SUCCESSFULLY")
      )
      this.getRepliesByPage(1);
    })
  }

  setBestAnswerId(replyId: number){
    this.bestAnswerId = replyId;
  }

  createNewReply(){
    this.bugsService.createBugReply(this.bugId, this.replyForm.value.description!!).subscribe(() => {
      this.toastr.success(
        this.translate.instant("BUG.ANSWERS.CREATED")
      )
      this.getRepliesByPage(1);
      this.replyForm.reset()
    })
  }

  isLoggedUserOwner(userOwner: string){
   return userOwner === sessionStorage.getItem('LOGGED_IN_USERNAME')  
  }

}

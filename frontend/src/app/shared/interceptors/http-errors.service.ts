import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorsService implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private translate: TranslateService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(response => {
      if(response instanceof HttpErrorResponse){
        if(response.status == 401){
          this.toastr.info(
            this.translate.instant('AUTH.SESSION_EXPIRED')
          )
          this.authService.logout()
          this.router.navigate(['/user/login'])
        }
      }

      if(response.error && response.error.errors){
        (response.error.errors as string[]).forEach(error => {
          this.toastr.error(error);
        })
      }

      return throwError(() => response)
    }))
  }
}

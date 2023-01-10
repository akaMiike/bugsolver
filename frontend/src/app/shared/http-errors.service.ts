import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorsService implements HttpInterceptor{

  constructor(private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(response => {
      if(response.error && response.error.message){
        this.toastr.error(response.error.message)
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

import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HeadersService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        headers: this.configure(req.headers)
      })
    )
  }

  configure(headers: HttpHeaders){
    return headers
      .set("Authorization", `Bearer ${this.getBearerToken()}`)
      .set("Accept-Language", this.getCurrentLanguage());
  }

  getBearerToken(){
    return this.getAuthService().getAuthToken();
  }

  getCurrentLanguage(){
    try{
      return this.getTranslator().currentLang ?? environment.defaultLanguage
    }
    catch {
      return environment.defaultLanguage;
    }
  }

  getTranslator(){
    return this.injector.get(TranslateService);
  }

  getAuthService(){
    return this.injector.get(AuthService);
  }
}

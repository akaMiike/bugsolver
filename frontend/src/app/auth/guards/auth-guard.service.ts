import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild{

  isWarningShowed: boolean = true;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.isAuthenticated()){
      this.isWarningShowed = false;
    }
    else{
      if(!this.isWarningShowed
        && !!this.authService.getAuthToken()
        && this.authService.isRefreshTokenExpired()){
          this.toastr.info(
            this.translate.instant("AUTH.SESSION_EXPIRED")
          )
          this.authService.logout()
          this.isWarningShowed = true
      }
    }
    return true;
  }
}

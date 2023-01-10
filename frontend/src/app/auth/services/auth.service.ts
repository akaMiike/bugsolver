import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tokens } from '../models/tokens.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL: string = `${environment.api}/auth`
  private readonly AUTH_TOKEN_KEY: string = "AUTH_TOKEN"
  private readonly AUTH_TOKEN_EXPIRES_AT_KEY: string = "AUTH_TOKEN_EXPIRES_AT"
  private readonly REFRESH_TOKEN_KEY: string = "REFRESH_TOKEN"
  private readonly REFRESH_TOKEN_EXPIRES_AT_KEY: string = "REFRESH_TOKEN_EXPIRES_AT"
  private LOGGED_IN_USERNAME_KEY: string = "LOGGED_IN_USERNAME"

  private _isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isAuthenticatedObs: Observable<boolean> = this._isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<Tokens>(`${this.URL}/login`, {
      username: username,
      password: password
    }).pipe(
      tap(tokens => this.saveTokens(tokens, username))
    )
  }

  refreshToken(){
    return this.http.get<Tokens>(`${this.URL}/refresh`, {
      headers: {
        "Authorization": "Bearer " + this.getRefreshToken()
      }
    }).pipe(
      tap(tokens => this.saveTokens(tokens, ' '))
    );
  }

  logout(){
    this._isAuthenticatedSubject.next(false);
    localStorage.clear()
  }

  getAuthToken(){
    return localStorage.getItem(this.AUTH_TOKEN_KEY)!;
  }

  getRefreshToken(){
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)!;
  }
  
  isRefreshTokenExpired(){
    var refreshTokenExpiresAt = new Date(localStorage.getItem('REFRESH_TOKEN_EXPIRES_AT')!!)
    return new Date().toString() > refreshTokenExpiresAt.toString()
  }

  isAuthenticated(){
    return !!this.getAuthToken() && !this.isRefreshTokenExpired()
  }

  saveTokens(tokens: Tokens, username: string): void {

    localStorage.setItem(this.AUTH_TOKEN_KEY, tokens.authToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken)
    localStorage.setItem(this.AUTH_TOKEN_EXPIRES_AT_KEY, tokens.authTokenExpiresAt.toString())
    localStorage.setItem(this.REFRESH_TOKEN_EXPIRES_AT_KEY, tokens.refreshTokenExpiresAt.toString())
    
    if(username.trim().length > 0){localStorage.setItem(this.LOGGED_IN_USERNAME_KEY, username)}

    this._isAuthenticatedSubject.next(true);
  }
}

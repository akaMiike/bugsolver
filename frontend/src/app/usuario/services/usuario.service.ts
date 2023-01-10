import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private readonly URL: string = `${environment.api}/user`

  constructor(
    private http: HttpClient) { }

  public register(username: string, email: string, password: string): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.URL}/register`, {
      username: username,
      email: email,
      password: password
    })
  }

}

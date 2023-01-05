import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private readonly URL: string = `${environment.api}/user`

  constructor(private http: HttpClient) { }

  public cadastrarNovoUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${URL}/register`, usuario)
  }

}

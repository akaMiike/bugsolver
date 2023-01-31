import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';
import { environment } from 'src/environments/environment.prod';
import { Reply } from '../../models/reply.model';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private readonly URL: string = `${environment.api}/reply`

  constructor(private http: HttpClient) { }

}

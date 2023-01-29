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

  getAllByBugId(bugId: number, paramConfig: Page<Reply>): Observable<Page<Reply>>{
    return this.http.get<Page<Reply>>(this.URL + "/" + bugId,{
      params: {
        page: paramConfig.page-1,
        size: paramConfig.size,
        sort: paramConfig.sort,
        ...(paramConfig.filters ?? {})
      }}
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';
import { environment } from 'src/environments/environment.prod';
import { Bug } from '../../models/bug.model';

@Injectable({
  providedIn: 'root'
})
export class BugsService {

  private readonly URL: string = `${environment.api}/bug`

  constructor(
    private http: HttpClient
  ) { }

  getAll(paramConfig: Page<Bug>): Observable<Page<Bug>>{
    return this.http.get<Page<Bug>>(this.URL, {
      params: {
        page: paramConfig.page-1,
        size: paramConfig.size,
        sort: paramConfig.sort,
        ...(paramConfig.filters ?? {})
      }
    })
  }

  getById(id: number): Observable<Bug>{
    return this.http.get<Bug>(this.URL + "/" + id)
  }
}

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

  getAllUserBugs(paramConfig: Page<Bug>){
    return this.http.get<Page<Bug>>(this.URL + "/user", {
      params: {
        page: paramConfig.page-1,
        size: paramConfig.size,
        sort: paramConfig.sort,
        ...(paramConfig.filters ?? {})
      }
    })
  }

  createBug(title: string, code:string, description: string, categories: any[]): Observable<Bug>{
    return this.http.post<Bug>(this.URL, {
      title: title,
      code: code,
      description: description,
      categories: categories
    })
  }

  updateBug(id: number, title: string, code:string, description: string, categories: any[]): Observable<Bug>{
    return this.http.put<Bug>(this.URL + "/" + id, {
      title: title,
      code: code,
      description: description,
      categories: categories
    })
  }

  deleteById(bugId: number) {
    return this.http.delete(this.URL + "/" + bugId);
  }

  getById(id: number): Observable<Bug>{
    return this.http.get<Bug>(this.URL + "/" + id)
  }
}

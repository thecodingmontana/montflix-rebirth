import { inject, Injectable, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.tmdbApiUrl;

  http = inject(HttpClient);

  getData(url: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${url}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Movie } from './movie';


@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = 'http://localhost/movieapi';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  add(movie: Movie) {
    return this.http.post(`${this.baseUrl}/add`, { data: movie }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

}
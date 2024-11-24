import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'; // Make sure to import Observable

import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = 'http://localhost/movieapi';  // Your API URL

  constructor(private http: HttpClient) {}

  // Fetch all movies
  getAll(): Observable<Movie[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  // Add a new movie
  add(movie: Movie): Observable<Movie> {
    return this.http.post(`${this.baseUrl}/add`, {data: movie}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  update(movie: Movie) {
    return this.http.put(`${this.baseUrl}/update`, {data: movie});
  }

  delete(movieID: any) {
    const params = new HttpParams()
      .set('movieID', movieID.toString());

    return this.http.delete(`${this.baseUrl}/delete`, { params: params });
  }
}

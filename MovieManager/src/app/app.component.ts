import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
 
import { Movie } from './movie';
import { MovieService } from './movie.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MovieManager';
  movies: Movie[] = [];
  movie: Movie = {movieName:'', genre:'', rating:'', yearMade:'', imageName:''};
 
  error = '';
  success = '';
movieName: any;
 
  constructor(private movieService: MovieService) {
 
  }
 
  ngOnInit() {
    this.getMovies();
  }
 
  getMovies(): void {
    this.movieService.getAll().subscribe(
      (data: Movie[]) => {
        this.movies = data;
        this.success = 'successful list retrieval';
      },
      (err) => {
        console.log (err);
        this.error = err;
      }
    )
  }
 
  addMovie(f: NgForm) {
    this.resetAlerts();
 
    this.movieService.add(this.movie).subscribe(
      (res: Movie) => {
        this.movies.push(res)
        this.success = 'Successfully created';
 
        f.reset();
      },
      (err) => (this.error = err.message)
    );
  }
 
  
  resetAlerts() {
    this.error = '';
    this.success = '';
  }
 
}
 
 
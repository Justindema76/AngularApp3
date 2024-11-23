import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  movies: Movie[] = [];
  movie: Movie = {movieName: '', genre: '', rating: '', yearMade: '', imageName: '', movieID: ''};
  error = '';
  success = '';
  
  genres: string[] = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Crime'
  ];
  
 

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

    // Reset success and error messages
    resetAlerts(): void {
      this.error = '';
      this.success = '';
    }

  // Get all movies
  getMovies(): void {
    this.movieService.getAll().subscribe(
      (data: Movie[]) => {
        this.movies = data;
        this.success = 'Successfully retrieved movie list';
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching movie list:', err);
        this.error = err.message || 'An error occurred while fetching movies.';
      }
    );
  }

  // Add a movie
  addMovie(f: NgForm): void {
    this.resetAlerts();
    this.movieService.add(this.movie).subscribe(
      (res: Movie) => {
        this.movies.push(res);
        this.success = 'Movie successfully added';
        f.reset();
      },
      (err: HttpErrorResponse) => {
        console.error('Add movie failed:', err);
        this.error = err.message || 'An error occurred while adding the movie.';
      }
    );
  }
  editMovie(movieName: any, genre: string, rating: any, yearMade: any, movieID: any) {
    this.resetAlerts();
  
    const updatedMovie = {
      movieName: movieName.value,
      genre: genre, // Ensure genre is directly passed as a string
      rating: rating.value,
      yearMade: yearMade.value,
      movieID: +movieID,
    };
  
    this.movieService.edit(updatedMovie).subscribe(
      (res) => {
        this.success = 'Updated {{movie.genre}} successfully';
      },
      (err) => (this.error = err)
    );
  }
  
  

  
  // deleteMovie(movieID: number): void {
  //   this.movieService.delete(movieID).subscribe(
  //     () => {
  //       this.movies = this.movies.filter(movie => movie.movieID !== movieID);
  //       this.success = 'Movie deleted successfully!';
  //     },
  //     (err) => {
  //       this.error = 'Failed to delete movie: ' + err.message;
  //     }
  //   );
  // }
  }
 
  




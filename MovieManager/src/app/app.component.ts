import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from './movie.service';
import { Movie } from './movie';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  // Ensure this is the correct path
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie = { movieName: '', genre: '', rating: '', yearMade: '', imageName: '', movieID: '' };
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

  resetAlerts(): void {
    this.error = '';
    this.success = '';
  }

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

  addMovie(f: NgForm): void {
    this.resetAlerts();
  
    // Validate the rating before proceeding
    const numericRating = parseFloat(this.movie.rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 10) {
      this.error = 'Rating must be a number between 1 and 10.';
      return;
    }
  
    this.movieService.add(this.movie).subscribe(
      (res: Movie) => {
        this.movies.push(res); // Update the movie list
        this.success = 'Movie successfully added';
        f.resetForm(); // Reset the form
      },
      (err: HttpErrorResponse) => {
        console.error('Add movie failed:', err);
        this.error = err.message || 'An error occurred while adding the movie.';
      }
    );
  }
  updateMovie(movieName: any, genre: string, rating: any, yearMade: any, movieID: any): void {
    this.resetAlerts();
  
    // Validate the rating before proceeding
    const numericRating = parseFloat(rating.value);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 10) {
      this.error = 'Rating must be a number between 1 and 10.';
      return;
    }
  
    const updatedMovie = {
      movieName: movieName.value,
      genre: genre,
      rating: rating.value,
      yearMade: yearMade.value,
      movieID: +movieID,
    };
  
    this.movieService.update(updatedMovie).subscribe(
      (res) => {
        this.success = 'Updated successfully';
        // Update the local movie list for UI consistency
        const index = this.movies.findIndex((movie) => movie.movieID === +movieID);
        if (index !== -1) {
          this.movies[index] = { ...updatedMovie };
        }
      },
      (err) => {
        this.error = err.message || 'An error occurred while updating the movie.';
      }
    );
  }
  

  deleteMovie(movieID: number): void {
    this.resetAlerts();
    this.movieService.delete(movieID).subscribe(
      () => {
        this.movies = this.movies.filter(movie => movie.movieID !== movieID);
        this.success = 'Movie deleted successfully!';
      },
      (err) => {
        this.error = 'Failed to delete movie: ' + err.message;
      }
    );
  }
}

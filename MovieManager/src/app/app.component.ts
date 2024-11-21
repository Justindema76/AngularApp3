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
  isEditing: boolean = false;
 

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
  // updateMovie(movieName: any, genre: any, rating: any, yearMade: any, movieID: any) {
  //   this.resetAlerts();

  //   this.movieService
  //     .update({
  //       movieName: movieName.value, genre: genre.value, rating: rating.value, yearMade: yearMade.value, movieID: +movieID})
  //     .subscribe(
  //       (res) => {
  //         this.success = 'Updated successfully';
  //       },
  //       (err) => (this.error = err)
  //     );
  // }
  // Edit movie
  editMovie(selectedMovie: Movie): void {
    this.resetAlerts();
    this.movie = { ...selectedMovie };
    this.isEditing = true;
  }
  deleteMovie(movieID: number) {
    this.resetAlerts();
    this.movieService.delete(movieID).subscribe(
      (res) => {
        this.movies = this.movies.filter(function (item) {
          return item['movieID'] && +item['movieID'] !== +movieID;
        });

        this.success = 'Deleted successfully';
      },
      (err) => (this.error = err)
    );
  }
  
  


}

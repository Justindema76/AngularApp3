import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from './movie.service';
import { Movie } from './movie';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

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
  selectedFile: File | null = null;
 
  
  genre: string[] = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Crime'
  ];

  constructor(private movieService: MovieService, private http: HttpClient) {}

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
  
    // Ensure the genre is a valid string (e.g., 'Unknown' if not selected)
    if (!this.movie.genre) {
      console.log('Genre was not selected, defaulting to "Unknown"');
      this.movie.genre = 'Unknown';  // Default to 'Unknown' if no genre is selected
    }
  
    // Log the movie object to the console before sending it
    console.log('Adding movie:', this.movie);
  
    // Proceed with adding the movie
    this.movieService.add(this.movie).subscribe(
      (res: Movie) => {
        console.log('Successfully added movie:', res);  // Log the response after movie is added
        this.movies.push(res);  // Update the movie list
        this.success = 'Movie successfully added';
        f.resetForm(); // Reset the form
      },
      (err: HttpErrorResponse) => {
        console.error('Add movie failed:', err);
        this.error = err.message || 'An error occurred while adding the movie.';
      }
    );
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; 
      console.log('Selected file:', this.selectedFile.name); 
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
        return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedFile);
 
    this.http.post('http://localhost/movieapi/upload', formData).subscribe(
        response => console.log('File uploaded successfully:', response),
        error => console.error('File upload failed:', error)
    );    
  }

  editMovie(movieName: any, genre: any, rating: any, yearMade: any, imageName: any, movieID: any) {
    this.resetAlerts();
 
    this.movieService.edit({movieName: movieName.value, genre: genre.value, rating: rating.value, yearMade: yearMade.value, imageName: imageName.value, movieID: +movieID})
    .subscribe(
      (res) => {        
        this.success = 'Successfully edited';        
      },
      (err) => (this.error = err.message)
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

# AngularApp3 Movie Manager App
AngularApp Assignment#3 - EDIT DELETE UPLOAD IMAGE

This is an Angular-based movie manager application that enables users to view, add, edit, and delete movies. The app integrates with a backend API (`MovieAPI`) connected to a `movie_manager` database for managing movie details. It includes client-side validation to ensure data integrity and provides responsive design for an optimal user experience across devices.


## Features

- **View Movies**: Display a list of movies with details such as image of the movie poster, name, genre, rating, and year made, dynamically retrieved from the backend API.
- **Add Movies**: A form to add new movies, including validation to ensure:
  - `rating` is a numeric value between 1 and 10.
  - Required fields are filled out before submission.
- **Edit Movies**: Populate movie details into an editable form, allowing updates with validation for `rating` and other required fields.
- **Delete Movies**: Remove movies from the list with immediate updates to both the frontend and backend.
- **Frontend Validation**: Includes client-side checks to prevent invalid or incomplete data submissions.
- **Backend Integration**: Communicates with a `MovieAPI` connected to the `movie_manager` database for seamless data synchronization.
- **Error and Success Handling**: Displays user-friendly feedback messages for successful operations or errors during adding, updating


## Technologies Used

- **Frontend**: Angular
- **Backend**: Node.js (with Express)
- **Database**: MySQL (`movie_manager` database)
- **API**: MovieAPI for CRUD operations on movies

## Setup and Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Justindema76/AngularApp3.git

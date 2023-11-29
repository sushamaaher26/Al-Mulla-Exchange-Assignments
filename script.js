const apiKey = '5aaf5745';


function searchMovies() {
    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`;
    const loader = document.getElementById('loader');

    // Show the loader while fetching data
    loader.style.display = 'block';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const noMovieFoundElement = document.getElementById('noMovieFound');

            if (data.Search) {
                displayMoviePosters(data.Search);
                // Clear the "No matching movies found" message if there were previous messages
                noMovieFoundElement.textContent = '';
            } else {
                console.error('No matching movies found');
                
                noMovieFoundElement.textContent = 'Sorry! No matching movies found';
            }

            // Hide the loader after fetching data
            loader.style.display = 'none';
        })
        .catch(error => {
            console.error('Error searching for movies:', error);

            // Hide the loader in case of an error
            loader.style.display = 'none';
        });
}

// Function to display movie posters
function displayMoviePosters(movies) {
    const movieContainer = document.getElementById('movieContainer');
    movieContainer.innerHTML = ''; // to clear previous posters if any 

    movies.forEach(movie => {
        const poster = document.createElement('img'); // createElement is used to create the elements dynamically
        poster.src = movie.Poster;
        poster.alt = movie.Title;
        poster.addEventListener('click', () => showMovieDetails(movie.imdbID));

        movieContainer.appendChild(poster);  // appendChild is used to create the child node to the parent node
    });
}


// Function to fetch and display movie details
function showMovieDetails(imdbID) {
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showMovieDetailsInNewPage(data);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

// Function to create a new page with movie details
function showMovieDetailsInNewPage(movie) {
    const newPage = window.open('', '_blank'); // Open a new blank page

    // Fetch the movie details template
    fetch('./movieDetails.html')
        .then(response => response.text())
        .then(template => {
            // Replace placeholders in the template with actual data
            const htmlContent = template
                .replace('{title}', movie.Title)
                .replace('{poster}', movie.Poster)
                .replace('{year}', movie.Year)
                .replace('{rating}', movie.imdbRating)
                .replace('{released}', movie.Released)
                .replace('{writer}', movie.Writer)
                .replace('{actors}', movie.Actors)
                .replace('{director}', movie.Director)
                .replace('{language}', movie.Language)
                .replace('{runtime}', movie.Runtime)
                .replace('{genre}', movie.Genre)
                .replace('{awards}', movie.Awards)
                .replace('{plot}', movie.Plot);

            // Write the HTML content to the new page
            newPage.document.write(htmlContent);
        })
        .catch(error => {
            console.error('Error fetching movie details template:', error);
        });
}


function goToHomePage(){
    window.location.href = "./index.html";
}

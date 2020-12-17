const moviesListElement = document.querySelector(".movies");
const searchbar = document.querySelector("form");

function getMovie(value  , attribute = 's') {
  return fetch(
    `https://omdbapi.com/?apikey=89e9df8f&${attribute}=${value}&plot=short`
  ).then((data) => data.json());
}

function createMoviePoster(currMovie) {
  if(currMovie.Poster === 'N/A') {
    currMovie.Poster = "https://m.media-amazon.com/images/M/MV5BYjU2ZGFiZjEtN2ZhOS00OTlmLTliOGMtOWM2NzQ2ZDI5M2U2XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg";
  };
  moviesListElement.insertAdjacentHTML(
    "beforeend",
    `<li> 
    <img src="${currMovie.Poster}" alt="poster of ${currMovie.Title}" >
    <div>
      <h2> ${currMovie.Title} </h2> 
      <p>${currMovie.Ratings[0].Value} </p>
      <p> ${currMovie.Plot}</p>      
    </div>
   </li>`
  );
}

function ShowMovies(movieName) {
  getMovie(movieName)
  .then((movies) => {
    const movieList = movies.Search;
    movieList.forEach((movie) => {
      getMovie( movie.Title, 't')
      .then((currMovie) => {
        createMoviePoster(currMovie);
     });
    });
  });
} 

ShowMovies('Batman');

searchbar.addEventListener('submit', (event) => {
  event.preventDefault()
  moviesListElement.innerHTML = "";
  const target = event.target;
  ShowMovies(target.firstElementChild.value)
  target.firstElementChild.value = "";
})
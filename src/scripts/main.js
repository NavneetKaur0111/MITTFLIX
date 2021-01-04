const moviesListElement = document.querySelector(".movies");
const searchbar = document.querySelector("form");
const nextPage = document.querySelector('#next');
const prevPage = document.querySelector('#previous');
let pageNumber = 1;
let movieName = 'batman';

function getMovie(value, attribute = 's') {
  return fetch(
    `https://omdbapi.com/?apikey=89e9df8f&${attribute}=${value}&plot=short`
  ).then((data) => data.json());
}

function getMovies(value, attribute = 's') {
  return fetch(
    `https://omdbapi.com/?apikey=89e9df8f&${attribute}=${value}&plot=short&page=${pageNumber}`
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

const displaynext = (movies) => {
  const totalPages = movies.totalResults / 10;

  if(pageNumber > 1) {
    prevPage.classList.remove('hidden');
  } else {
    prevPage.classList.add('hidden');
  }

  if(Math.ceil(totalPages) !== pageNumber) {
    nextPage.classList.remove('hidden');
  } else {
    nextPage.classList.add('hidden');
  }
}

function ShowMovies() {
  moviesListElement.innerHTML = "";
  getMovies(movieName)
  .then((movies) => {
    const movieList = movies.Search;
    displaynext(movies)
    movieList.forEach((movie) => {
      getMovie( movie.Title, 't')
      .then((currMovie) => {
        createMoviePoster(currMovie);
     });
    });
  });
} 

ShowMovies();

searchbar.addEventListener('submit', (event) => {
  event.preventDefault()
  const target = event.target;
  movieName = target.firstElementChild.value;
  pageNumber = 1; 
  ShowMovies()
  target.firstElementChild.value = "";
})

prevPage.addEventListener('click', (event) => {
  pageNumber--;
  ShowMovies();
})

nextPage.addEventListener('click', (event)=> {
  pageNumber++;
  ShowMovies();
})

document.querySelector('.page-number').addEventListener('click', (event) => {
  if(event.target.nodeName === "A") {
    pageNumber = event.target.dataset.number;
    ShowMovies();
  }
})
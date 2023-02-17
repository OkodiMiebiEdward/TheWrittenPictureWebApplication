const sampleMovies = document.querySelector('#services-sample-movies');
const movieQueryBtn = document.querySelector('.search-movie-button');


movieQueryBtn.addEventListener('click', () => {
    const moviesToRemove = sampleMovies.querySelectorAll('.remove-description');
    for (const movie of moviesToRemove) {
        movie.remove();
    }
    sampleMovies.classList.add('movies-container-redesign');
});


async function getAPIkeys() {
    // Api keys are secured in the Data folder, it will not be added in source control
    const response = await fetch("/Data/Keys.json");
    const data = await response.json();
    const arrayFromJson = Object.entries(data);
    const APIkeys = [arrayFromJson[0][1], arrayFromJson[1][1]];
    return APIkeys;
}

async function getMoviesFromQuery(query) {


    const apiKeys = await getAPIkeys();
    let omdbApiKey = apiKeys[1];
    const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&type=movie&s=${query}`);
    const data = await response.json();
    const movieData = data.Search;

    for (const movie of movieData) {
        const plot = await getMoviePlot(movie.imdbID);

        const html = `
    <div class="text-center">
    <img src=${movie.Poster} class="coverImage"></img>
    <h2>${movie.Title}</h2>
    <h4>${plot}</h4>
    </div>
    <br/>
    <br/>
    `;

        sampleMovies.innerHTML += html;
    }
}



window.onload = async function ()
{
    const apiKeys = await getAPIkeys();
    let omdbApiKey = apiKeys[1];
    const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&type=movie&s=Merlin`);
    const data = await response.json();
    const movieData = data.Search;

    for (const movie of movieData) {
          const plot = await getMoviePlot(movie.imdbID);

    const html = `
    <div class="text-center remove-description">
    <img src=${movie.Poster} class="coverImage"></img>
    <h2>${movie.Title}</h2>
    <h4>${plot}</h4>
    </div>
    `;

    sampleMovies.innerHTML += html;
    }
   
}

async function getMoviePlot(imdbID) {
    const apiKeys = await getAPIkeys();
    let omdbApiKey = apiKeys[1];
    const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${imdbID}&plot=full`);
    const movieData = await response.json();
    return movieData.Plot;
}
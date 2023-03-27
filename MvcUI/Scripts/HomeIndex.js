const googleBooks = document.querySelector('#books-section');
const OmdbMovies = document.querySelector('#movies-section');

window.onload = async function () {
    const APIkeys = await getAPIkeys();
    const googleBooksApiKey = APIkeys[0];
    const OmdbMovieApiKey = APIkeys[1];

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inpublisher:catapult&key=${googleBooksApiKey}`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    const books = data.items;
    //console.log(books);
    console.log("hello");
  
    
    const coverImageUrls = [];

    // Iterate through the list of books and get the cover image URL for each book
    for (var book of books) {
        console.log(book);
        const coverImageUrl = book.volumeInfo.imageLinks?.thumbnail;
        coverImageUrls.push(coverImageUrl);
    }
    
    coverImageUrls.splice(0, 6);
    const html = coverImageUrls.map(coverImage => {
       return `<div class="col-md-3 col-xs-3 col-sm-3"><img src=${coverImage} class="coverImage"></img></div>
        `
    }).join('');
    googleBooks.innerHTML = html;
    await getMoviesFromAPI(OmdbMovieApiKey);
}

 async function getMoviesFromAPI (omdbApiKey) {
   
    const response = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&type=movie&s=action`);
    const data = await response.json();
    const movies = data.Search;
    const shuffledArray = shuffleArray(movies);
    moviesToDisplay = [shuffledArray[1], shuffledArray[0], shuffledArray[8], shuffledArray[7]];
   
    const html = moviesToDisplay.map(movie => {
        return `<div class="col-md-3 col-xs-3 col-sm-3"><img src=${movie.Poster} class="coverImage"></img> <div class="text-center"> <h5>${movie.Title}</h5><h4>${movie.Year}</h4> </div> </div>`
        }).join('');
     OmdbMovies.innerHTML = html;
 }

async function getAPIkeys()
{
    // Api keys are secured in the Data folder, it will not be added in source control
    const response = await fetch("/Data/Keys.json");
    const data = await response.json();
    const arrayFromJson = Object.entries(data);

    const APIkeys = [arrayFromJson[0][1], arrayFromJson[1][1]];
    return APIkeys;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}




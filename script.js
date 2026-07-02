// ===============================
// MovieFlix Script
// Part 1
// ===============================

// Movie data
let movies = [];

// Current movie
let currentMovie = null;

// Category containers
const categories = {
    Trending: document.getElementById("trending"),
    Action: document.getElementById("action"),
    Comedy: document.getElementById("comedy"),
    Horror: document.getElementById("horror"),
    Animation: document.getElementById("animation")
};

// ===============================
// Load Movies
// ===============================

fetch("movies.json")
.then(response => response.json())
.then(data => {

    movies = data;

    loadMovies(movies);

})
.catch(error => {

    console.log("Cannot load movies.json");

    console.error(error);

});

// ===============================
// Create Movie Cards
// ===============================

function loadMovies(movieList){

    // Clear old cards

    for(let key in categories){

        categories[key].innerHTML = "";

    }

    movieList.forEach(movie=>{

        createMovieCard(movie);

    });

}

// ===============================
// Create Card
// ===============================

function createMovieCard(movie){

    let card = document.createElement("div");

    card.className = "movie";

    card.innerHTML = `

        <img src="${movie.poster}" alt="${movie.title}">

        <div class="movie-content">

            <h3>${movie.title}</h3>

            <p>${movie.year}</p>

        </div>

    `;

    card.onclick = function(){

        playMovie(movie);

    };

    if(categories[movie.category]){

        categories[movie.category].appendChild(card);

    }

}

// ===============================
// Play Movie
// ===============================

function playMovie(movie){

    currentMovie = movie;

    document.getElementById("playerContainer").style.display = "flex";

    document.getElementById("moviePlayer").src =
        "https://drive.google.com/file/d/" +
        movie.driveID +
        "/preview";

}

// ===============================
// Close Player
// ===============================

document.getElementById("closePlayer").onclick = function(){

    document.getElementById("playerContainer").style.display = "none";

    document.getElementById("moviePlayer").src = "";

};

// ===============================
// Search
// ===============================

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function(){

    let keyword = searchBox.value.toLowerCase();

    let filtered = movies.filter(movie =>

        movie.title.toLowerCase().includes(keyword) ||

        movie.genre.toLowerCase().includes(keyword)

    );

    loadMovies(filtered);

});

// ===============================
// Search Button
// ===============================

document.getElementById("searchBtn").onclick = function(){

    searchBox.focus();

};

// ===============================
// Escape Key
// ===============================

document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        document.getElementById("playerContainer").style.display = "none";

        document.getElementById("moviePlayer").src = "";

    }

});

// ===============================
// Prevent Background Scroll
// ===============================

document.getElementById("playerContainer").addEventListener("wheel", function(e){

    e.stopPropagation();

});

// ===============================
// Console
// ===============================

console.log("MovieFlix Part 1 Loaded");

// ======================================
// MovieFlix Script
// Part 2
// ======================================

// Elements
const featuredTitle = document.getElementById("featuredTitle");
const featuredDescription = document.getElementById("featuredDescription");

const watchNowBtn = document.getElementById("watchNow");
const infoBtn = document.getElementById("infoBtn");

const movieInfo = document.getElementById("movieInfo");

const infoPoster = document.getElementById("infoPoster");
const infoTitle = document.getElementById("infoTitle");
const infoYear = document.getElementById("infoYear");
const infoGenre = document.getElementById("infoGenre");
const infoDescription = document.getElementById("infoDescription");

const playMovieBtn = document.getElementById("playMovie");

const closeInfo = document.getElementById("closeInfo");

// ======================================
// Featured Movie
// ======================================

function setFeaturedMovie(){

    if(movies.length === 0) return;

    const random =
        movies[Math.floor(Math.random() * movies.length)];

    currentMovie = random;

    featuredTitle.textContent = random.title;

    featuredDescription.textContent =
        random.description || "No description available.";

    document.querySelector(".hero").style.backgroundImage =
        `url(${random.banner || random.poster})`;

}

// Wait until movies are loaded
setTimeout(setFeaturedMovie,700);

// ======================================
// Watch Featured Movie
// ======================================

watchNowBtn.onclick = function(){

    if(currentMovie){

        playMovie(currentMovie);

    }

};

// ======================================
// Show Information
// ======================================

function showMovieInfo(movie){

    currentMovie = movie;

    infoPoster.src = movie.poster;

    infoTitle.textContent = movie.title;

    infoYear.textContent =
        "Year : " + movie.year;

    infoGenre.textContent =
        "Genre : " + movie.genre;

    infoDescription.textContent =
        movie.description || "No description.";

    movieInfo.style.display = "flex";

}

// Hero button
infoBtn.onclick = function(){

    if(currentMovie){

        showMovieInfo(currentMovie);

    }

};

// ======================================
// Play from Popup
// ======================================

playMovieBtn.onclick = function(){

    movieInfo.style.display = "none";

    playMovie(currentMovie);

};

// ======================================
// Close Popup
// ======================================

closeInfo.onclick = function(){

    movieInfo.style.display = "none";

};

// ======================================
// Close Popup if clicking background
// ======================================

movieInfo.addEventListener("click",function(e){

    if(e.target === movieInfo){

        movieInfo.style.display = "none";

    }

});

// ======================================
// Escape Key
// ======================================

document.addEventListener("keydown",function(e){

    if(e.key === "Escape"){

        movieInfo.style.display = "none";

        document.getElementById("playerContainer").style.display="none";

        document.getElementById("moviePlayer").src="";

    }

});

// ======================================
// Override Card Click
// ======================================

// Replace createMovieCard() in Part 1 with this version
// if you want clicking a movie to open the info popup
// instead of immediately playing it.

/*

function createMovieCard(movie){

    let card=document.createElement("div");

    card.className="movie";

    card.innerHTML=`
        <img src="${movie.poster}">
        <div class="movie-content">
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
        </div>
    `;

    card.onclick=function(){

        showMovieInfo(movie);

    };

    if(categories[movie.category]){

        categories[movie.category].appendChild(card);

    }

}

*/

// ======================================

console.log("MovieFlix Part 2 Loaded");
let likedMovies = [];
let dislikedMovies = [];
let currentMovie = null;

async function search(movieTitle) {
    var moviename = movieTitle || document.getElementById("filmname").value.trim();
    if (moviename === "") {
        alert("Bitte einen Filmtitel eingeben");
        return;
    }

    const response = await fetch(`https://www.omdbapi.com/?apikey=4ac13c8f&t=${encodeURIComponent(moviename)}`);
    
    if (!response.ok) {
        alert("Film wurde nicht gefunden");
        return;
    }

    const data = await response.json();
    currentMovie = new Movie(data);
    
    openModal(currentMovie);
}

function like() {
    if (!isDuplicateMovie(currentMovie, likedMovies)) {
        addToFavoritesTable(currentMovie);
        likedMovies.push(currentMovie);
    } else {
        alert("Dieser Film ist bereits in Ihrer 'Mag ich' Liste.");
    }
    closeModal();
}

function dislike() {
    if (!isDuplicateMovie(currentMovie, dislikedMovies)) {
        addToDislikesTable(currentMovie);
        dislikedMovies.push(currentMovie);
    } else {
        alert("Dieser Film ist bereits in Ihrer 'Mag ich nicht' Liste.");
    }
    closeModal();
}

function unknown() {
    closeModal();
}

function openModal(movie) {
    document.getElementById('movieTitle').innerText = movie.title;

    let movieInfo = '<ul>';
    for (let key in movie) {
        if (movie.hasOwnProperty(key) && key !== 'title' && movie[key] !== 'N/A' && key !== 'poster') {
            movieInfo += `<li><strong>${key}:</strong> ${movie[key]}</li>`;
        }
    }
    movieInfo += '</ul>';
    document.getElementById('movieInfo').innerHTML = movieInfo;

    var posterContainer = document.getElementById('posterContainer');
    posterContainer.innerHTML = '';

    if (movie.poster !== 'N/A') {
        let posterImg = document.createElement('img');
        posterImg.src = movie.poster;
        posterImg.alt = `Poster von ${movie.title}`;
        posterImg.classList.add('modal-poster');
        posterImg.style.maxWidth = '150px'; // Beispiel: Maximale Breite des Bildes
        posterImg.style.maxHeight = '150px'; // Beispiel: Maximale Höhe des Bildes
        posterContainer.appendChild(posterImg);
    } else {
        let errorMessage = document.createElement('p');
        errorMessage.innerText = 'Poster nicht verfügbar';
        posterContainer.appendChild(errorMessage);
    }

    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function addToFavoritesTable(movie) {
    var tableBody = document.getElementById('goodMoviesTableBody');
    var newRow = tableBody.insertRow();
    newRow.innerHTML = `<td>${movie.title}</td><td>${movie.year}</td><td>${movie.genre}</td><td>${movie.director}</td><td>${movie.actors}</td><td><button onclick="removeFromTable(this, 'like')">X</button></td>`;
}

function addToDislikesTable(movie) {
    var tableBody = document.getElementById('badMoviesTableBody');
    var newRow = tableBody.insertRow();
    newRow.innerHTML = `<td>${movie.title}</td><td>${movie.year}</td><td>${movie.genre}</td><td>${movie.director}</td><td>${movie.actors}</td><td><button onclick="removeFromTable(this, 'dislike')">X</button></td>`;
}

function removeFromTable(button, type) {
    var row = button.parentNode.parentNode;
    var title = row.cells[0].innerText;

    if (type === 'like') {
        likedMovies = likedMovies.filter(movie => movie.title !== title);
    } else if (type === 'dislike') {
        dislikedMovies = dislikedMovies.filter(movie => movie.title !== title);
    }

    row.parentNode.removeChild(row);
}

function isDuplicateMovie(movie, list) {
    return list.some(m => m.title === movie.title);
}

class Movie {
    constructor(data) {
        this.title = data.Title;
        this.year = data.Year;
        this.genre = data.Genre;
        this.director = data.Director;
        this.actors = data.Actors;
        this.poster = data.Poster;
        this.plot = data.Plot;
        this.rated = data.Rated;
        this.runtime = data.Runtime;
    }
}

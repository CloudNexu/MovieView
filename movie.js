class Movie {
    constructor(data) {
        this.title = data.Title || "Unbekannt";
        this.year = data.Year || "Unbekannt";
        this.rated = data.Rated || "Unbekannt";
        this.released = data.Released || "Unbekannt";
        this.runtime = data.Runtime || "Unbekannt";
        this.genre = data.Genre || "Unbekannt";
        this.director = data.Director || "Unbekannt";
        this.writer = data.Writer || "Unbekannt";
        this.actors = data.Actors || "Unbekannt";
        this.plot = data.Plot || "Unbekannt";
        this.language = data.Language || "Unbekannt";
        this.country = data.Country || "Unbekannt";
        this.awards = data.Awards || "Unbekannt";
        this.poster = data.Poster || "Unbekannt";
    }
}
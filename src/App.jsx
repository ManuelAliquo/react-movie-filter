import { useEffect, useState } from "react";
import initialMovies from "./assets/data/movies.js";
import MovieCard from "./components/MovieCard.jsx";

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);

  // stati per i filtri
  const [filterTitle, setFilterTitle] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  // stati per l'aggiunta
  const [newTitle, setNewTitle] = useState("");
  const [newGenre, setNewGenre] = useState("");

  // handle submit
  const handleSubmit = (e) => e.preventDefault();

  // aggiunzione di un film
  const handleSubmitMovieAdd = (e) => {
    e.preventDefault();
    // creazione nuovo oggetto movie
    const newMovie = {
      title: newTitle,
      genre: newGenre,
    };

    // inserimento oggetto in array
    setMovies([...movies, newMovie]);
    setNewTitle("");
    setNewGenre("");
  };

  // filtro di ricerca
  useEffect(() => {
    let filteredResults = movies;

    // filtro per titolo se filterTitle non è vuoto
    if (filterTitle) {
      filteredResults = filteredResults.filter((movie) =>
        movie.title.toLowerCase().includes(filterTitle.toLowerCase()),
      );
    }

    // filtro per genere se filterGenre non è vuoto
    if (filterGenre) {
      filteredResults = filteredResults.filter((movie) => movie.genre === filterGenre);
    }

    // aggiornamento stato
    setFilteredMovies(filteredResults);
  }, [movies, filterTitle, filterGenre]);

  // salvo tutti i generi presenti nell'array movies
  const genres = [];
  movies.forEach((movie) => {
    if (!genres.includes(movie.genre)) genres.push(movie.genre);
  });

  // input handle
  const handleTitleSearch = (e) => setFilterTitle(e.target.value);
  const handleTitleAdd = (e) => setNewTitle(e.target.value);
  const handleGenreAdd = (e) => setNewGenre(e.target.value);
  // select handle
  const handleSelect = (e) => setFilterGenre(e.target.value);

  return (
    <>
      <header className="text-center pt-4 pb-3 bg-light">
        <h1>Scegli il tuo Film</h1>
      </header>
      <div className="container d-flex flex-column align-items-center mb-5">
        {/* Movie list */}
        <section>
          <div className="sect-heading-container">
            <h2 className="h3">Films</h2>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-2">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </section>

        {/* Movie search */}
        <section>
          <div className="sect-heading-container">
            <h3 className="h5">Cerca un Film</h3>
          </div>
          <form onSubmit={handleSubmit} className="pb-5">
            <label className="form-label mb-1" htmlFor="title-search">
              Cerca il Titolo del Film
            </label>
            <div className="input-group mb-2">
              <input
                value={filterTitle}
                onChange={handleTitleSearch}
                type="text"
                className="form-control"
                id="title-search"
              />
              <button className="btn btn-outline-success">Cerca</button>
            </div>
            <label className="mb-1" htmlFor="genre-select">
              Genere
            </label>
            <select onChange={handleSelect} className="form-select" id="genre-select">
              <option value="">Tutti i Generi</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </form>
        </section>

        {/* Movie add */}
        <section>
          <div className="sect-heading-container">
            <h3 className="h5">Aggiungi un Film</h3>
          </div>
          <form onSubmit={handleSubmitMovieAdd}>
            <label className="form-label mb-1" htmlFor="title-add">
              Titolo del Film:
            </label>
            <input
              value={newTitle}
              onChange={handleTitleAdd}
              placeholder="Es. Il Signore Degli Anelli"
              className="form-control mb-2"
              type="text"
              id="title-add"
              required
            />
            <label className="form-label mb-1" htmlFor="genre-add">
              Genere del Film:
            </label>
            <input
              value={newGenre}
              onChange={handleGenreAdd}
              placeholder="Es. Fantasy"
              className="form-control"
              type="text"
              id="genre-add"
              required
            />
            <div className="text-end">
              <button className="btn btn-success me-2 mt-3">Aggiungi</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

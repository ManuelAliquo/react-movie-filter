import { useEffect, useState } from "react";
import initialMovies from "./assets/data/movies.js";

export default function App() {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newGenre, setNewGenre] = useState("");

  const [movies, setMovies] = useState(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);

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

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

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

  // vedo se l'oggetto movie contiene l'elemento title cercato nell'input
  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) => movie.title.toLowerCase().includes(filterTitle.toLowerCase())),
    );
  }, [filterTitle]);

  // vedo se l'oggetto movie contiene l'elemento genre selezionato nella select
  useEffect(() => {
    setFilteredMovies(movies.filter((movie) => movie.genre.includes(filterGenre)));
  }, [filterGenre]);

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
          <ul className="d-flex list-group w-75">
            {filteredMovies.map((movie, index) => (
              <li className="list-group-item" key={index}>
                {movie.title}
              </li>
            ))}
          </ul>
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
              <option value="">Seleziona:</option>
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
              className="form-control mb-2"
              type="text"
              id="title-add"
            />
            <label className="form-label mb-1" htmlFor="genre-add">
              Genere del Film:
            </label>
            <input
              value={newGenre}
              onChange={handleGenreAdd}
              className="form-control"
              type="text"
              id="genre-add"
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

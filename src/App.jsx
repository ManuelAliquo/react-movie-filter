import { useEffect, useState } from "react";
import movies from "./assets/data/movies.js";

// salvo tutti i generi presenti nell'array movies
const genres = [];
movies.forEach((movie) => {
  if (!genres.includes(movie.genre)) genres.push(movie.genre);
});

export default function App() {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  // handle submit
  const handleSubmit = (e) => e.preventDefault();
  // input change
  const handleInput = (e) => setFilterTitle(e.target.value);
  // select change
  const handleSelect = (e) => setFilterGenre(e.target.value);

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
      <h1 className="text-center mt-4">Scegli il tuo Film</h1>
      <div className="container d-flex flex-column align-items-center">
        <div className="w-75 test-start mt-5">
          <h4 className="ms-2">Films</h4>
        </div>
        <ul className="d-flex list-group mb-5 w-75">
          {filteredMovies.map((movie, index) => (
            <li className="list-group-item" key={index}>
              {movie.title}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="w-75">
          <label className="form-label mb-1" htmlFor="title">
            Cerca il Titolo del film
          </label>
          <div className="input-group mb-2">
            <input
              value={filterTitle}
              onChange={handleInput}
              type="text"
              className="form-control"
              id="title"
            />
            <button className="btn btn-outline-success">Cerca</button>
          </div>

          <label className="mb-1 " htmlFor="genre">
            Genere
          </label>
          <select onChange={handleSelect} className="form-select" id="genre">
            <option value="">Seleziona:</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
}

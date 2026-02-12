import { useState } from "react";
import movies from "./assets/data/movies.js";

// salvo tutti i generi presenti nell'array movies
const genres = [];
movies.forEach((movie) => {
  if (!genres.includes(movie.genre)) genres.push(movie.genre);
});

export default function App() {
  const [selectGenre, setSelectGenre] = useState("");

  // select change
  const handleSelect = (e) => setSelectGenre(e.target.value);

  return (
    <>
      <h1 className="text-center mt-4">Scegli il tuo Film</h1>
      <div className="container d-flex flex-column align-items-center">
        <ul className="d-flex list-group my-5 w-75">
          {movies.map((movie, index) => (
            <li className="list-group-item" key={index}>
              {movie.title}
            </li>
          ))}
        </ul>

        <form className="w-75">
          <label htmlFor="genre">Genere</label>
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

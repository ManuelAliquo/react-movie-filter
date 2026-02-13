export default function MovieCard({ movie }) {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="movie-title">{movie.title}</h5>
          <div className="movie-genre">{movie.genre}</div>
        </div>
      </div>
    </div>
  );
}

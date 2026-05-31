import { useAppSelector } from '../app/hooks';
import { MovieCard } from '../components/MovieCard';

export const Favorites = () => {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <div className="page-container">
      <h2>Мое избранное</h2>
      {favorites.length === 0 ? (
        <p>Вы пока ничего не добавили в избранное.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

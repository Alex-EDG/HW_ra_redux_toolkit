import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchMovieDetails } from '../features/movies/moviesSlice';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Heart } from 'lucide-react';
import './MovieDetails.css';

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { movieDetails: movie, detailsLoading, detailsError } = useAppSelector(state => state.movies);
  const favorites = useAppSelector(state => state.favorites.items);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    };
  }, [ id, dispatch ]);

  if (detailsLoading) return <div className="loader page-container">Загрузка деталей...</div>;
  if (detailsError) return <div className="error page-container">{detailsError}</div>;
  if (!movie) return null;

  const isFavorite = favorites.some((f) => f.imdbID === movie.imdbID);

  const handleToggleFav = () => {
    dispatch(toggleFavorite({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Type: movie.Type,
      Poster: movie.Poster
    }));
  };

  return (
    <div className="page-container details-page">
      <div className="details-header">
        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'} alt={movie.Title} />
        <div className="info">
          <h1>{movie.Title} ({movie.Year})</h1>
          <button className={`btn-fav ${isFavorite ? 'active' : ''}`} onClick={handleToggleFav}>
            <Heart fill={isFavorite ? '#ff4757' : 'transparent'} />
            {isFavorite ? 'В избранном' : 'В избранное'}
          </button>
          
          <div className="meta">
            <p><strong>Жанр:</strong> {movie.Genre}</p>
            <p><strong>Продолжительность:</strong> {movie.Runtime}</p>
            <p><strong>Режиссер:</strong> {movie.Director}</p>
            <p><strong>Актеры:</strong> {movie.Actors}</p>
            <p><strong>IMDb Рейтинг:</strong> ⭐ {movie.imdbRating}</p>
            <p><strong>Награды:</strong> {movie.Awards}</p>
          </div>
          
          <div className="plot">
            <h3>Сюжет:</h3>
            <p>{movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
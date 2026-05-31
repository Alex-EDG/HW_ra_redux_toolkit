import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import type { MovieSearchResult } from '../types';
import './MovieCard.css';

export const MovieCard = ({ movie }: { movie: MovieSearchResult }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((f) => f.imdbID === movie.imdbID);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Чтобы не переходить по ссылке
    dispatch(toggleFavorite(movie));
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <div className="poster-container">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
          alt={movie.Title} 
        />
        <button className="fav-btn" onClick={handleToggle}>
          <Heart fill={isFavorite ? '#ff4757' : 'transparent'} color={isFavorite ? '#ff4757' : 'white'} />
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year} • {movie.Type}</p>
      </div>
    </Link>
  );
};

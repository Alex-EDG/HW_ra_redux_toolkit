import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { searchMovies } from '../features/movies/moviesSlice';
import { MovieCard } from '../components/MovieCard';
import { Search } from 'lucide-react';
import './Home.css';

export const Home = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const { searchResults, loading, error } = useAppSelector((state) => state.movies);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Найти фильм (на английском)..."
        />
        <button type="submit"><Search size={20}/></button>
      </form>

      {loading && <div className="loader">Загрузка...</div>}
      {error && <div className="error">{error}</div>}

      <div className="movies-grid">
        {!loading && searchResults.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

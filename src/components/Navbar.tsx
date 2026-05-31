import { Link } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import './Navbar.css';

export const Navbar = () => {
  const favCount = useAppSelector(state => state.favorites.items.length);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Film /> MovieSearch
      </Link>
      <Link to="/favorites" className="nav-fav">
        <Heart /> Избранное {favCount > 0 && <span className="badge">{favCount}</span>}
      </Link>
    </nav>
  );
};

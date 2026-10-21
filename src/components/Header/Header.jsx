import './Header.css';
import { NavLink } from 'react-router-dom';

export default function Header({ onLogout }) {

  return (
    <header>
      <img 
        src="./public/logo.png"
        alt="Logo Sportsee"/>
        <nav>
          <div className="nav-bar">
          <NavLink NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink NavLink to="/profile" className="nav-link">Mon profil</NavLink>
          </div>
          <NavLink NavLink to="/" className="nav-link logout" onClick={onLogout}>Se déconnecter</NavLink>
        </nav>
    </header>
  );
};
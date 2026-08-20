import React from 'react';
import { Link, NavLink } from 'react-router';
import './header.scss';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Interview Reports', path: '/interview-reports' },
  { name: 'logout', path: '/logout' },
  {name: 'Generate Resume', path: "/generate-resume"}
];

const Header = () => {

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="GenPrep home">
          <span className="brand__mark">G</span>
          <span className="brand__text">GenPrep</span>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link--active' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

      </nav>
    </header>
  );
};

export default Header;

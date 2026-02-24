import { Link, NavLink } from 'react-router-dom';
import Icon from './icon';

const Header = () => {
  const navLinks = [
    { name: 'Home', path: '/', navOrder: 1 },
    { name: 'About', path: '/about', navOrder: 2 }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <Icon name="CheckSquare" className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
              TaskFlow
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.sort((a, b) => a.navOrder - b.navOrder).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-black font-medium text-sm uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100 border-b-2 border-black pb-1' : 'opacity-60 hover:opacity-100'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black font-medium text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            <Icon name="Github" className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

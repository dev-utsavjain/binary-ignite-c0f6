import { Link } from 'react-router-dom';
import Icon from './icon';

const AboutFooter = () => {
  return (
    <footer className="bg-white border-t-2 border-black mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <Icon name="CheckSquare" className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
              TaskFlow
            </span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-black text-sm uppercase tracking-widest hover:opacity-60 transition-opacity duration-300">
              Home
            </Link>
            <Link to="/about" className="text-black text-sm uppercase tracking-widest hover:opacity-60 transition-opacity duration-300">
              About
            </Link>
          </nav>
          
          <p className="text-black text-sm uppercase tracking-widest">
            © 2024 TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AboutFooter;

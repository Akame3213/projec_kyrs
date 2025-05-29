import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Briefcase, Search, Heart, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-blue-600">РаботаПоиск</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Главная
          </Link>
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">
            Вакансии
          </Link>
          <Link to="/add-job" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
            <PlusCircle className="h-5 w-5 mr-1" />
            Разместить вакансию
          </Link>
          {isAuthenticated ? (
            <>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  <User className="h-5 w-5 mr-1" />
                  Личный кабинет
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    Мой профиль
                  </Link>
                  <Link 
                    to="/resume" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    Моё резюме
                  </Link>
                  <Link 
                    to="/saved-jobs" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    Сохранённые вакансии
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Войти
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Регистрация
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/jobs" 
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Вакансии
            </Link>
            <Link 
              to="/add-job" 
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Разместить вакансию
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Мой профиль
                </Link>
                <Link 
                  to="/resume" 
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Моё резюме
                </Link>
                <Link 
                  to="/saved-jobs" 
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Сохранённые вакансии
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Войти
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { translations } from './translation';
import MenuIcon from '../Image/svg/menu.svg';
import CloseIcon from '../Image/svg/close.svg';
import Heart from '../Image/svg/heart.svg';
import Account from '../Image/svg/account.svg';
import { LanguageContext } from './Pages/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { language, changeLanguage } = useContext(LanguageContext);
  const t = translations[language] || translations['ru'] || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <>
      {/* Затемнение фона при открытом меню */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Выдвигающееся меню */}
      <div 
        className={`fixed top-0 left-0 h-full w-full bg-black text-white z-50 transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full flex flex-col p-4 md:p-8 mx-auto relative">
          {/* Верхняя панель с кнопкой закрытия и иконками */}
          <div className="flex justify-between items-center pt-5">
            <button 
              onClick={toggleMenu} 
              className="p-1 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Закрыть меню"
            >
              <img src={CloseIcon} alt="Закрыть меню" className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <div className="lg:hidden flex items-center space-x-4">
              <button 
                className="p-1 hover:opacity-80 transition-opacity"
                onClick={() => {
                  const token = localStorage.getItem('token');
                  const isAuthenticated = token && token !== 'undefined' && token !== 'null';
                  navigate(isAuthenticated ? '/profile' : '/login');

                }}
              >
                <img src={Account} alt="Аккаунт" className="w-5 h-5" />
              </button>
              <button 
                className="p-1 hover:opacity-80 transition-opacity"
                onClick={() => {
                  const isAuthenticated = localStorage.getItem('token') || false;
                  navigate(isAuthenticated ? '/likecourses' : '/login');
                }}
              >
                <img src={Heart} alt="Избранное" className="w-5 h-5" />
              </button>
              
              {/* Переключатель языков для мобильного меню */}
              <div className="relative">
                <button 
                  onClick={toggleLanguageDropdown}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-200 border border-gray-200"
                >
                  <span className="text-sm font-bebas uppercase">{language}</span>
                  <svg 
                    className={`w-4 h-4 transform transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
  
                {isLanguageDropdownOpen && (
  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl overflow-hidden z-10 animate-fadeIn border border-gray-200">
    {/* English */}
    <button 
      onClick={() => {
        handleLanguageChange('en');
        changeLanguage('en');
      }}
      className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 flex items-center 
        ${language === 'en' ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-100 hover:text-black'}`}
    >
      <span className="w-6 text-center">🇺🇸</span>
      <span className="ml-2">English</span>
      {language === 'en' && (
        <svg className="w-4 h-4 ml-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
    <button 
      onClick={() => {
        handleLanguageChange('ru');
        changeLanguage('ru');
      }}
      className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 flex items-center 
        ${language === 'ru' ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-100 hover:text-black'}`}
    >
      <span className="w-6 text-center">🇷🇺</span>
      <span className="ml-2">Русский</span>
      {language === 'ru' && (
        <svg className="w-4 h-4 ml-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
    <button 
      onClick={() => {
        handleLanguageChange('de');
        changeLanguage('de');
      }}
      className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 flex items-center 
        ${language === 'de' ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-100 hover:text-black'}`}
    >
      <span className="w-6 text-center">🇩🇪</span>
      <span className="ml-2">Deutsch</span>
      {language === 'de' && (
        <svg className="w-4 h-4 ml-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Основное содержимое меню */}
          <div className="flex-grow flex flex-col items-start pt-8">
            {/* Секция 1 - ОБУЧЕНИЕ И РАЗВИТИЕ */}
            <div className="w-full pb-6 mb-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bebas mb-6 text-neutal-blue">
                {t.menu_section_one}
              </h2>
              <div className="space-y-3 flex flex-col md:space-y-4">
                <Link to="/courses" className="text-xl sm:text-2xl md:text-3xl font-bebas uppercase hover:text-gray-300 cursor-pointer transition-colors duration-200">
                  {t.menu_section_one_link_one}
                </Link>
                <Link to="/acticles" className="text-xl sm:text-2xl md:text-3xl font-bebas uppercase hover:text-gray-300 cursor-pointer transition-colors duration-200">
                  {t.menu_section_one_link_two}
                </Link>
                <Link to="/useful" className="text-xl sm:text-2xl md:text-3xl font-bebas uppercase hover:text-gray-300 cursor-pointer transition-colors duration-200">
                  {t.menu_section_one_link_three}
                </Link>
              </div>
            </div>
            
            {/* Разделитель */}
            <div className="w-full h-px bg-white my-4 md:my-6"></div>
            
            {/* Секция 2 - КАРЬЕРА И ПРОЕКТЫ */}
            <div className="w-full pb-6 mb-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bebas mb-6 text-neutal-blue">
                {t.menu_section_two}
              </h2>
              <div className="space-y-3  flex flex-col md:space-y-4">
                <Link to="/vacancies" className="text-xl sm:text-2xl md:text-3xl font-bebas uppercase hover:text-gray-300 cursor-pointer transition-colors duration-200">
                {t.menu_section_two_link_one}
                </Link>
                <Link to="/case-project" className="text-xl sm:text-2xl md:text-3xl font-bebas uppercase hover:text-gray-300 cursor-pointer transition-colors duration-200">
                {t.menu_section_two_link_two}
                </Link>
              </div>
            </div>
            
            {/* Разделитель */}
            <div className="w-full h-px bg-white my-4 md:my-6"></div>
            
            {/* Секция 3 - СОЦСЕТИ */}
            <div className="w-full">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bebas mb-6 text-neutal-blue">
                {t.footer_section_three}
              </h2>
              <div className="space-y-3  flex flex-col md:space-y-4">
                <a href='https://vk.com/club228572416?from=groups' className="text-xl sm:text-2xl md:text-3xl font-bebas uppercase hover:text-gray-300 cursor-pointer transition-colors duration-200">
                  {t.footer_section_three_link_one}
                </a>
                <a href='https://web.telegram.org/k/#-2367128985' className="text-xl sm:text-2xl md:text-3xl font-bebas uppercase hover:text-gray-300 cursor-pointer transition-colors duration-200">
                  {t.footer_section_three_link_two}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className='flex justify-between items-center max-h-[66px] px-[10px] py-[30px]s lg:px-5 lg:py-[30px] relative z-30'>
        <div className="order-3 lg:order-2">
          <button 
            onClick={toggleMenu} 
            className="p-2 focus:outline-none hover:bg-black hover:bg-opacity-10 rounded-full transition-colors duration-200"
            aria-label="Открыть меню"
          >
            <img src={MenuIcon} alt="Меню" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16" />
          </button>
        </div>

        <div className="order-1 lg:order-2">
          <button onClick={()=>navigate('/')} className='text-4xl sm:text-5xl lg:text-6xl font-bebas text-neutal-white'>Sakura flow</button>
        </div>
      
        <div className="hidden order-3 items-center lg:flex">
          <div className="flex space-x-[38px] items-center">
            <button  
              className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors duration-200"
              onClick={() => {
                    const token = localStorage.getItem('token');
                    const isAuthenticated = token && token !== 'undefined' && token !== 'null';
                    navigate(isAuthenticated ? '/profile' : '/login');

              }} 
            >
              <img src={Account} alt="Аккаунт" className="w-7 h-7" />
            </button>
            <button 
              onClick={() => {
                const token = localStorage.getItem('token');
                const isAuthenticated = token && token !== 'undefined' && token !== 'null';
                navigate(isAuthenticated ? '/profile' : '/login');

              }} 
              className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors duration-200"
            >
              <img src={Heart} alt="Избранное" className="w-7 h-7" />
            </button>
            
            {/* Стилизованный переключатель языков для десктопа */}
            <div className="relative">
              <button 
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-200 border border-gray-200"
              >
                <span className="text-sm font-bebas uppercase">{language}</span>
                <svg 
                  className={`w-4 h-4 transform transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
  
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl overflow-hidden z-10 animate-fadeIn border border-gray-200">
                  <button 
                    onClick={() => handleLanguageChange('en')}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 flex items-center 
                      ${language === 'en' 
                        ? 'bg-black text-white' 
                        : 'text-gray-800 hover:bg-gray-100 hover:text-black'}`}
                  >
                    <span className="w-6 text-center">🇺🇸</span>
                    <span className="ml-2">English</span>
                    {language === 'en' && (
                      <svg className="w-4 h-4 ml-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('ru')}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 flex items-center 
                      ${language === 'ru' 
                        ? 'bg-black text-white' 
                        : 'text-gray-800 hover:bg-gray-100 hover:text-black'}`}
                  >
                    <span className="w-6 text-center">🇷🇺</span>
                    <span className="ml-2">Русский</span>
                    {language === 'ru' && (
                      <svg className="w-4 h-4 ml-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('de')}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 flex items-center 
                      ${language === 'de' 
                        ? 'bg-black text-white' 
                        : 'text-gray-800 hover:bg-gray-100 hover:text-black'}`}
                  >
                    <span className="w-6 text-center">🇨🇳</span>
                    <span className="ml-2">Deutch</span>
                    {language === 'de' && (
                      <svg className="w-4 h-4 ml-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
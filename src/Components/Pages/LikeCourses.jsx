import React, {useEffect,  useState } from 'react';
import HeaderBlack from '../HeaderBlack';
import { translations } from '../translation';
import { useNavigate } from 'react-router-dom';
import {  useContext } from 'react';
import { LanguageContext } from './LanguageContext'; // Импортируем контекст
import dollar from '../../Image/svg/dollar.svg'
import heart_red from '../../Image/svg/heart_red.svg';
import Footer from '../Footer';
import LogoutModal from '../LogoutModal';

const LikeCourses = () => {
  const { language } = useContext(LanguageContext); // Получаем язык из контекста

  const t = translations[language];
  const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
    localStorage.removeItem('token');
    setShowLogoutModal(false);
    navigate('/login');
  };

  // Состояния для избранного
  const [favorites, setFavorites] = useState([]);

  // Загрузка избранного при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

    //удаления из избранного
    const removeFromFavorites = (courseId) => {
    const newFavorites = favorites.filter(id => id !== courseId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
};

  // Данные курсов (пример)
  const allCourses = {
    ux: { 
      id: 'ux',
      title: "UX/UI ДИЗАЙНЕР : С НУЛЯ ДО MIDDLE+", 
      image: require('../../Image/webp/ux.webp'), 
      isPaid: true,
      priceIcon: require('../../Image/svg/dollar.svg'),
      buttonText: "Подробнее",
      path: '/ux-course' // Добавляем путь
    },
    figma: { 
      id: 'figma',
      title: "Figma free", 
      image: require('../../Image/webp/figma.webp'), 
      isPaid: false,
      buttonText: "Подробнее",
      path: '/figma-course' // Добавляем путь
    },
    ae: { 
      id: 'ae',
      title: "After Effects free", 
      image: require('../../Image/webp/ae.webp'), 
      isPaid: false,
      buttonText: "Подробнее",
      path: '/ae-course' // Добавляем путь
    }
  };

    //Анимации секций
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, { threshold: 1 });
    
      const items = document.querySelectorAll('.stat-item');
      items.forEach(item => observer.observe(item));
    
      return () => items.forEach(item => observer.unobserve(item));
    }, []);

  const navigate = useNavigate()




  return (
<div>
  <main className='min-h-screen'>
    <HeaderBlack 
      language={language} 

    />
    
    <section className='grid grid-cols-2 py-5 px-2.5 gap-5 md:grid-cols-4 md:px-5 md:gap-5 lg:grid-cols-4 xl:grid-cols-10'>
      {/* Меню - 4 колонки */}
      <div className="col-span-full xl:col-span-3">
        <button 
          onClick={() => navigate("/userprofile")}
          className='text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue'>
          {t.link_userprofile}  
        </button>

        <button 
          onClick={() => navigate("/likecourses")}
          className='text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue'>
          {t.link_linkcourses}  
        </button>

        <button
          onClick={() => setShowLogoutModal(true)} language={language}
          className='text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue'>
          {t.link_logout}
        </button>
      </div>

        {/* Модальное окно */}
        {showLogoutModal && (
          <LogoutModal 
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
          />
        )}

      {/* Секция избранного*/}
      <div className="col-span-full xl:col-start-5 xl:col-span-6">
        {favorites.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-4xl font-bebas">{t.no_favorites || "Нет избранных курсов"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {favorites.map(courseId => {
              const course = allCourses[courseId];
              return (
                <div className="col-span-1 space-y-[15px] relative">
                    <div className="relative">
                      <img src={course.image} alt={course.title} className="w-full rounded-[10px]"/>
                      {course.isPaid && (
                        <div className="absolute top-[15px] right-[15px] w-[54px] h-[54px] bg-neutal-white rounded-full flex items-center justify-center">
                          <img src={dollar} alt="Платный курс" className="w-6 h-6"/>
                        </div>
                      )}
                      <button
                        onClick={() => removeFromFavorites(courseId)}
                        className={`absolute ${course.isPaid ? 'top-[72px]' : 'top-[15px]'} right-[15px] w-[54px] h-[54px] bg-neutal-white rounded-full flex items-center justify-center`}
                      >
                        <img src={heart_red} alt="Удалить из избранного" className="w-6 h-6"/>
                      </button>
                    </div>
                    <h4 className="font-bebas text-4xl text-neutal-black leading-none">
                      {course.title}
                    </h4>
                    <button 
                      className="w-full bg-neutal-black text-neutal-white font-bebas text-xl h-[50px] rounded-xl" 
                      onClick={() => navigate(course.path)} // Динамический переход
                    >
                      {course.buttonText}
                    </button>
</div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  </main>

  <Footer
    language={language} 

  />
</div>
  );
};

export default LikeCourses;
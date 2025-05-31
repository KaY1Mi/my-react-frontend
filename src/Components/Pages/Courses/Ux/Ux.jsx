import React, { useEffect, useState } from 'react';
import { translations } from '../../../translation';
import Footer from '../../../Footer';
import HeaderBlack from '../../../HeaderBlack';
import ux from '../../../../Image/webp/Course/UXUI/UXUI_main.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext';

// Компонент Modal, добавленный прямо в этот файл
const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg max-w-md w-full p-6">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const Ux = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [isAuth, setIsAuth] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const t = translations[language];

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);

  // Обработчик клика по кнопкам оплаты
  const handlePaymentClick = (path) => {
    if (isAuth) {
      navigate(path);
    } else {
      setShowAuthModal(true);
    }
  };

  // Переход на страницу входа
  const handleLogin = () => {
    setShowAuthModal(false);
    navigate('/login');
  };

  // Переход на страницу регистрации
  const handleRegister = () => {
    setShowAuthModal(false);
    navigate('/register');
  };

  // Анимации при скролле
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

  return (
    <div className="bg-white">
      {/* Модальное окно для неавторизованных пользователей */}
      {showAuthModal && (
        <Modal onClose={() => setShowAuthModal(false)}>
          <div className="p-4">
            <h3 className="text-2xl font-bebas mb-4">Требуется авторизация</h3>
            <p className="font-manrope mb-6">
              Для оформления курса необходимо войти в систему или зарегистрироваться
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleLogin}
                className="flex-1 bg-black text-white py-2 rounded font-bebas"
              >
                Войти
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 bg-neutal-blue text-black py-2 rounded font-bebas"
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Остальной код компонента остается без изменений */}
      <main>
        <HeaderBlack language={language} />
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 xl:my-5">
          <img 
            src={ux} 
            alt="Изображение курса UX" 
            className="w-full col-span-full h-[450px] object-cover md:h-[700px]" 
          />
          <p className="stat-item stat-left pt-7 text-base font-manrope col-span-full mx-2.5 md:pt-5 md:text-lg lg:text-2xl lg:pt-10 xl:col-span-6 xl:pt-10">
            {t.ux_p}
          </p>
        </div>
      </main>

      <section className="grid grid-cols-2 gap-5 mx-2.5 md:grid-cols-4 md:gap-5 xl:grid-cols-10 xl:h-screen my-5">
        <h2 className="stat-item stat-top col-span-full text-7xl font-bebas text-neutal-blue md:cold-span-3 xl:col-span-5 xl:pt-10">
          {t.ux_section1_h2}
        </h2>
        <p className="stat-item stat-right col-span-full text-sm font-manrope text-neutal-black md:col-span-3 lg:text-xl xl:col-span-full xl:pt-10">
          {t.ux_section1_p_one}
        </p>

        {/* Карточки курса */}
        {[1, 2, 3, 4].map((cardNum) => (
          <div 
            key={cardNum}
            className={`stat-item stat-${cardNum < 3 ? 'left' : 'right'} col-span-1 h-[300px] bg-neutal-black rounded-[10px] p-2.5 flex flex-col justify-between md:col-span-2 md:p-5 md:h-[450px] lg:col-span-1 lg:h-[575px] xl:col-span-2`}
          >
            <div>
              <p className="text-neutal-grey text-sm font-manrope md:text-xl">
                {t[`ux_card_${cardNum === 1 ? 'one' : cardNum === 2 ? 'two' : cardNum === 3 ? 'three' : 'four'}_lesson`]}
              </p>
              <h3 className="text-neutal-blue text-2xl font-bebas md:text-4xl">
                {t[`ux_card_${cardNum === 1 ? 'one' : cardNum === 2 ? 'two' : cardNum === 3 ? 'three' : 'four'}_work`]}
              </h3>
            </div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((dot) => (
                <div 
                  key={dot}
                  className={`w-[25px] h-[25px] rounded-full ${dot <= cardNum ? 'bg-neutal-blue' : 'bg-neutal-grey'} md:w-[40px] md:h-[40px]`}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="hidden xl:col-span-2 xl:block stat-item stat-top">
          <p className="text-xl font-manrope font-light">{t.ux_section1_p_two}</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-5 mx-2.5 md:grid-cols-4 md:gap-5 xl:grid-cols-10 my-5">
        <h2 className="stat-item stat-top col-span-full text-6xl font-bebas md:cold-span-1 xl:col-span-2 xl:pt-10">
          {t.ux_section2_h2}
        </h2>
        <p className="stat-item stat-top col-span-full font-manrope text-sm md:col-span-1 lg:col-span-2 xl:col-start-6 xl:pt-10 xl:col-span-4 xl:text-xl font-light 2xl:col-start-5 2xl:col-span-3">
          {t.ux_section2_p}
        </p>

        {/* Карточка с программой курса */}
        <div className="stat-item stat-bottom order-1 col-span-full px-2.5 py-5 bg-neutal-blue rounded-[10px] xl:row-start-2 xl:col-span-4 xl:order-2">
          <h3 className="font-bebas text-black text-6xl py-4 border-b-2 border-black">
            {t.ux_card_h3_one}
          </h3>
          <ul className="list-disc list-inside space-y-2.5 pt-5">
            {[1, 2, 3].map((item) => (
              <li key={item} className="font-manrope text-base text-black">
                {t[`ux_card_list_${item === 1 ? 'one' : item === 2 ? 'two' : 'three'}`]}
              </li>
            ))}
          </ul>
          <h4 className="text-2xl font-bebas text-black pt-7">{t.ux_card_h3_two}</h4>
          <ul className="list-disc list-inside space-y-2.5 pt-5">
            {[1, 2, 3, 4].map((item) => (
              <li key={item} className="font-manrope text-base text-black">
                {t[`ux_card_list_${item === 1 ? 'one_one' : item === 2 ? 'two_two' : item === 3 ? 'three_three' : 'four_four'}`]}
              </li>
            ))}
          </ul>
          <h5 className="font-bebas font-medium text-2xl pt-7">{t.ux_card_h3_three}</h5>
        </div>

        {/* Карточка полной оплаты */}
        <div className="stat-item stat-top order-2 col-span-full xl:col-span-3 xl:row-start-2 xl:order-1">
          <div className="px-2.5 py-5 bg-neutal-black rounded-[10px]">
            <h3 className="font-bebas text-white text-6xl py-4 border-b-2 border-white">
              {t.ux_all}
            </h3>
            <ul className="list-disc list-inside space-y-2.5 pt-5">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="font-manrope text-base text-white font-light">
                  {t[`ux_list_${item}`]}
                </li>
              ))}
            </ul>
            <h4 className="font-bebas text-6xl text-neutal-blue pt-12">49 900 ₽</h4>
          </div>
          <button 
            onClick={() => handlePaymentClick('/payfixed')}
            className="bg-black text-2xl mt-2.5 text-neutal-white col-span-full w-full h-[60px] rounded-[10px] font-bebas xl:col-span-3 xl:mt-5"
          >
            {t.ux_btn_all}
          </button>
        </div>

        {/* Карточка оплаты в рассрочку */}
        <div className="stat-item stat-top order-3 col-span-full xl:col-span-3 xl:row-start-2 xl:order-3">
          <div className="px-2.5 py-5 bg-neutal-black rounded-[10px]">
            <h3 className="font-bebas text-white text-6xl py-4 border-b-2 border-white">
              {t.ux_credit}
            </h3>
            <ul className="list-disc list-inside space-y-2.5 pt-5">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="font-manrope text-base text-white font-light">
                  {t[`ux_list_${item}_${item}`]}
                </li>
              ))}
            </ul>
            <h4 className="font-bebas text-6xl text-neutal-blue pt-12">4 990 ₽</h4>
          </div>
          <button 
            onClick={() => handlePaymentClick('/payall')}
            className="bg-black text-2xl mt-2.5 text-neutal-white col-span-full w-full h-[60px] rounded-[10px] font-bebas xl:col-span-3 xl:mt-5"
          >
            {t.btn_t_credit}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ux;
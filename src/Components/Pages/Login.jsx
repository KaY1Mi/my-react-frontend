import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { translations } from '../translation'
import Header from '../Header';
import Footer from '../Footer';

import { useContext } from 'react';
import { LanguageContext } from './LanguageContext'; // Импортируем контекст
const Login = () => {
    // для перевода текста
    const { language } = useContext(LanguageContext); // Получаем язык из контекста

    const t = translations[language];
    // для плавного скролла
    const [currentSection, setCurrentSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionsRef = useRef([]);
    const scrollTimeout = useRef(null);

    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 1280);
      };
    
      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);
      return () => window.removeEventListener('resize', checkIfMobile);
    }, []);
    
    const scrollToSection = useCallback((index) => {
      if (isScrolling || !sectionsRef.current[index]) return;
      
      setIsScrolling(true);
      setCurrentSection(index);
      
      // На мобильных устройствах не скроллим автоматически
      if (!isMobile) {
        sectionsRef.current[index].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
  
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      } else {
        setIsScrolling(false);
      }
    }, [isScrolling, isMobile]);
    
    const addToRefs = useCallback((el) => {
      if (el && !sectionsRef.current.includes(el)) {
        sectionsRef.current.push(el);
      }
    }, []);
  
  
    useEffect(() => {
      if (isMobile) return; // На мобильных не обрабатываем колесо
      
      const handleWheel = (e) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        const newSection = Math.max(0, Math.min(currentSection + direction, sectionsRef.current.length - 1));
        
        if (newSection !== currentSection) {
          scrollToSection(newSection);
        }
      };
  
      window.addEventListener('wheel', handleWheel, { passive: false });
      return () => window.removeEventListener('wheel', handleWheel);
    }, [currentSection, scrollToSection, isMobile]);
 
  
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
    // Для авторизации
    const navigate = useNavigate(); // Хук для навигации
   const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://my-django-backend-q997.onrender.com/api/login/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.detail || 'Login failed');
      }
      
      // Сохраняем токен и данные пользователя
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        email: data.email,
        id: data.user_id
      }));
      
      // Принудительное обновление и навигация
      window.location.href = '/profile'; // Используем полную перезагрузку
      
    } catch (error) {
      setErrors(error.message);
      console.error('Login error:', error);
    }
  };


  return (
    <div className={`overflow-hidden bg-black ${isMobile ? 'overflow-y-auto' : 'h-screen'} py-5`}>

      <main ref={addToRefs} className={`snap-start bg-neutal-black ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
        <Header
        language={language} 

        />
        <section className=" grid grid-cols-2 py-5 px-2.5 gap-5 md:grid-cols-4 md:px-5 md:gap-5 lg:grid-cols-4 xl:grid-cols-10">

          <div className="col-span-full xl:col-span-4">
            <button 
              onClick={() => navigate("/login")}
              className='stat-item stat-left h-[60px] col-span-full px-5 py-2.5 w-full border-b border-white text-4xl text-neutal-white font-bebas text-left  hover:bg-neutal-blue hover:text-neutal-black hover:border-none'>
              {t.link_login}  
            </button>

            <button 
              onClick={() => navigate("/regpage")}
              className='stat-item stat-left h-[60px] mb-5 col-span-full px-5 py-2.5 w-full border-b border-white text-4xl text-neutal-white font-bebas text-left  hover:bg-neutal-blue hover:text-neutal-black hover:border-none'>
              {t.link_reg}  
            </button>
          </div>


          <h2 className='stat-item stat-left text-center font-bebas col-span-full text-neutal-white text-[64px] leading-none md:text-9xl xl:col-start-6 xl:col-span-4 xl:text-left'>
            {t.h2_login}
          </h2>

          <h3 className='stat-item stat-left col-span-full font-manrope text-center uppercase font-light text-sm  text-neutal-white md:text-xl xl:col-start-6 xl:col-span-4 xl:text-left'>
            {t.h3_login}
          </h3>

          <form onSubmit={handleSubmit} className='col-span-full lg:col-span-2 lg:col-start-2 xl:col-span-full xl:grid xl:grid-cols-10 xl:gap-5' autoComplete="off">

            <div className='xl:col-start-6 xl:col-span-2'>
              <input 
                type="email"
                className='stat-item stat-left w-full border-b border-neutal-white text-white font-manrope bg-transparent py-2.5 px-1 mt-4 h-[60px] xl:mt-8 placeholder:font-manrope placeholder:text-neutal-grey text-sm placeholder:lg:text-xl'
                placeholder={t.placeholder_email}
                required
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
            </div>

            <div className='xl:col-start-8 xl:col-span-2'>
              <input 
                type="password"
                className='stat-item stat-left w-full border-b border-neutal-white text-white font-manrope bg-transparent py-2.5 px-1 mt-4 h-[60px] xl:mt-8 placeholder:font-manrope placeholder:text-neutal-grey text-sm placeholder:lg:text-xl'
                placeholder={t.placeholder_password}
                required
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
            </div>

            <div className='xl:col-start-6 xl:col-span-4'>
              <button 
                type="submit"
                className='stat-item stat-bottom h-[60px] w-full mt-4 bg-white font-manrope uppercase text-xl xl:mt-8'
              >
                {t.btn_login}
              </button>
            </div>

          </form>

        </section>

      </main>

      <footer ref={addToRefs} className={` bg-neutal-black ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
        <Footer
        language={language} 

        />
      </footer>
      
    </div>
  )
}

export default Login

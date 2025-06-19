import React, { useState, useEffect, useRef, useCallback } from 'react'
import {Link, useNavigate} from 'react-router-dom'

// импорт UI-компонентов
import Header from '../Header'
// импорт массива для перевода контента
import { translations } from '../translation'
// импорт для секции статистики
import item from '../../Image/webp/item.webp'
// импорт для секции кейсов
import case1 from '../../Image/webp/case1.webp'
import case2 from '../../Image/webp/case2.webp'
import case3 from '../../Image/webp/case3.webp'
import case4 from '../../Image/webp/case4.webp'
import case5 from '../../Image/webp/case5.webp'
// импорт для секции преимуществ
import star from '../../Image/svg/star.svg'
import arrow from '../../Image/svg/arrow.svg'
import heart_black from '../../Image/svg/heart_black.svg'
import heart_red from '../../Image/svg/heart_red.svg'
import heart1 from '../../Image/svg/heart1.svg'
import free from '../../Image/svg/free.svg'
import alien from '../../Image/svg/alien.svg'
// импорт для секции курсов
import figma from '../../Image/webp/figma.webp'
import ae from '../../Image/webp/ae.webp'
import ux from '../../Image/webp/ux.webp'
import ArrowLink from '../../Image/svg/ArrowLink.svg'
import dollar from '../../Image/svg/dollar.svg'
// импорт для секции отзывов
import u1 from '../../Image/webp/user1.webp'
import u2 from '../../Image/webp/user2.webp'
import u3 from '../../Image/webp/user3.webp'
import u4 from '../../Image/webp/user4.webp'
// импорт для секции FAQ

// импорт для секции статей
import a1 from '../../Image/webp/articles/article_1.webp'
import a2 from '../../Image/webp/articles/article_2.webp'
import a3 from '../../Image/webp/articles/article_3.webp'
import a4 from '../../Image/webp/articles/article_4.webp'
import Footer from '../Footer'
import AuthPromptModal from './AuthPromptModal'

const Home = () => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'ru';
    }
    return 'ru';
  });
  const t = translations[language] || translations['ru'] || {};
  
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionsRef = useRef([]);
  const scrollTimeout = useRef(null);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const isAuthenticated = !!localStorage.getItem('token'); // пример, подстрой под себя

  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, []);
  const navigate = useNavigate();

  // для избранного
  const [favorites, setFavorites] = useState([]);
 
  // Загрузка избранного при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (courseId) => {
    if (!isAuthenticated) {
      alert('Чтобы добавить курс в избранное, войдите в аккаунт');
      return;
    }
  
    setFavorites(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // И никакого return после этого!
  
  

  const coursesData = [
  {
    id: 1,
    title: "UX/UI дизайн",
    image: ux,
    isPaid: true,
    priceIcon: dollar,
    buttonText: "Записаться"
  },
  {
    id: 2,
    title: "Figma",
    image: figma,
    isPaid: false,
    buttonText: "Записаться"
  },
  {
    id: 3,
    title: "After Effects",
    image: ae,
    isPaid: false,
    buttonText: "Записаться"
  }
];
  

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

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
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


  return (
    <div className={`overflow-hidden ${isMobile ? 'overflow-y-auto' : 'h-screen'}`}>
      {/* Главный экран */}
      <main ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-[url('Image/webp/Hero.jpg')] bg-no-repeat bg-cover grid grid-rows-[auto_1fr] snap-start py-5`}>
        <Header 
          language={language} 
          setLanguage={handleLanguageChange}
        />
        <div className="grid grid-cols-2 gap-x-5 gap-y-[10px] mx-[10px] self-end mb-[30px] md:grid-cols-4 md:mx-[20px] xl:grid-cols-10">
          <p className='col-span-2 font-manrope font-light text-sm text-neutal-white md:col-span-3 md:text-xl lg:text-2xl xl:col-span-6 2xl:uppercase'>
            {t?.title || 'Sakura Flow Design School'}
          </p>
          <h1 className='col-span-2 font-bebas font-normal text-[158px] -my-3 text-neutal-white leading-none md:text-[300px] text-right md:col-span-4 lg:text-[350px] lg:text-left xl:col-span-5 xl:text-[300px] 2xl:text-[400px] 2xl:col-span-5'>
            {t?.School || 'Sakura Flow'}
          </h1>
          <h1 className='col-span-2 font-bebas font-normal text-[158px] -my-3 text-neutal-white leading-none md:text-[300px] text-right md:col-span-4 lg:text-[350px] lg:text-right xl:col-span-4 xl:text-[300px] 2xl:text-[400px] 2xl:col-span-4'>
            {t?.Ux || 'Design School'}
          </h1>
        </div>
      </main>

      {/* Секция Статистики */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-[url("Image/webp/Statistic.png")] bg-no-repeat bg-cover py-10 px-5 snap-start`}>

      <h2 className='stat-item stat-top font-bebas text-neutal-white text-[64px] leading-none md:text-9xl'>
          {t?.h2_stats || 'Our Statistics'}
        </h2>

        <div className="grid grid-cols-2 gap-x-5 gap-y-[10px] md:grid-cols-4 md:gap-x-10 md:gap-y-5 xl:grid-cols-10 xl:grid-rows-3 py-10">
          
          {/* Первый блок  */}
          <div className="stat-item stat-left col-span-2 md:col-span-2 md:row-start-1 xl:col-span-3 xl:col-start-1 xl:row-start-1">
            <div className="">
              <h3 className='font-bebas text-neutal-white text-8xl leading-none'>10+</h3>
              <p className='font-manrope text-neutal-white text-sm py-[10px] mt-[10px] border-t-2 border-neutal-white md:text-xl font-light'>{t.first_stat}</p>
            </div>
          </div>

          {/* Второй блок  */}
          <div className="stat-item stat-left col-span-2 md:col-span-2 md:col-start-3 md:row-start-2 xl:col-span-3 xl:col-start-1 xl:row-start-2">
            <div className="">
              <h3 className='font-bebas text-neutal-white text-8xl leading-none text-right md:text-right xl:text-left'>70%</h3>
              <p className='font-manrope text-neutal-white text-sm py-[10px] mt-[10px] border-t-2 border-neutal-white text-right md:text-right md:text-xl font-light xl:text-left'>{t.second_stat}</p>
            </div>
          </div>

          {/* Третий блок  */}
          <div className="stat-item stat-left col-span-2 md:col-span-2 md:row-start-3 xl:col-span-3 xl:col-start-1 xl:row-start-3">
            <div className="">
              <h3 className='font-bebas text-neutal-white text-8xl leading-none '>80%</h3>
              <p className='font-manrope text-neutal-white text-sm py-[10px] mt-[10px] border-t-2 border-neutal-white md:text-xl font-light'>{t.third_stat}</p>
            </div>
          </div>

          {/* Картинка (4-7 колонка) */}
          <div className="hidden xl:block stat-item stat-bottom xl:col-span-4 xl:col-start-4 xl:row-span-3 xl:row-start-1">
            <img src={item} alt="item" className="w-full h-full object-cover" />
          </div>

          {/* Четвертый блок (перемещается в 8-10 колонку) */}
          <div className="stat-item stat-right col-span-2 md:col-span-2 md:col-start-3 md:row-start-4 xl:col-start-8 xl:col-span-3 xl:row-start-1">
            <div className="">
              <h3 className='font-bebas text-neutal-white text-8xl leading-none text-right md:text-right'>7+</h3>
              <p className='font-manrope font-light text-neutal-white text-sm py-[10px] mt-[10px] border-t-2 border-neutal-white text-right md:text-right md:text-xl'>{t.fourth_stat}</p>
            </div>
          </div>

          {/* Пятый блок (8-10 колонка) */}
          <div className="stat-item stat-right col-span-2 md:col-span-2 md:row-start-5 xl:col-start-8 xl:col-span-3 xl:row-start-2">
            <div className="">
              <h3 className='font-bebas text-neutal-white text-8xl leading-none xl:text-right'>92%</h3>
              <p className='font-manrope font-light text-neutal-white text-sm py-[10px] mt-[10px] border-t-2 border-neutal-white md:text-xl xl:text-right'>{t.fifth_stat}</p>
            </div>
          </div>

          {/* Шестой блок (8-10 колонка) */}
          <div className="stat-item stat-right col-span-2 md:col-span-2 md:col-start-3 md:row-start-6 xl:col-start-8 xl:col-span-3 xl:row-start-3">
            <div className="">
              <h3 className='font-bebas text-neutal-white text-8xl leading-none text-right md:text-right '>95%</h3>
              <p className='font-manrope font-light text-neutal-white text-sm py-[10px] mt-[10px] border-t-2 border-neutal-white text-right md:text-right md:text-xl'>{t.sixth_stat}</p>
            </div>
          </div> 
          
        </div>

      </section>

      {/* Секция Популярных кейсов */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} snap-start mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5`}>
        
        <h2 className='stat-item stat-top col-span-full font-bebas py-5 text-neutal-black text-[64px] leading-none md:text-9xl '>
          {t.h2_course}
        </h2>
  
        <div className="col-span-full grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-10">

          <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
            <img src={case1} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
            <a href="https://www.behance.net/gallery/199580153/Hem-E-commerce-Redesign-Concept" className='text-4xl font-bebas font-light text-neutal-black underline underline-offset-4'>
              {t.case_one}
            </a>
          </div>

          <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
            <img src={case2} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
            <a href="https://www.behance.net/gallery/199580153/Hem-E-commerce-Redesign-Concept" className='text-4xl font-bebas font-light text-neutal-black underline underline-offset-4'>
              {t.case_two}
            </a>
          </div>

          <div className="stat-item stat-top col-span-2  md:col-span-4 self-start xl:col-span-2">
            <img src={case3} alt="Баннер Кейса" className='rounded-xl object-cover mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] w-full xl:h-[450px]' />
            <a href="https://www.behance.net/gallery/199580153/Hem-E-commerce-Redesign-Concept" className='text-4xl font-bebas font-light text-neutal-black underline underline-offset-4'>
              {t.case_three}
            </a>
          </div>

          <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
            <img src={case4} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
            <a href="https://www.behance.net/gallery/199580153/Hem-E-commerce-Redesign-Concept" className='text-4xl font-bebas font-light text-neutal-black underline underline-offset-4'>
              {t.case_four}
            </a>
          </div>

          <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
            <img src={case5} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
            <a href="https://www.behance.net/gallery/199580153/Hem-E-commerce-Redesign-Concept" className='text-4xl font-bebas font-light text-neutal-black underline underline-offset-4'>
              {t.case_five}
            </a>
          </div>

        </div>

        <button onClick={()=>navigate("/case-project")} className='stat-item stat-bottom col-span-2 mt-5 md:col-span-4 lg:col-span-4 bg-neutal-black text-neutal-white font-bebas text-2xl h-[80px] rounded-xl xl:col-start-4 xl:col-span-4 '>
          {t.btn_case}
        </button>
        
      </section>

      {/* Секция Преимущества */}
      <section ref={addToRefs} className={`snap-start  bg-neutal-black ${isMobile ? 'min-h-screen' : 'h-screen'} `}>
        <div className="min-h-screen grid grid-cols-2 py-10 px-2.5 gap-5 md:grid-cols-4 md:px-5 md:gap-5 lg:grid-cols-4 xl:grid-cols-10">

          <h2 className='stat-item stat-top font-bebas col-span-full text-neutal-white text-[64px] leading-none md:text-9xl'>
            {t.h2_advantage}
          </h2>

          <h3 className='stat-item stat-top col-span-2 font-bebas text-2xl text-neutal-white text-left leading-none md:col-span-4 md:text-right md:text-4xl lg:col-start-2 lg:col-span-3 lg:text-left xl:col-start-6 xl:col-span-5'>{t.title_one}</h3>
          <h3 className='stat-item stat-top col-span-2 font-bebas text-2xl text-neutal-white text-right leading-none md:col-span-4 md:text-left md:text-4xl lg:col-span-3 xl:col-start-5 xl:col-span-5'>{t.title_two}</h3>
          <p className='stat-item stat-top col-span-1 font-manrope text-sm text-neutal-white md:col-span-2 md:text-[16px] xl:col-start-3 xl:col-span-4 2xl:col-start-5 2xl:col-span-3'>{t.text_two}</p>
          <p className='stat-item stat-top col-start-2 col-span-1 font-manrope text-sm text-neutal-white  md:col-span-2 md:text-[16px] xl:col-start-7 xl:col-span-4 2xl:col-start-8 2xl:col-span-3'>{t.text_one}</p>


          <div className="stat-item stat-bottom col-span-2 border-2 border-neutal-white rounded-[10px] p-[15px] flex flex-col justify-between">
            <h4 className='font-bebas text-4xl text-neutal-white leading-none'>{t.advantage_one}</h4>
            <img src={star} alt="star" className='h-[150px] w-[150px] mx-auto md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px]' />
            <p className='font-manrope text-sm font-light text-neutal-white lg:text-[16px]'>{t.advantage_one_desc}</p>
          </div>

          <div className="stat-item stat-bottom col-span-2 border-2 border-neutal-white rounded-[10px] p-[15px] flex flex-col justify-between">
            <h4 className='font-bebas text-4xl text-neutal-white leading-none'>{t.advantage_two}</h4>
            <img src={arrow} alt="star" className='h-[150px] w-[150px] mx-auto md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px]' />
            <p className='font-manrope text-sm font-light text-neutal-white lg:text-[16px]'>{t.advantage_two_desc}</p>
          </div>

          <div className="stat-item stat-bottom col-span-2 border-2 border-neutal-white rounded-[10px] p-[15px] flex flex-col justify-between ">
            <h4 className='font-bebas text-4xl text-neutal-white leading-none'>{t.advantage_three}</h4>
            <img src={heart1} alt="star" className='h-[150px] w-[150px] mx-auto md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px]' />
            <p className='font-manrope text-sm font-light text-neutal-white lg:text-[16px]'>{t.advantage_three_desc}</p>
          </div>

          <div className="stat-item stat-bottom col-span-2 border-2 border-neutal-white rounded-[10px] p-[15px] flex flex-col justify-between">
            <h4 className='font-bebas text-4xl text-neutal-white leading-none'>{t.advantage_four}</h4>
            <img src={free} alt="star" className='h-[150px] w-[150px] mx-auto md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px]' />
            <p className='font-manrope text-sm font-light text-neutal-white lg:text-[16px]'>{t.advantage_four_desc}</p>
          </div>

          <div className="stat-item stat-bottom col-span-2 border-2 border-neutal-white rounded-[10px] p-[15px] flex flex-col justify-between md:col-span-4 xl:col-span-2">
            <h4 className='font-bebas text-4xl text-neutal-white leading-none'>{t.advantage_five}</h4>
            <img src={alien} alt="star" className='h-[150px] w-[150px] mx-auto md:h-[200px] md:w-[200px] lg:w-[300px] lg:h-[300px] xl:h-[350px] xl:w-[350px] ' />
            <p className='font-manrope text-sm font-light text-neutal-white lg:text-[16px]'>{t.advantage_five_desc}</p>
          </div>
          
            

        </div>
      </section>

      {/* Секция Лучшие курсы */}
      <section ref={addToRefs} className={`snap-start bg-neutal-white ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
          <div className="grid grid-cols-2 py-10 px-2.5 gap-5 md:grid-cols-4 md:px-5 md:gap-5 lg:grid-cols-4 xl:grid-cols-10 min-h-screen">
            <h2 className='stat-item stat-left font-bebas flex items-center col-span-full text-neutal-black text-[64px] leading-none md:text-9xl xl:col-span-6'>
              {t.h2_best_courses}
            </h2>

            <Link to="/courses" className='stat-item stat-right col-span-full font-bebas justify-start font-light text-neutal-black text-4xl leading-none flex items-center gap-2 xl:col-span-4 xl:justify-end'>
              <span>{t.cours_link}</span>
              <img src={ArrowLink} alt="" className="inline-block" />
            </Link>

            {/* Карточка UX */}
            <div className="stat-item stat-bottom order-1 col-span-2 space-y-[15px] md:col-span-4 xl:col-span-4 xl:order-2 relative">
              <div className="relative">
                <img src={ux} alt="Баннер курса по фигма" className='w-full rounded-[10px]'/>
                {/* Иконка платного курса */}
                <div className="absolute top-[15px] right-[15px] w-[54px] h-[54px] bg-neutal-white rounded-full flex items-center justify-center">
                  <img src={dollar} alt="платный курс" />
                </div>
                {/* Иконка избранного (изменена только эта часть) */}
                <button
  onClick={() => toggleFavorite('ux')}
  className="absolute top-[72px] right-[15px] w-[54px] h-[54px] bg-neutal-white rounded-full flex items-center justify-center"
>
  <img
    src={isAuthenticated
      ? (favorites.includes('ux') ? heart_red : heart_black)
      : heart_black} // иконка-сердечко с замком или серое
    alt="Избранное"
  />
</button>
              </div>
              <h4 className='font-bebas text-4xl text-neutal-black leading-none'>{t.h4_ux}</h4>
              <button className='w-full bg-neutal-black text-neutal-white font-bebas text-2xl h-[60px] rounded-xl mt-2' onClick={()=>navigate('/figma-course')}>
                {t.btn_courses}
              </button>
            </div>
            
            {/* Карточка Figma */}
            <div className="stat-item stat-top order-2 col-span-2 space-y-[15px] md:col-span-2 xl:col-span-3 xl:order-1 relative">
              <div className="relative">
                <img src={figma} alt="Баннер курса по фигма" className='w-full rounded-[10px]'/>
                {/* Иконка избранного (изменена только эта часть) */}
                <button
  onClick={() => toggleFavorite('figma')}
  className="absolute top-[72px] right-[15px] w-[54px] h-[54px] bg-neutal-white rounded-full flex items-center justify-center"
>
  <img
    src={isAuthenticated
      ? (favorites.includes('figma') ? heart_red : heart_black)
      : heart_black} // иконка-сердечко с замком или серое
    alt="Избранное"
  />
</button>
              </div>
              <h4 className='font-bebas text-4xl text-neutal-black leading-none'>{t.h4_figma}</h4>
              <button className='w-full bg-neutal-black text-neutal-white font-bebas text-2xl h-[60px] rounded-xl mt-2' onClick={()=>navigate('/figma-course')}>
                {t.btn_courses}
              </button>
            </div>

            {/* Карточка AE */}
            <div className="stat-item stat-top order-3 col-span-2 space-y-[15px] md:col-span-2 xl:col-span-3 relative">
              <div className="relative">
                <img src={ae} alt="Баннер курса по фигма" className='w-full rounded-[10px]'/>
                {/* Иконка избранного (изменена только эта часть) */}
                <button
  onClick={() => toggleFavorite('ae')}
  className="absolute top-[72px] right-[15px] w-[54px] h-[54px] bg-neutal-white rounded-full flex items-center justify-center"
>
  <img
    src={isAuthenticated
      ? (favorites.includes('ae') ? heart_red : heart_black)
      : heart_black} // иконка-сердечко с замком или серое
    alt="Избранное"
  />
</button>
              </div>
              <h4 className='font-bebas text-4xl text-neutal-black leading-none'>{t.h4_ae}</h4>
              <button className='w-full bg-neutal-black text-neutal-white font-bebas text-2xl h-[60px] rounded-xl mt-2' onClick={()=>navigate('/figma-course')}>
                {t.btn_courses}
              </button>
            </div>
          </div>
      </section>

      {/* Секция Отзывов */}
      <section ref={addToRefs} className={`snap-start bg-neutal-black ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
        <div className="grid grid-cols-2 py-10 px-2.5 gap-5 md:grid-cols-4 md:px-5 md:gap-10 lg:grid-cols-4 xl:grid-cols-10 xl:gap-y-20 xl:gap-x-5">
          <h2 className='stat-item stat-top font-bebas col-span-full text-neutal-white text-[64px] leading-none md:text-9xl'>
            {t.h2_review}
          </h2>

          <h3 className='stat-item stat-top order-3 font-bebas text-center col-span-full text-neutal-white text-[64px] leading-none md:text-8xl xl:col-span-4 xl:text-left xl:order-1'>
            {t.h3_review}
          </h3>

          {/* Отзыв №1 */}
          <div className="stat-item stat-right order-1 col-span-2 grid gap-5 xl:order-2">
            <div className="col-span-1 xl:col-span-2">
              <img src={u1} alt="Студент Диана Козырёк" className=' rounded-[10px]' />
            </div>
            <div className="col-span-2 space-y-2.5">
              <h4 className='font-bebas text-neutal-white text-4xl leading-none'>{t.u1_name}</h4>
              <p className='font-manrope text-sm text-neutal-white lg:text-xl xl:text-base'>{t.u1_comment}</p>
            </div>
          </div>

          {/* Отзыв №2 */}
          <div className="stat-item stat-right order-2 col-span-2 grid  gap-5 xl:order-3">
            <div className="col-span-1 col-start-2 xl:col-span-2">
              <img src={u2} alt="Студент Диана Козырёк" className='bg-contain rounded-[10px]' />
            </div>
            <div className="col-span-2 space-y-2.5 text-right xl:text-left">
              <h4 className='font-bebas text-neutal-white text-4xl leading-none'>{t.u2_name}</h4>
              <p className='font-manrope text-sm text-neutal-white lg:text-xl xl:text-base'>{t.u1_comment}</p>
            </div>
          </div>

          {/* Отзыв №3 */}
          <div className=" stat-item stat-right order-4 col-span-2 grid  gap-5 xl:order-4">
            <div className="col-span-1 xl:col-span-2">
              <img src={u3} alt="Студент Диана Козырёк" className='bg-contain rounded-[10px]' />
            </div>
            <div className="col-span-2 space-y-2.5">
              <h4 className='font-bebas text-neutal-white text-4xl leading-none'>{t.u3_name}</h4>
              <p className='font-manrope text-sm text-neutal-white lg:text-xl xl:text-base'>{t.u1_comment}</p>
            </div>
          </div>

          {/* Отзыв №4 */}
          <div className="stat-item stat-right order-5 col-span-2  grid  gap-5 xl:order-3 xl:hidden">
            <div className="col-span-1 col-start-2 xl:col-span-2">
              <img src={u4} alt="Студент Диана Козырёк" className='bg-contain rounded-[10px]' />
            </div>
            <div className="col-span-2 space-y-2.5 text-right xl:text-left">
              <h4 className='font-bebas text-neutal-white text-4xl leading-none'>{t.u4_name}</h4>
              <p className='font-manrope text-sm text-neutal-white lg:text-xl xl:text-base'>{t.u1_comment}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Секция статей */}
      <section ref={addToRefs} className={`snap-start bg-neutal-white ${isMobile ? 'min-h-screen' : 'h-screen'}`}>

        <div className="grid grid-cols-2 py-10 px-2.5 gap-5 md:grid-cols-4 md:px-5 md:gap-5 lg:grid-cols-4 xl:grid-cols-10">

          <h2 className='stat-item stat-left font-bebas flex items-center col-span-full text-neutal-black text-[64px] leading-none md:text-9xl xl:col-span-6'>
            {t.h2_article}
          </h2>


          <Link to="/acticles" className='stat-item stat-right col-span-full font-bebas justify-start font-light text-neutal-black text-4xl leading-none flex items-center gap-2 xl:col-span-4 xl:justify-end'>
            <span>{t.all_article}</span>
            <img src={ArrowLink} alt="" className="inline-block" />
          </Link>

          <div className="stat-item stat-top col-span-full md:col-span-2 xl:col-span-2">
            <div className="bg-neutal-black rounded-[10px]">
              <img src={a1} className='h-[370px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' alt="баннер статьи" />
            </div>
            <div className="">
              <h4 className='font-bebas text-4xl text-neutal-black leading-none py-3'>{t.article_one}</h4>
              <button className='w-full bg-neutal-black text-neutal-white font-bebas text-2xl h-[60px] rounded-xl' onClick={()=>navigate('/color-two')}>
                {t.btn_read}
              </button>
            </div>
          </div>

          <div className="stat-item stat-bottom col-span-full md:col-span-2 xl:col-span-3">
            <div className="bg-neutal-black rounded-[10px]">
              <img src={a2} className='h-[370px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[406px] 2xl:h-[550px]' alt="баннер статьи" />
            </div>
            <div className="">
              <h4 className='font-bebas text-4xl text-neutal-black leading-none py-3 xl:text-5xl'>{t.article_two}</h4>
              <button className='w-full bg-neutal-black text-neutal-white font-bebas text-2xl h-[60px] rounded-xl'  onClick={()=>navigate('/p-four')}>
                {t.btn_read}
              </button>
            </div>
          </div>

          <div className="stat-item stat-top col-span-full  md:col-span-2 xl:col-span-2 ">
            <div className="bg-neutal-black rounded-[10px]">
              <img src={a3} className='h-[370px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' alt="баннер статьи" />
            </div>
            <div className="">
              <h4 className='font-bebas text-4xl text-neutal-black leading-none py-3'>{t.article_three}</h4>
              <button className='w-full bg-neutal-black text-neutal-white font-bebas text-2xl h-[60px] rounded-xl'  onClick={()=>navigate('/t-three')}>
                {t.btn_read}
              </button>
            </div>
          </div>

          <div className="stat-item stat-bottom col-span-full  md:col-span-2 xl:col-span-3 ">
            <div className="bg-neutal-black rounded-[10px]">
              <img src={a4} className='h-[370px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[406px] 2xl:h-[550px]' alt="баннер статьи" />
            </div>
            <div className="">
              <h4 className='font-bebas text-4xl text-neutal-black leading-none py-3 xl:text-5xl'>{t.article_four}</h4>
              <button className='w-full bg-neutal-black text-neutal-white font-bebas text-2xl h-[60px] rounded-xl'  onClick={()=>navigate('/p-three')}>
                {t.btn_read}
              </button>
            </div>
          </div>

         

        </div>

      </section>

      {/*Секция FAQ  */}
      <section ref={addToRefs} className={`snap-start bg-neutal-black ${isMobile ? 'min-h-screen' : 'h-screen'} flex items-center`}>
        <div className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <h2 className='stat-item stat-top font-bebas text-neutal-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none text-center mb-8 md:mb-12 lg:mb-16'>
            {t.h2_FAQ}
          </h2>
          
          {/* FAQ Section */}
          <div className="stat-item stat-bottom max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {/* Вопрос 1 */}
            <div className="border-b border-neutal-white py-4 sm:py-5">
              <button 
                className="flex justify-between items-center w-full text-left text-neutal-white font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                onClick={() => toggleFAQ(1)}
              >
                <span>{t.q_one}</span>
                <span className="ml-4 flex items-center justify-center w-12 h-10 bg-white rounded-md transition-transform duration-300 transform" style={{ transform: activeFAQ === 1 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {activeFAQ === 1 && (
                <div className="mt-2 sm:mt-3 text-gray-200 text-sm sm:text-base font-manrope font-light">
                  <p>{t.a_one}</p>
                </div>
              )}
            </div>
            
            {/* Вопрос 2 */}
            <div className="border-b border-neutal-white py-4 sm:py-5">
              <button 
                className="flex justify-between items-center w-full text-left text-neutal-white font-bebas text-xl sm:text-2xl md:text-3xl"
                onClick={() => toggleFAQ(2)}
              >
                <span>{t.q_two}</span>
                <span className="ml-4 flex items-center justify-center w-12 h-10 bg-white rounded-md transition-transform duration-300 transform" style={{ transform: activeFAQ === 2 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {activeFAQ === 2 && (
                <div className="mt-2 sm:mt-3 text-gray-200 text-sm sm:text-base font-manrope font-light">
                  <p>{t.a_two}</p>
                </div>
              )}
            </div>
            
            {/* Вопрос 3 */}
            <div className="border-b border-neutal-white py-4 sm:py-5">
              <button 
                className="flex justify-between items-center w-full text-left text-neutal-white font-bebas text-xl sm:text-2xl md:text-3xl"
                onClick={() => toggleFAQ(3)}
              >
                <span>{t.q_three}</span>
                <span className="ml-4 flex items-center justify-center w-12 h-10 bg-white rounded-md transition-transform duration-300 transform" style={{ transform: activeFAQ === 3 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {activeFAQ === 3 && (
                <div className="mt-2 sm:mt-3 text-gray-200 text-sm sm:text-base font-manrope font-light">
                  <p>{t.a_three}</p>
                </div>
              )}
            </div>
            
            {/* Вопрос 4 */}
            <div className="border-b border-neutal-white py-4 sm:py-5">
              <button 
                className="flex justify-between items-center w-full text-left text-neutal-white font-bebas text-xl sm:text-2xl md:text-3xl"
                onClick={() => toggleFAQ(4)}
              >
                <span>{t.q_four}</span>
                <span className="ml-4 flex items-center justify-center w-12 h-10 bg-white rounded-md transition-transform duration-300 transform" style={{ transform: activeFAQ === 4 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {activeFAQ === 4 && (
                <div className="mt-2 sm:mt-3 text-gray-200 text-sm sm:text-base font-manrope font-light">
                  <p>{t.a_four}</p>
                </div>
              )}
            </div>
            
            {/* Вопрос 5 */}
            <div className="border-b border-neutal-white py-4 sm:py-5">
              <button 
                className="flex justify-between items-center w-full text-left text-neutal-white font-bebas text-xl sm:text-2xl md:text-3xl"
                onClick={() => toggleFAQ(5)}
              >
                <span>{t.q_five}</span>
                <span className="ml-4 flex items-center justify-center w-12 h-10 bg-white rounded-md transition-transform duration-300 transform" style={{ transform: activeFAQ === 5 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {activeFAQ === 5 && (
                <div className="mt-2 sm:mt-3 text-gray-200 text-sm sm:text-base font-manrope font-light">
                  <p>{t.a_five}</p>
                </div>
              )}
            </div>
          </div>
        </div>      
      </section>

      {/* Секция Рассылки */}
      <section ref={addToRefs} className={`h-screen bg-cover grid place-content-center justify-center space-y-1 grid-cols-2 py-10 px-2.5 gap-5 md:grid-cols-4 md:px-5 md:gap-5 lg:grid-cols-4 xl:grid-cols-10 xl:space-y-10 ${isMobile ? 'min-h-screen' : 'h-screen'} bg-[url('Image/webp/Hero.jpg')] bg-no-repeat  `}>
      
        <h2 className='stat-item stat-top font-bebas col-span-full text-center text-neutal-white text-[64px] leading-none md:text-9xl'>{t.jorney}</h2>

        <p className='stat-item stat-left col-span-1 font-manrope font-light text-neutal-white text-sm md:col-span-2 md:text-xl xl:col-start-4 xl:col-span-2'>{t.jorney_text_one}</p>
        <p className='stat-item stat-right col-span-1 col-start-2 font-manrope font-light text-neutal-white text-sm md:col-span-2 md:col-start-3 md:text-xl xl:col-start-6 xl:col-span-2'>{t.jorney_text_two}</p>

        <form 
  onSubmit={(e) => {
    e.preventDefault(); // Блокируем реальную отправку
    const email = e.target.email.value; // Получаем email
    console.log("Форма отправлена (фейк)! Email:", email); // Для проверки в консоли
    e.target.reset(); // Очищаем поле ввода
    alert("Спасибо! Мы получили ваш email."); // Простой фидбек
  }} 
  className="stat-item stat-bottom col-span-full grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-10"
>
  <input 
    type="email" 
    name="email"
    required
    placeholder="E-mail" 
    className="col-span-full h-[70px] px-2 bg-transparent border-0 border-b border-neutal-white focus:outline-none md:text-xl md:h-[100px] xl:col-start-4 xl:col-span-3 xl:h-[55px] focus:ring-0 placeholder:text-neutal-white text-neutal-white font-manrope font-light" 
  />
  <button 
    type="submit" 
    className='col-span-full bg-neutal-white font-bebas text-2xl text-neutal-black h-[70px] md:h-[100px] xl:col-start-7 xl:col-span-1 xl:h-[55px] hover:bg-opacity-80 transition-opacity'
  >
    {t.btn_jorney}
  </button>
</form>
      </section>

      {/* Футер */}
      <footer ref={addToRefs} className={` bg-neutal-black ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
        <Footer
        language={language} 
        setLanguage={setLanguage}
        />
      </footer>
      
    </div>
  );
};

export default Home;
import React, { useState, useEffect, useRef, useCallback } from 'react'
// импорт UI-компонентов
import HeaderBlack from '../../../HeaderBlack'
// импорт массива для перевода контента
import { translations } from '../../../translation'
import { useNavigate } from 'react-router-dom'
import  { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext'; // Импортируем контекстm'

// импорт изображений 
import a15 from '../../../../Image/webp/articles/article_15.webp'
import a2 from '../../../../Image/webp/articles/Ar_img/a2.avif'
import a3 from '../../../../Image/webp/articles/Ar_img/a3.avif'
import a4 from '../../../../Image/webp/articles/Ar_img/a4.avif'
import a6 from '../../../../Image/webp/articles/Ar_img/a6.png'
import a7 from '../../../../Image/webp/articles/Ar_img/a7.webp'
import a8 from '../../../../Image/webp/articles/Ar_img/a8.jpg'
import a9 from '../../../../Image/webp/articles/Ar_img/a9.jpg'
import Footer from '../../../Footer'


const ColorOne = () => {
  const { language } = useContext(LanguageContext); // Получаем язык из контек
const [currentSection, setCurrentSection] = useState(0);
const [isScrolling, setIsScrolling] = useState(false);
const [isMobile, setIsMobile] = useState(false);
const sectionsRef = useRef([]);
const scrollTimeout = useRef(null);
const t = translations[language];


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


  return (
    <div className={`overflow-hidden ${isMobile ? 'overflow-y-auto' : 'h-screen'}`}>
        <main ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'}`}>
            <HeaderBlack
            language={language} 

            />
          <div className="relative">
            <img 
                src={a15} 
                alt="" 
                className='min-h-[615px] w-full object-cover md:max-h-[720px] md:object-cover' 
                style={{ objectPosition: '70% 50%' }} 
            />
            <div className="absolute bottom-0 text-center left-0 bg-black bg-opacity-50 right-0 p-4">
                <h1 className="stat-item stat-top text-6xl font-bebas text-neutal-white md:text-7xl xl:text-[250px] 2xl:text-[250px] leading-none ">{t.article_typo4_h1}</h1>
            </div>
          </div>
          <div className="stat-item stat-left mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 md:mx-5">
            <h2 className=' tpt-5 col-span-full font-bebas text-xl md:text-2xl md:col-span-full lg:col-span-full lg:text-4xl xl:col-span-7 xl:text-5xl'>{t.article_typo1_h2}</h2>
          </div>
        </main>

            {/* First Content Section */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-fit py-10' : 'h-screen'} px-4 md:px-8 lg:px-12 xl:px-16`}>
        <div className="container mx-auto">
          <h2 className='stat-item stat-left font-bebas text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8'>
            {t.article_typo1_h2}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="stat-item stat-left">
              <h3 className='text-3xl md:text-4xl font-bebas text-neutal-black mb-4'>
                {t.article_typo1_h3_one}
              </h3>
              <p className='text-xl md:text-2xl font-manrope text-neutal-grey'>
                {t.article_typo1_p_one}
              </p>
            </div>
            
            <div className="stat-item stat-left">
              <h3 className='text-3xl md:text-4xl font-bebas text-neutal-black mb-4'>
                {t.article_typo1_h3_two}
              </h3>
              <p className='text-xl md:text-2xl font-manrope text-neutal-grey'>
                {t.article_typo1_p_two}
              </p>
            </div>
            
            <div className="stat-item stat-left">
              <h3 className='text-3xl md:text-4xl font-bebas text-neutal-black mb-4'>
                {t.article_typo1_h3_three}
              </h3>
              <p className='text-xl md:text-2xl font-manrope text-neutal-grey'>
                {t.article_typo1_p_three}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Content Section */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-fit py-10' : 'h-screen'} px-4 md:px-8 lg:px-12 xl:px-16 bg-gray-50`}>
        <div className="container mx-auto">
          <h2 className='stat-item stat-top font-bebas text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8'>
            {t.article_typo1_h2_two}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="stat-item stat-left">
              <img 
                src={a2} 
                alt="изображения" 
                className='w-full h-auto object-cover rounded-lg shadow-lg'
              />
            </div>
            
            <div className="stat-item stat-right">
              <h3 className='text-3xl md:text-4xl font-bebas text-neutal-black mb-6'>
                {t.article_typo1_h3_four}
              </h3>
              <p className='text-xl md:text-2xl font-manrope text-neutal-grey mb-6'>
                {t.article_typo1_p_four}
              </p>
              <p className='text-xl md:text-2xl font-manrope text-neutal-grey'>
                {t.article_typo1_p_five}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Third Content Section */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-fit py-10' : 'h-screen'} px-4 md:px-8 lg:px-12 xl:px-16`}>
        <div className="container mx-auto">
          <h2 className='stat-item stat-top font-bebas text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8'>
            {t.article_typo1_h2_three}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="stat-item stat-left">
              <h3 className='text-3xl md:text-4xl font-bebas text-neutal-black mb-6'>
                {t.article_typo1_h2_four}
              </h3>
              <p className='text-xl md:text-2xl font-manrope text-neutal-grey'>
                {t.article_typo1_p_five_two}
              </p>
            </div>
            
            <div className="stat-item stat-right">
              <img 
                src={a3} 
                alt="изображения" 
                className='w-full h-auto object-cover rounded-lg shadow-lg'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Content Section */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-fit py-10' : 'h-screen'} px-4 md:px-8 lg:px-12 xl:px-16 bg-gray-50`}>
        <div className="container mx-auto">
          <h2 className='stat-item stat-top font-bebas text-4xl md:text-5xl lg:text-6xl xl:text-8xl mb-8'>
            {t.article_typo1_h2_five}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="stat-item stat-left">
              <img 
                src={a4} 
                alt="изображения" 
                className='w-full h-auto object-cover rounded-lg shadow-lg'
              />
            </div>
            
            <div className="stat-item stat-right">
              <img 
                src={a15} 
                alt="изображения" 
                className='w-full h-auto object-cover rounded-lg shadow-lg'
              />
            </div>
          </div>
        </div>
      </section>

        <footer ref={addToRefs} className="">
          <Footer
          language={language} 
         
          />
        </footer>

    </div>
  )
}

export default ColorOne

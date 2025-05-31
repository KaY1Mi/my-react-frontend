import React, { useCallback, useEffect, useRef, useState } from 'react'
import { translations } from '../translation'
import Header from '../Header';
import Footer from '../Footer';
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext'; // Импортируем контекст



// импорт для секции статей
import a1 from '../../Image/webp/articles/article_1.webp'
import a2 from '../../Image/webp/articles/article_2.webp'
import a3 from '../../Image/webp/articles/article_3.webp'
import a4 from '../../Image/webp/articles/article_4.webp'
import a5 from '../../Image/webp/articles/article_5.webp'
import a6 from '../../Image/webp/articles/article_6.webp'
import a7 from '../../Image/webp/articles/article_7.webp'
import a8 from '../../Image/webp/articles/article_8.webp'
import a9 from '../../Image/webp/articles/article_9.webp'
import a10 from '../../Image/webp/articles/article_10.webp'
import a11 from '../../Image/webp/articles/article_11.webp'
import a12 from '../../Image/webp/articles/article_12.webp'
import a13 from '../../Image/webp/articles/article_13.webp'
import a14 from '../../Image/webp/articles/article_14.webp'
import a15 from '../../Image/webp/articles/article_15.webp'
import a16 from '../../Image/webp/articles/article_16.webp'
import { useNavigate } from 'react-router-dom';


const Articles = () => {

    // для перевода текста
    
  const { language } = useContext(LanguageContext); // Получаем язык из контекста

    const t = translations[language];

    // для плавного скролла
    const [currentSection, setCurrentSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionsRef = useRef([]);
    const scrollTimeout = useRef(null);
    const navigate = useNavigate()

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

      {/* Статьи о Цвете */}
      <main ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-neutal-black py-5`}>

        <Header
        language={language} 

        />

        <section className={`mx-2.5 grid grid-cols-2 gap-x-2.5 gap-y-5 md:grid-cols-4 xl:grid-cols-10 md:mx-5`}>
                
            <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-white text-[64px] leading-none md:text-9xl '>
                {t.h2_color}
            </h2>

            <div className="stat-item stat-left col-span-1 md:col-span-2 xl:col-span-3">
              <div className="bg-assent-red rounded-[10px]">
                <img src={a5} className='h-[175px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[406px] 2xl:h-[550px]' alt="баннер статьи" />
              </div>
              <div className="">
                <h4 className='font-bebas text-2xl text-neutal-white leading-none py-3 font-medium md:text-4xl xl:text-7xl'>{t.color_one}</h4>
                <button className='w-full bg-neutal-white text-neutal-black font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl'onClick={()=>navigate('/color-one')}>
                  {t.btn_read}
                </button>
              </div>
            </div>

            <div className="stat-item stat-top col-span-1 md:col-span-2 xl:col-span-2">
              <div className="bg-assent-red  rounded-[10px]">
                <img src={a1} className='h-[175px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' alt="баннер статьи" />
              </div>
              <div className="">
                <h4 className='font-bebas text-2xl text-neutal-white leading-none py-3 font-medium md:text-4xl'>{t.color_two}</h4>
                <button className='w-full bg-neutal-white text-neutal-black font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/color-two')}>
                  {t.btn_read}
                </button>
              </div>
            </div>

            <div className="stat-item stat-bottom col-span-1 md:col-span-2 xl:col-span-2">
              <div className="bg-assent-red  rounded-[10px]">
                <img src={a6} className='h-[175px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' alt="баннер статьи" />
              </div>
              <div className="">
                <h4 className='font-bebas text-2xl text-neutal-white leading-none py-3 font-medium md:text-4xl'>{t.color_three}</h4>
                <button className='w-full bg-neutal-white text-neutal-black font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/color-three')}>
                  {t.btn_read}
                </button>
              </div>
            </div>

            <div className="stat-item stat-right col-span-1 md:col-span-2 xl:col-span-3 flex flex-col h-full">
              <div className="bg-assent-red rounded-[10px] flex-shrink-0">
                <img 
                  src={a14} 
                  className='h-[175px] w-full rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[406px] 2xl:h-[550px]' 
                  alt="баннер статьи" 
                />
              </div>
              <div className="flex flex-col flex-grow pt-3">
                <h4 className='font-bebas text-2xl text-neutal-white leading-none font-medium md:text-4xl xl:text-7xl'>
                  {t.article_four}
                </h4>
                <div className="mt-auto pt-3">
                  <button className='w-full bg-neutal-white text-neutal-black font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/color-four')}>
                    {t.btn_read}
                  </button>
                </div>
              </div>
            </div>
   
        </section>

      </main>

      {/* Статьи о Типографике */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 gap-x-2.5 gap-y-5 md:grid-cols-4 xl:grid-cols-10  md:mx-5 py-5 xl:py-10`}>

            <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-black text-[64px] leading-none md:text-9xl '>
                {t.h2_typographic}
            </h2>

            <div className="stat-item stat-left col-span-1 md:col-span-2 xl:col-span-2">
              <div className="bg-neutal-black rounded-[10px]">
                <img src={a10} className='h-[175px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' alt="баннер статьи" />
              </div>
              <div className="">
                <h4 className='font-bebas text-2xl text-neutal-black leading-none py-3 font-medium md:text-4xl'>{t.typo_one}</h4>
                <button className='w-full bg-neutal-black text-neutal-white font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl'  onClick={()=>navigate('/t-one')}>
                  {t.btn_read}
                </button>
              </div>
            </div>

            <div className="stat-item stat-top col-span-1 md:col-span-2 xl:col-span-2 flex flex-col h-full">
              <div className="bg-neutal-black rounded-[10px] flex-shrink-0">
                <img 
                  src={a12} 
                  className='h-[175px] w-full rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' 
                  alt="баннер статьи" 
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h4 className='font-bebas text-2xl text-neutal-black leading-none py-3 font-medium md:text-4xl'>
                  {t.typo_two}
                </h4>
                <div className="">
                  <button className='w-full bg-neutal-black text-neutal-white font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl'  onClick={()=>navigate('/t-two')}>
                    {t.btn_read}
                  </button>
                </div>
              </div>
            </div>

            <div className="stat-item stat-bottom col-span-1 md:col-span-2 xl:col-span-3">
              <div className="bg-neutal-black  rounded-[10px]">
                <img src={a3} className='h-[175px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[406px] 2xl:h-[550px]' alt="баннер статьи" />
              </div>
              <div className="">
                <h4 className='font-bebas text-2xl text-neutal-black leading-none py-3 font-medium md:text-4xl'>{t.typo_three}</h4>
                <button className='w-full bg-neutal-black text-neutal-white font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/t-three')}>
                  {t.btn_read}
                </button>
              </div>
            </div>

            <div className="stat-item stat-top col-span-1 md:col-span-2 xl:col-span-2 xl:col-start-9 flex flex-col h-full">
              <div className="bg-neutal-black rounded-[10px] flex-shrink-0">
                <img 
                  src={a15} 
                  className='h-[175px] w-full rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' 
                  alt="баннер статьи" 
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h4 className='font-bebas text-2xl text-neutal-black leading-none py-3 font-medium md:text-4xl'>
                  {t.typo_four}
                </h4>
                <div className="">
                  <button className='w-full bg-neutal-black text-neutal-white font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl'  onClick={()=>navigate('/t-four')}>
                    {t.btn_read}
                  </button>
                </div>
              </div>
            </div>
        
      </section>

      {/* Статьи о Психологии */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-neutal-black px-2.5 grid grid-cols-2 gap-x-2.5 gap-y-5 md:grid-cols-4 xl:grid-cols-10 md:px-5 py-5 xl:py-10`}>

        <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-white text-[64px] leading-none md:text-9xl '>
                {t.h2_psychology}
        </h2>

        <div className="stat-item stat-left col-span-1 md:col-span-2 xl:col-span-2">
              <div className="bg-neutal-white rounded-[10px]">
                <img src={a13} className='h-[175px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' alt="баннер статьи" />
              </div>
              <div className="">
                <h4 className='font-bebas text-2xl text-neutal-white leading-none py-3 font-medium md:text-4xl'>{t.psycho_one}</h4>
                <button className='w-full bg-neutal-white text-neutal-black font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/p-one')}>
                  {t.btn_read}
                </button>
              </div>
        </div>

        <div className="stat-item stat-bottom col-span-1 md:col-span-2 xl:col-span-3">
              <div className="bg-neutal-white  rounded-[10px]">
                <img src={a16} className='h-[175px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[406px] 2xl:h-[550px]' alt="баннер статьи" />
              </div>
              <div className="">
                <h4 className='font-bebas text-2xl text-neutal-white leading-none py-3 font-medium md:text-4xl'>{t.psycho_two}</h4>
                <button className='w-full bg-neutal-white text-neutal-black font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/p-two')}>
                  {t.btn_read}
                </button>
              </div>
        </div>

        <div className="stat-item stat-top col-span-1 md:col-span-2 xl:col-span-2 flex flex-col h-full">
              <div className="bg-neutal-white rounded-[10px]">
                <img 
                  src={a4} 
                  className='h-[175px] w-full rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' 
                  alt="баннер статьи" 
                />
              </div>
              <div className="flex flex-col">
                <h4 className='font-bebas text-2xl text-neutal-white leading-none py-3 font-medium md:text-4xl'>
                  {t.typo_three}
                </h4>
                <div className="">
                  <button className='w-full bg-neutal-white text-neutal-black font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/p-three')}>
                    {t.btn_read}
                  </button>
                </div>
              </div>
        </div>

        <div className="stat-item stat-top col-span-1 md:col-span-2 xl:col-span-2 xl:col-start-9 flex flex-col h-full">
              <div className="bg-neutal-white rounded-[10px]">
                <img 
                  src={a2} 
                  className='h-[175px] w-full rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' 
                  alt="баннер статьи" 
                />
              </div>
              <div className="flex flex-col">
                <h4 className='font-bebas text-2xl text-neutal-white leading-none py-3 font-medium md:text-4xl'>
                  {t.psycho_four}
                </h4>
                <div className="">
                  <button className='w-full bg-neutal-white text-neutal-black font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/p-four')}>
                    {t.btn_read}
                  </button>
                </div>
              </div>
        </div>
             
      </section>

      {/* Статьи о Трендах */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 gap-x-2.5 gap-y-5 md:grid-cols-4 xl:grid-cols-10  md:mx-5 py-5 xl:py-10`}>

            <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-black text-[64px] leading-none md:text-9xl '>
                {t.h2_trend}
            </h2>

            <div className="stat-item stat-bottom col-span-1 md:col-span-2 xl:col-span-3">
              <div className="bg-neutal-black  rounded-[10px]">
                <img src={a11} className='h-[175px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[406px] 2xl:h-[550px]' alt="баннер статьи" />
              </div>
              <div className="">
                <h4 className='font-bebas text-2xl text-neutal-black leading-none py-3 font-medium md:text-4xl'>{t.trend_three}</h4>
                <button className='w-full bg-neutal-black text-neutal-white font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/trend-one')}>
                  {t.btn_read}
                </button>
              </div>
            </div>

            <div className="stat-item stat-left col-span-1 md:col-span-2 xl:col-span-2">
              <div className="bg-neutal-black rounded-[10px]">
                <img src={a9} className='h-[175px] rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' alt="баннер статьи" />
              </div>
              <div className="">
                <h4 className='font-bebas text-2xl text-neutal-black leading-none py-3 font-medium md:text-4xl'>{t.trend_one}</h4>
                <button className='w-full bg-neutal-black text-neutal-white font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/trend-two')}>
                  {t.btn_read}
                </button>
              </div>
            </div>

            <div className="stat-item stat-top col-span-1 md:col-span-2 xl:col-span-2 flex flex-col h-full">
              <div className="bg-neutal-black rounded-[10px] flex-shrink-0">
                <img 
                  src={a7} 
                  className='h-[175px] w-full rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' 
                  alt="баннер статьи" 
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h4 className='font-bebas text-2xl text-neutal-black leading-none py-3 font-medium md:text-4xl'>
                  {t.trend_two}
                </h4>
                <div className="">
                  <button className='w-full bg-neutal-black text-neutal-white font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/trend-three')}>
                    {t.btn_read}
                  </button>
                </div>
              </div>
            </div>

            <div className="stat-item stat-top col-span-1 md:col-span-2 xl:col-span-2 xl:col-start-9 flex flex-col h-full">
              <div className="bg-neutal-black rounded-[10px] flex-shrink-0">
                <img 
                  src={a8} 
                  className='h-[175px] w-full rounded-full object-cover md:h-[354px] lg:h-[482px] xl:h-[264px] 2xl:h-[360px]' 
                  alt="баннер статьи" 
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h4 className='font-bebas text-2xl text-neutal-black leading-none py-3 font-medium md:text-4xl'>
                  {t.trend_four}
                </h4>
                <div className="">
                  <button className='w-full bg-neutal-black text-neutal-white font-bebas text-lg h-[40px] rounded-xl md:h-[60px] md:text-2xl' onClick={()=>navigate('/trend-four')}>
                    {t.btn_read}
                  </button>
                </div>
              </div>
            </div>
        
      </section>

      <footer ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-neutal-black `}>
        <Footer
        language={language} 

        />
      </footer>
      
    </div>
  )
}

export default Articles

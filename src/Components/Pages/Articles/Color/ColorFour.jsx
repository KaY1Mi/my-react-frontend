import React, { useState, useEffect, useRef, useCallback } from 'react'
// импорт UI-компонентов
import HeaderBlack from '../../../HeaderBlack'
// импорт массива для перевода контента
import { translations } from '../../../translation'
import { useNavigate } from 'react-router-dom'
import  { useContext } from 'react';
import { LanguageContext } from '../../LanguageContext'; // Импортируем контекстm'

// импорт изображений 
import a1 from '../../../../Image/webp/articles/Ar_img/a1.jpg'
import a2 from '../../../../Image/webp/articles/Ar_img/a2.avif'
import a3 from '../../../../Image/webp/articles/Ar_img/a3.avif'
import a4 from '../../../../Image/webp/articles/Ar_img/a4.avif'
import a6 from '../../../../Image/webp/articles/Ar_img/a6.png'
import a7 from '../../../../Image/webp/articles/Ar_img/a7.webp'
import a8 from '../../../../Image/webp/articles/Ar_img/a8.jpg'
import a9 from '../../../../Image/webp/articles/Ar_img/a9.jpg'
import Footer from '../../../Footer'


const ColorOne = () => {
  const { language } = useContext(LanguageContext); // Получаем язык из контекста
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
                src={a1} 
                alt="" 
                className='min-h-[615px] w-full object-cover md:max-h-[720px] md:object-cover' 
                style={{ objectPosition: '70% 50%' }} 
            />
            <div className="absolute bottom-0 text-center left-0 bg-black bg-opacity-50 right-0 p-4">
                <h1 className="stat-item stat-top text-6xl font-bebas text-neutal-white md:text-7xl xl:text-[250px] 2xl:text-[350px] leading-none ">{t.article_color_h1}</h1>
            </div>
          </div>
          <div className="stat-item stat-left mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 md:mx-5">
            <h2 className=' tpt-5 col-span-full font-bebas text-xl md:text-2xl md:col-span-full lg:col-span-full lg:text-4xl xl:col-span-7 xl:text-5xl'>{t.article_color_h2}</h2>
          </div>
        </main>

        <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5`}> 

            <h2 className='stat-item stat-left pt-5 col-span-full font-bebas text-xl md:text-2xl md:col-span-full lg:col-span-full lg:text-3xl xl:col-span-7 xl:col-start-3 xl:text-5xl'>
                {t.article_color_h2_two}
            </h2>
            <h2 className='stat-item stat-right col-span-full font-bebas text-xl md:text-2xl md:col-span-full lg:col-span-full lg:text-3xl xl:col-span-full xl:text-5xl'>
                {t.article_color_h2_three}
            </h2>

            {/* Первое изображение - адаптация */}
            <img 
                src={a2} 
                alt="изображения" 
                className='hidden md:col-span-2 object-cover md:min-h-[400px] lg:col-span-3 lg:block lg:min-h-[500px] xl:min-h-[550px] stat-item stat-left' 
            />
            
            {/* Центральный блок с текстом - адаптация */}
            <div className="grid grid-cols-2 col-span-2 md:grid-cols-4 md:col-span-4">
                <h2 className='stat-item stat-top font-bebas text-5xl col-span-2 md:text-6xl md:col-span-4 lg:text-7xl xl:text-8xl'>
                    {t.article_color_h2_four}
                </h2>
                
                {/* Блоки с контентом - адаптация */}
                <div className="stat-item stat-left col-span-2 md:col-span-2">
                    <h3 className='text-2xl font-bebas text-neutal-black md:text-3xl lg:text-4xl'>
                        {t.article_color_h3_one}
                    </h3>
                    <p className='text-sm font-manrope text-neutal-grey md:text-base lg:text-lg'>
                        {t.article_color_p_one}
                    </p>
                </div>

                <div className="stat-item stat-left col-span-2 md:col-span-2">
                    <h3 className='text-2xl font-bebas text-neutal-black md:text-3xl lg:text-4xl'>
                        {t.article_color_h3_two}
                    </h3>
                    <p className='text-sm font-manrope text-neutal-grey md:text-base lg:text-lg'>
                        {t.article_color_p_two}
                    </p>
                </div>

                <div className="stat-item stat-right col-span-2 md:col-span-2">
                    <h3 className='text-2xl font-bebas text-neutal-black md:text-3xl lg:text-4xl'>
                        {t.article_color_h3_three}
                    </h3>
                    <p className='text-sm font-manrope text-neutal-grey md:text-base lg:text-lg'>
                        {t.article_color_p_three}
                    </p>
                </div>

                <div className="stat-item stat-right col-span-2 md:col-span-2">
                    <h3 className='text-2xl font-bebas text-neutal-black md:text-3xl lg:text-4xl'>
                        {t.article_color_h3_four}
                    </h3>
                    <p className='text-sm font-manrope text-neutal-grey md:text-base lg:text-lg'>
                        {t.article_color_p_four}
                    </p>
                </div>
            </div>


            <img 
                src={a3} 
                alt="изображения" 
                className='hidden md:col-span-2 min-h-[300px] object-cover md:min-h-[400px] lg:col-span-3 lg:min-h-[500px] lg:block xl:min-h-[550px] stat-item stat-right' 
            />
        </section>

        <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5`}> 

            <h2 className='stat-item stat-top pt-5 col-span-full font-bebas text-xl md:text-2xl md:col-span-full lg:col-span-full lg:text-3xl xl:col-span-7 xl:col-start-2 xl:text-7xl'>
                {t.article_color_h2_five}
            </h2>

            <img 
                src={a4} 
                alt="изображения" 
                className='сol-span-2 md:col-span-2 object-cover md:min-h-[400px] lg:col-span-3 lg:block lg:min-h-[500px] xl:min-h-[550px] stat-item stat-left' 
            />
            

            <div className="stat-item stat-top grid grid-cols-2 col-span-2">
                <div className="col-span-2 md:col-span-2">
                    <p className='text-sm font-manrope text-neutal-grey md:text-base lg:text-xl'>
                        {t.article_color_p_five}
                    </p>
                    <p className='pt-10 text-sm font-manrope text-neutal-grey md:text-base lg:text-xl lg:pt-[220px]'>
                        {t.article_color_p_five_two}
                    </p>
                </div>
            </div>

            <img 
                src={a1} 
                alt="изображения" 
                className='сol-span-full w-full md:col-span-3 min-h-[300px] object-cover md:min-h-[400px] lg:col-span-5 lg:min-h-[500px] lg:block xl:min-h-[550px] stat-item stat-right' 
            />
        </section>

<section
  ref={addToRefs}
  className={`${
    isMobile ? 'min-h-screen' : 'h-screen'
  } mx-2.5 grid grid-cols-1 gap-5 my-5 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-10 md:mx-5`}
>
  <h2 className="stat-item stat-top pt-5 col-span-full text-center font-bebas text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-7xl">
    {t.article_color_h2_six}
  </h2>

  <div className="stat-item stat-left col-span-full sm:col-span-2 md:col-span-3">
    <img src={a9} alt="Монохромная схема" className="w-full object-cover" />
    <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-neutral-black pt-2">
      {t.article_color_h3}
    </h3>
    <p className="font-manrope text-sm sm:text-base md:text-lg text-neutral-grey pt-2.5">
      {t.article_color_p}
    </p>
  </div>

  <div className="stat-item stat-top col-span-full sm:col-span-1 md:col-span-2">
    <img src={a6} alt="Монохромная схема" className="w-full object-cover" />
    <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-neutral-black pt-2">
      {t.article_color_h3_two_two}
    </h3>
    <p className="font-manrope text-sm sm:text-base md:text-lg text-neutral-grey pt-2.5">
      {t.article_color_p_two_two}
    </p>
  </div>

  <div className="stat-item stat-bottom col-span-full sm:col-span-1 md:col-span-2">
    <img src={a7} alt="Монохромная схема" className="w-full object-cover" />
    <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-neutral-black pt-2">
      {t.article_color_h3_three_three}
    </h3>
    <p className="font-manrope text-sm sm:text-base md:text-lg text-neutral-grey pt-2.5">
      {t.article_color_p_three_three}
    </p>
  </div>

  <div className="stat-item stat-right col-span-full sm:col-span-2 md:col-span-3">
    <img src={a8} alt="Монохромная схема" className="w-full object-cover" />
    <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-neutral-black pt-2">
      {t.article_color_h3_four_four}
    </h3>
    <p className="font-manrope text-sm sm:text-base md:text-lg text-neutral-grey pt-2.5">
      {t.article_color_p_four_four}
    </p>
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

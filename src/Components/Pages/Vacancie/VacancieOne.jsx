import React, { useCallback, useEffect, useRef, useState } from 'react'
import { translations } from '../../translation'
import HeaderBlack from '../../HeaderBlack';
import Footer from '../../Footer';
import {  useContext } from 'react';

import { LanguageContext } from '../LanguageContext'; // Импортируем контекст
// импорт изображений
import img1 from '../../../Image/webp/Vacancie/img1.webp'
import img2 from '../../../Image/webp/Vacancie/img2.jpg'
import img3 from '../../../Image/webp/Vacancie/img3.jpg'
import PopupVacancie from '../../PopupVacancie';



const VacancieOne = () => {

    // для перевода текста
    const { language } = useContext(LanguageContext); // Получаем язык из контекста

    const t = translations[language];

    // для плавного скролла
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionsRef = useRef([]);
    const scrollTimeout = useRef(null);

    const handleFeedBack = () => {
    console.log("the user responded to the vacancy");
    setShowLogoutModal(false);
    };

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
    <div className={`overflow-hidden bg-white ${isMobile ? 'overflow-y-auto' : 'h-screen'}`}>


      <main ref={addToRefs} className={`xl:h-screen`}>
            <HeaderBlack
            language={language} 

            />

            <section className={`mx-2.5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-10 md:mx-2.5`}>
                <div className="col-span-full grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-4 lg:grid-cols-4 pt-5 xl:grid-cols-10 xl:gap-5">

                    <img 
                    src={img2} 
                    alt="" 
                    className='stat-item stat-left col-span-1 h-[200px] md:col-span-2 lg:col-span-2 xl:col-span-5 md:h-[375px] sm:h-[250px] lg:h-[350px] xl:h-[375px] w-full object-cover rounded-[10px]' 
                    />
                    
                    <img 
                    src={img1} 
                    alt="" 
                    className='stat-item stat-right col-span-1 h-[200px] md:col-span-2 lg:col-span-2 xl:col-span-5 md:h-[375px] sm:h-[250px] lg:h-[350px] xl:h-[375px] w-full object-cover rounded-[10px]' 
                    style={{ objectPosition: '50% 20%' }} 
                    />

                    <h2 className='stat-item stat-top col-span-1 text-2xl md:col-span-2 lg:col-span-2 xl:col-span-5 font-bebas  text-neutal-black leading-none md:text-5xl lg:text-6xl xl:text-8xl'>
                    {t.h2_vac_one}
                    </h2>

                    <h3 className='stat-item stat-bottom col-span-1 text-xl pb-5 md:col-span-2 lg:col-span-2 xl:col-span-5 font-bebas font-thin text-neutal-grey leading-none md:text-4xl lg:text-5xl xl:text-6xl'>
                    {t.h3_vac_one}
                    </h3>                    
                </div>
            </section>

      </main>
    
      <section ref={addToRefs} className={`bg-black px-2.5 grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-10 py-5 md:px-5 xl:h-screen`}>
        <h2 className='stat-item stat-left col-span-1 pt-10 md:col-span-2 lg:col-span-2 xl:col-span-5 font-bebas text-neutal-white leading-none text-4xl md:text-5xl lg:text-6xl xl:text-8xl'>
            {t.h2_vac_vac}
        </h2>

        <h3 className='stat-item stat-left col-span-1 pt-10 md:col-span-2 lg:col-span-2 xl:col-span-full xl:col-start-6 font-bebas text-neutal-blue leading-none text-[32px] md:text-5xl lg:text-6xl xl:text-8xl'>
            {t.h4_vac_name}
        </h3>

        <h3 className='stat-item stat-left pt-5 col-span-2 md:col-span-2 md:self-end lg:col-span-2 xl:col-span-4 xl:self-auto font-bebas text-neutal-blue leading-none text-5xl lg:text-6xl xl:text-8xl'>
            {t.h3_vac_price}
        </h3>

        <div className="col-span-2 pt-5 md:col-span-2 md:col-start-3 lg:col-span-2 xl:col-span-4 xl:col-start-6">
          <h4 className='stat-item stat-right font-bebas text-2xl col-span-2 md:col-span-2 md:text-4xl lg:col-span-2 xl:col-span-6 xl:col-start-6 text-white'>{t.h5_vac}</h4>
          <ul className="stat-item stat-right list-inside space-y-5 pt-5 list-disc col-span-2 md:col-span-2 lg:col-span-2 xl:col-start-6 xl:col-span-4 ">
            <li className='font-manrope font-thin text-white text-[15px] md:text-base xl:text-xl'>{t.vac_list_one}</li>
            <li className='font-manrope font-thin text-white text-[15px] md:text-base xl:text-xl'>{t.vac_list_two}</li>
            <li className='font-manrope font-thin text-white text-[15px] md:text-base xl:text-xl'>{t.vac_list_three}</li>
            <li className='font-manrope font-thin text-white text-[15px] md:text-base xl:text-xl'>{t.vac_list_four}</li>
            <li className='font-manrope font-thin text-white text-[15px] md:text-base xl:text-xl'>{t.vac_list_five}</li>
            <li className='font-manrope font-thin text-white text-[15px] md:text-base xl:text-xl'>{t.vac_list_six}</li>  
          </ul>   
        </div>

        <img src={img3} className='hidden md:col-span-full stat-item stat-bottom w-full object-cover md:block rounded-[10px] h-[250px] lg:h-[350px]' alt="Место работы" style={{ objectPosition: '50% 55%' }} />         
                
      </section>

      <section ref={addToRefs} className={`bg-black px-2.5 grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-10 py-5 md:px-5 xl:h-screen`}>
        <h2 className='stat-item stat-left col-span-full pt-10 md:col-span-full lg:col-span-full xl:col-span-full font-bebas text-neutal-white leading-none text-4xl md:text-5xl lg:text-6xl xl:text-8xl'>
            {t.h2_vac_wish}
        </h2>

        <div className="stat-item stat-left col-span-1 h-[200px] px-[5px] py-2.5 border-b border-white md:col-span-2 md:h-[310px] flex flex-col justify-between xl:col-span-3 xl:stat-item xl:stat-left">
          <h3 className='font-bebas text-4xl text-neutal-blue md:text-6xl lg:text-7xl 2xl:text-8xl'>{t.h3_vac_wish_one}</h3>
          <p className='font-manrope text-sm text-neutal-white uppercase md:text-xl'>{t.p_vac_wish_one}</p>
        </div>

        <div className="stat-item stat-right col-span-1 h-[200px] px-[5px] py-2.5 border-b border-white md:col-span-2 md:h-[310px] flex flex-col justify-between xl:col-span-4 xl:stat-item xl:stat-top">
          <h3 className='font-bebas text-4xl text-neutal-blue md:text-6xl lg:text-7xl 2xl:text-8xl'>{t.h3_vac_wish_two}</h3>
          <p className='font-manrope text-sm text-neutal-white uppercase md:text-xl'>{t.p_vac_wish_two}</p>
        </div>

        <div className="stat-item stat-left col-span-1 h-[200px] px-[5px] py-2.5 border-b border-white md:col-span-2 md:h-[310px] flex flex-col justify-between xl:col-span-3 xl:stat-item xl:stat-right">
          <h3 className='font-bebas text-4xl text-neutal-blue md:text-6xl lg:text-7xl 2xl:text-8xl'>{t.h3_vac_wish_three}</h3>
          <p className='font-manrope text-sm text-neutal-white uppercase md:text-xl'>{t.p_vac_wish_three}</p>
        </div>   

        <div className="stat-item stat-right col-span-1 h-[200px] px-[5px] py-2.5 border-b border-white md:col-span-2 md:h-[310px] flex flex-col justify-between xl:col-span-3 xl:stat-item xl:stat-left">
          <h3 className='font-bebas text-4xl text-neutal-blue md:text-6xl lg:text-7xl 2xl:text-8xl'>{t.h3_vac_wish_four}</h3>
          <p className='font-manrope text-sm text-neutal-white uppercase md:text-xl'>{t.p_vac_wish_four}</p>
        </div>  

        <div className="stat-item stat-left col-span-1 h-[200px] px-[5px] py-2.5 border-b border-white md:col-span-2 md:h-[310px] flex flex-col justify-between xl:col-span-4 xl:stat-item xl:stat-top">
          <h3 className='font-bebas text-4xl text-neutal-blue md:text-6xl lg:text-7xl 2xl:text-8xl'>{t.h3_vac_wish_five}</h3>
          <p className='font-manrope text-sm text-neutal-white uppercase md:text-xl'>{t.p_vac_wish_five}</p>
        </div>  

        <div className="stat-item stat-right col-span-1 h-[200px] px-[5px] py-2.5 border-b border-white md:col-span-2 md:h-[310px] flex flex-col justify-between xl:col-span-3 xl:stat-item xl:stat-right">
          <h3 className='font-bebas text-4xl text-neutal-blue md:text-6xl lg:text-7xl 2xl:text-8xl'>{t.h3_vac_wish_six}</h3>
          <p className='font-manrope text-sm text-neutal-white uppercase md:text-xl'>{t.p_vac_wish_six}</p>
        </div>

        <button  onClick={() => setShowLogoutModal(true)} className='col-span-full w-full bg-white opacity-50 font-bebas rounded-[10px] h-[80px] text-2xl xl:text-3xl hover:bg-white hover:opacity-100 transition-all duration-500'>{t.btn_feedback}</button>  

      </section>

        {/* Модальное окно*/}
        {showLogoutModal && (
          <PopupVacancie 
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleFeedBack}
          />
        )}

      <footer ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-neutal-black `}  >
        <Footer
        language={language} 

        />
      </footer>
      
    </div>
  )
}

export default VacancieOne

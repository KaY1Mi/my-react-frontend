import React, { useCallback, useEffect, useRef, useState } from 'react'
import { translations } from '../translation'
import Header from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import {  useContext } from 'react';
import { LanguageContext } from './LanguageContext'; // Импортируем контекст
const Vacancies = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionsRef = useRef([]);
  const scrollTimeout = useRef(null);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext); // Get language first
  const t = translations[language]; // Then use it for translations

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
    <main ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-black py-5`}>
      <Header
        language={language} 

      />
      <section className='px-2.5 grid grid-cols-2 gap-5 md:grid-cols-4 md:mx-5 xl:grid-cols-10 xl:gap-5'>
        <h2 className='stat-item stat-top col-span-full text-center font-bebas text-4xl text-neutal-white pt-5 md:text-6xl lg:text-8xl xl:text-9xl'>{t.h2_vac}</h2>

        {/* Первая строка */}
        <div className="stat-item stat-left bg-white rounded-[10px] col-span-full p-2.5 grid grid-cols-2 md:grid-cols-4 md:px-2.5 md:py-5 xl:col-span-4 gap-2.5 h-full">
          <div className="contents">
            <h3 className='font-bebas text-3xl text-neutal-black col-span-1 md:col-span-2 md:text-4xl'>{t.h3_vac}</h3>
            <p className='font-manrope font-medium text-[13px] uppercase self-center text-right md:col-span-2 md:text-base'>{t.p_vac_name}</p>
            <h4 className='font-bebas text-2xl col-span-full'>{t.h4_price_one}</h4>
            <h5 className='font-manrope text-sm col-span-full md:text-base'>{t.h5_text_one}</h5>
            <button onClick={()=>navigate('/vacancie-one')} className='col-span-full bg-neutal-black text-neutal-white font-bebas text-xl min-h-[45px] rounded-[10px] mt-2.5 md:min-h-[55px] hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 transition-colors duration-200'>{t.btn_vac}</button>
          </div>
        </div>

        <div className="stat-item stat-top hidden xl:bg-white text-black xl:flex justify-center items-center font-bebas text-9xl xl:col-span-2 rounded-[10px] h-full">
          UX
        </div>

        {/* Вторая строка */}
        <div className="stat-item stat-right bg-white rounded-[10px] col-span-full p-2.5 grid grid-cols-2 md:grid-cols-4 md:px-2.5 md:py-5 xl:col-span-4 xl:col-start-7 gap-2.5 h-full">
          <div className="contents">
            <h3 className='font-bebas text-3xl text-neutal-black col-span-1 md:col-span-2 md:text-4xl'>{t.h3_vac}</h3>
            <p className='font-manrope font-medium text-[13px] uppercase self-center text-right md:col-span-2  md:text-base'>{t.p_vac_name_two}</p>
            <h4 className='font-bebas text-2xl col-span-full'>{t.h4_price_one_two}</h4>
            <h5 className='font-manrope text-sm col-span-full md:text-base'>{t.h5_text_one_two}</h5>
            <button onClick={()=>navigate('/vacancie-one')} className='col-span-full bg-neutal-black text-neutal-white font-bebas text-xl min-h-[45px] rounded-[10px] mt-2.5 md:min-h-[55px] hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 transition-colors duration-200'>{t.btn_vac}</button>
          </div>
        </div>

        {/* Третья строка */}
        <div className="stat-item stat-left bg-white rounded-[10px] col-span-full p-2.5 grid grid-cols-2 md:grid-cols-4 md:px-2.5 md:py-5 xl:col-span-4 gap-2.5 h-full">
          <div className="contents">
            <h3 className='font-bebas text-3xl text-neutal-black col-span-1 md:col-span-2 md:text-4xl'>{t.h3_vac}</h3>
            <p className='font-manrope font-medium text-[13px] uppercase self-center text-right md:col-span-2 md:text-base'>{t.p_vac_name_three}</p>
            <h4 className='font-bebas text-2xl col-span-full'>{t.h4_price_one_three}</h4>
            <h5 className='font-manrope text-sm col-span-full md:text-base'>{t.h5_text_one_three}</h5>
            <button onClick={()=>navigate('/vacancie-one')} className='col-span-full bg-neutal-black text-neutal-white font-bebas text-xl min-h-[45px] rounded-[10px] mt-2.5 md:min-h-[55px] hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 transition-colors duration-200'>{t.btn_vac}</button>
          </div>
        </div> 

        <div className="stat-item stat-top hidden xl:text-black bg-white xl:flex justify-center items-center font-bebas text-9xl xl:col-span-2 rounded-[10px] h-full">
          UI
        </div>

        {/* Четвертая строка */}
        <div className="stat-item stat-right bg-white rounded-[10px] col-span-full p-2.5 grid grid-cols-2 md:grid-cols-4 md:px-2.5 md:py-5 xl:col-span-4 xl:col-start-7 gap-2.5 h-full">
          <div className="contents">
            <h3 className='font-bebas text-3xl text-neutal-black col-span-1 md:col-span-2 md:text-4xl'>{t.h3_vac}</h3>
            <p className='font-manrope font-medium text-[13px] uppercase self-center text-right md:col-span-2  md:text-base'>{t.p_vac_name_two}</p>
            <h4 className='font-bebas text-2xl col-span-full'>{t.h4_price_one_two}</h4>
            <h5 className='font-manrope text-sm col-span-full md:text-base'>{t.h5_text_one_two}</h5>
            <button onClick={()=>navigate('/vacancie-one')} className='col-span-full bg-neutal-black text-neutal-white font-bebas text-xl min-h-[45px] rounded-[10px] mt-2.5 md:min-h-[55px] hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 transition-colors duration-200'>{t.btn_vac}</button>
          </div>
        </div>

      </section>
    </main>

    <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-black px-2.5 grid grid-cols-2 gap-5 md:grid-cols-4 md:px-5 xl:grid-cols-10 xl:gap-5 py-5`}>
      <h2 className='stat-item stat-top col-span-full text-center font-bebas text-4xl text-neutal-white pt-5 md:text-6xl lg:text-8xl xl:text-9xl self-center'>{t.h2_two_vac}</h2>

      {/* Первая строка */}
      <div className="stat-item stat-left bg-white rounded-[10px] col-span-full p-2.5 grid grid-cols-2 md:grid-cols-4 md:px-2.5  xl:col-span-4 gap-2.5 h-full max-h-[292px] self-end">
        <div className="contents">
          <h3 className='font-bebas text-3xl text-neutal-black col-span-1 md:col-span-2 md:text-4xl'>{t.h3_vac}</h3>
          <p className='font-manrope font-medium text-[13px] uppercase self-center text-right md:col-span-2 md:text-base'>{t.p_vac_name_five}</p>
          <h4 className='font-bebas text-2xl col-span-full'>{t.h4_price_one_five}</h4>
          <h5 className='font-manrope text-sm col-span-full md:text-base'>{t.h5_text_one_five}</h5>
          <button onClick={()=>navigate('/vacancie-five')} className='col-span-full bg-neutal-black text-neutal-white font-bebas text-xl min-h-[45px] rounded-[10px] mt-2.5 md:min-h-[55px] hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 transition-colors duration-200'>{t.btn_vac}</button>
        </div>
      </div>

      <div className="stat-item stat-top hidden xl:bg-white text-black xl:flex justify-center items-center font-bebas text-9xl xl:col-span-2 rounded-[10px] h-full max-h-[292px] self-end">
        UX
      </div>

      {/* Вторая строка */}
      <div className="stat-item stat-right bg-white rounded-[10px] col-span-full p-2.5 grid grid-cols-2 md:grid-cols-4 md:px-2.5  xl:col-span-4 xl:col-start-7 gap-2.5 h-full max-h-[292px] self-end">
        <div className="contents">
          <h3 className='font-bebas text-3xl text-neutal-black col-span-1 md:col-span-2 md:text-4xl'>{t.h3_vac}</h3>
          <p className='font-manrope font-medium text-[13px] uppercase self-center text-right md:col-span-2 md:text-base'>{t.p_vac_name_six}</p>
          <h4 className='font-bebas text-2xl col-span-full'>{t.h4_price_one_six}</h4>
          <h5 className='font-manrope text-sm col-span-full md:text-base'>{t.h5_text_one_six}</h5>
          <button onClick={()=>navigate('/vacancie-five')} className='col-span-full bg-neutal-black text-neutal-white font-bebas text-xl min-h-[45px] rounded-[10px] mt-2.5 md:min-h-[55px] hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 transition-colors duration-200'>{t.btn_vac}</button>
        </div>
      </div>

      {/* Третья строка */}
      <div className="stat-item stat-left bg-white rounded-[10px] col-span-full p-2.5 grid grid-cols-2 md:grid-cols-4 md:px-2.5  xl:col-span-4 gap-2.5 h-full max-h-[292px]">
        <div className="contents">
          <h3 className='font-bebas text-3xl text-neutal-black col-span-1 md:col-span-2 md:text-4xl'>{t.h3_vac}</h3>
          <p className='font-manrope font-medium text-[13px] uppercase self-center text-right md:col-span-2 md:text-base'>{t.p_vac_name_seven}</p>
          <h4 className='font-bebas text-2xl col-span-full'>{t.h4_price_one_seven}</h4>
          <h5 className='font-manrope text-sm col-span-full md:text-base'>{t.h5_text_one_seven}</h5>
          <button onClick={()=>navigate('/vacancie-five')} className='col-span-full bg-neutal-black text-neutal-white font-bebas text-xl min-h-[45px] rounded-[10px] mt-2.5 md:min-h-[55px] hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 transition-colors duration-200'>{t.btn_vac}</button>
        </div>
      </div> 

      <div className="stat-item stat-top hidden xl:text-black bg-white xl:flex justify-center items-center font-bebas text-9xl xl:col-span-2 rounded-[10px] h-full max-h-[292px]">
        UI
      </div>

      {/* Четвертая строка */}
      <div className="stat-item stat-right bg-white rounded-[10px] col-span-full p-2.5 grid grid-cols-2 md:grid-cols-4 md:px-2.5  xl:col-span-4 xl:col-start-7 gap-2.5 h-full max-h-[292px]">
        <div className="contents">
          <h3 className='font-bebas text-3xl text-neutal-black col-span-1 md:col-span-2 md:text-4xl'>{t.h3_vac}</h3>
          <p className='font-manrope font-medium text-[13px] uppercase self-center text-right md:col-span-2 md:text-base'>{t.p_vac_name_eight}</p>
          <h4 className='font-bebas text-2xl col-span-full'>{t.h4_price_one_eight}</h4>
          <h5 className='font-manrope text-sm col-span-full md:text-base'>{t.h5_text_one_eight}</h5>
          <button onClick={()=>navigate('/vacancie-five')} className='col-span-full bg-neutal-black text-neutal-white font-bebas text-xl min-h-[45px] rounded-[10px] mt-2.5 md:min-h-[55px] hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 transition-colors duration-200'>{t.btn_vac}</button>
        </div>
      </div>
    </section>


    <footer ref={addToRefs} className={` bg-neutal-black ${isMobile ? 'min-h-screen' : 'h-screen'}`}>
        <Footer
        language={language} 

        />
    </footer>

  </div>
)
}

export default Vacancies

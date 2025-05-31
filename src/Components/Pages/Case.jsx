import React, { useCallback, useEffect, useRef, useState } from 'react'
import { translations } from '../translation'
import HeaderBlack from '../HeaderBlack';
import Footer from '../Footer';
import  { useContext } from 'react';
import { LanguageContext } from './LanguageContext'; // Импортируем контекст
// импорт для секции кейсов
import case1 from '../../Image/webp/case1.webp'
import case2 from '../../Image/webp/case2.webp'
import case3 from '../../Image/webp/case3.webp'
import case4 from '../../Image/webp/case4.webp'
import case5 from '../../Image/webp/case5.webp'
import case6 from '../../Image/webp/Cases/sport1.webp'
import case7 from '../../Image/webp/Cases/sport2.webp'
import case8 from '../../Image/webp/Cases/sport3.webp'
import case9 from '../../Image/webp/Cases/sport4.webp'
import case10 from '../../Image/webp/Cases/sport5.webp'
import case11 from '../../Image/webp/Cases/it1.webp'
import case12 from '../../Image/webp/Cases/it2.webp'
import case13 from '../../Image/webp/Cases/it3.webp'
import case14 from '../../Image/webp/Cases/it4.webp'
import case15 from '../../Image/webp/Cases/it5.webp'
import case16 from '../../Image/webp/Cases/cosm1.webp'
import case17 from '../../Image/webp/Cases/cosm2.webp'
import case18 from '../../Image/webp/Cases/cosm3.webp'
import case19 from '../../Image/webp/Cases/cosm4.webp'
import case20 from '../../Image/webp/Cases/cosm5.webp'
import case21 from '../../Image/webp/Cases/house1.webp'
import case22 from '../../Image/webp/Cases/house2.webp'
import case23 from '../../Image/webp/Cases/house3.webp'
import case24 from '../../Image/webp/Cases/house4.webp'
import case25 from '../../Image/webp/Cases/house5.webp'
import case26 from '../../Image/webp/Cases/art1.webp'
import case27 from '../../Image/webp/Cases/art2.webp'
import case28 from '../../Image/webp/Cases/art3.webp'
import case29 from '../../Image/webp/Cases/art4.webp'
import case30 from '../../Image/webp/Cases/art5.webp'



const Case = () => {

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
    

  return (
    <div className={`overflow-hidden bg-white ${isMobile ? 'overflow-y-auto' : 'h-screen'}`}>

      {/* Лучшие кейсы */}
      <main ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'}`}>
        <HeaderBlack
        language={language} 

        />

      <section className={`mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 md:mx-5`}>
                
        <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-black text-[64px] leading-none md:text-9xl '>
          {t.h2_course}
        </h2>
          
        <div className="col-span-full grid grid-cols-2 gap-5 md:grid-cols-4 pt-5 xl:grid-cols-10">
        
                  <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
                    <img src={case1} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
                    <a href="https://www.behance.net/gallery/199580153/Hem-E-commerce-Redesign-Concept" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_one}
                    </a>
                  </div>
        
                  <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
                    <img src={case2} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
                    <a href="https://www.behance.net/gallery/200020317/Digital-agency-OUI-WILL" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_two}
                    </a>
                  </div>
        
                  <div className="stat-item stat-top col-span-2  md:col-span-4 self-start xl:col-span-2">
                    <img src={case3} alt="Баннер Кейса" className='rounded-xl object-cover mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] w-full xl:h-[450px]' />
                    <a href="https://www.behance.net/gallery/210419119/ZEEKR-CORPORATE-WEBSITE-REDESIGN-CONCEPT" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_three}
                    </a>
                  </div>
        
                  <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
                    <img src={case4} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
                    <a href="https://www.behance.net/gallery/216792215/CALIFORNIA-PHILADELPHIA-POSTER-COLECCTION" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_four}
                    </a>
                  </div>
        
                  <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
                    <img src={case5} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
                    <a href="https://www.behance.net/gallery/179501005/poster-collection-vol1" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_five}
                    </a>
                  </div>
        
        </div>
      
      </section>

        
      </main>

      {/* Кейсы о Спорте */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5`}>
                
        <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-black text-[64px] leading-none md:text-9xl '>
          {t.h2_sport}
        </h2>
          
        <div className="col-span-full grid grid-cols-2 gap-5 md:grid-cols-4 pt-5 xl:grid-cols-10">
        
                  <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
                    <img src={case6} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
                    <a href="https://www.behance.net/gallery/205876065/Barcelona-Padel" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_six}
                    </a>
                  </div>
        
                  <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
                    <img src={case7} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
                    <a href="https://www.behance.net/gallery/210460375/CANYON-brand-Website-redesign" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_seven}
                    </a>
                  </div>
        
                  <div className="stat-item stat-top col-span-2  md:col-span-4 self-start xl:col-span-2">
                    <img src={case8} alt="Баннер Кейса" className='rounded-xl object-cover mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] w-full xl:h-[450px]' />
                    <a href="https://www.behance.net/gallery/201933693/GNU-E-commerce-redesign" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_eight}
                    </a>
                  </div>
        
                  <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
                    <img src={case9} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
                    <a href="https://www.behance.net/gallery/206897535/DOPE-e-commerce-website-redesign" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_nine}
                    </a>
                  </div>
        
                  <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
                    <img src={case10} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
                    <a href="https://www.behance.net/gallery/204919433/ZEN-Mobile-App-for-Fitness-and-Well-being" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_ten}
                    </a>
                  </div>
        
        </div>
        
                
      </section>

      {/* Кейсы об IT */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5`}>
                
        <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-black text-[64px] leading-none md:text-9xl '>
          {t.h2_IT}
        </h2>
          
        <div className="col-span-full grid grid-cols-2 gap-5 md:grid-cols-4 pt-5 xl:grid-cols-10">
        
                  <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
                    <img src={case11} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
                    <a href="https://www.behance.net/gallery/220626753/IZUM-Digital-agency" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_eleven}
                    </a>
                  </div>
        
                  <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
                    <img src={case13} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
                    <a href="https://www.behance.net/gallery/222675911/Aiscreen-AI-Service-Landing-page" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_twelve}
                    </a>
                  </div>
        
                  <div className="stat-item stat-top col-span-2  md:col-span-4 self-start xl:col-span-2">
                    <img src={case14} alt="Баннер Кейса" className='rounded-xl object-cover mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] w-full xl:h-[450px]' />
                    <a href="https://www.behance.net/gallery/199289275/Corporate-site-Performance" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_thirteen}
                    </a>
                  </div>
        
                  <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
                    <img src={case12} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
                    <a href="https://www.behance.net/gallery/219182515/Infographic-Posters" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_fourteen}
                    </a>
                  </div>
        
                  <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
                    <img src={case15} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
                    <a href="https://www.behance.net/gallery/182210997/-JOBNY-Mobile-App-Job-Search-Service" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.case_fifteen}
                    </a>
                  </div>
        
        </div>
        
                
      </section>

      {/* Кейсы о Косметике */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5`}>
                
        <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-black text-[64px] leading-none md:text-9xl '>
          {t.h2_cosmetics}
        </h2>
          
        <div className="col-span-full grid grid-cols-2 gap-5 md:grid-cols-4 pt-5 xl:grid-cols-10">
        
                  <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
                    <img src={case16} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
                    <a href="https://www.behance.net/gallery/218863685/Sparkling-Secrets-E-commerce" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.cosm_one}
                    </a>
                  </div>
        
                  <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
                    <img src={case17} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
                    <a href="https://www.behance.net/gallery/190562223/ESTEE-LAUDER-COMPANIES-Corporate-redesign" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.cosm_two}
                    </a>
                  </div>
        
                  <div className="stat-item stat-top col-span-2  md:col-span-4 self-start xl:col-span-2">
                    <img src={case18} alt="Баннер Кейса" className='rounded-xl object-cover mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] w-full xl:h-[450px]' />
                    <a href="https://www.behance.net/gallery/194755309/Place-des-Lices-E-commerce-Redesign" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.cosm_three}
                    </a>
                  </div>
        
                  <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
                    <img src={case19} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
                    <a href="https://www.behance.net/gallery/180674509/ILIA-E-commerce-Redesign" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.cosm_four}
                    </a>
                  </div>
        
                  <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
                    <img src={case20} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
                    <a href="https://www.behance.net/gallery/172407777/BINU-BINU-E-COMMERCE" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
                      {t.cosm_five}
                    </a>
                  </div>
        
        </div>
                
      </section>

      {/* Кейсы о Недвижимости */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5`}>
                
        <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-black text-[64px] leading-none md:text-9xl '>
           {t.h2_house}
        </h2>
          
        <div className="col-span-full grid grid-cols-2 gap-5 md:grid-cols-4 pt-5 xl:grid-cols-10">
        
        <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
          <img src={case21} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
          <a href="https://www.behance.net/gallery/219775113/CLOUDBOOK-Travel-service-design-concept" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.house_one}
          </a>
        </div>

        <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
          <img src={case22} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
          <a href="https://www.behance.net/gallery/194291633/EVA-CORPORATE-WEBSITE-REDESIGN" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.house_two}
          </a>
        </div>

        <div className="stat-item stat-top col-span-2  md:col-span-4 self-start xl:col-span-2">
          <img src={case23} alt="Баннер Кейса" className='rounded-xl object-cover mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] w-full xl:h-[450px]' />
          <a href="https://www.behance.net/gallery/203448087/PAUL-CONRAD-ARCHITECTS-Corporate-website" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.house_three}
          </a>
        </div>

        <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
          <img src={case24} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
          <a href="https://www.behance.net/gallery/194346405/E-commerce-Redisign-HVLG" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.house_four}
          </a>
        </div>

        <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
          <img src={case25} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
          <a href="https://www.behance.net/gallery/181591717/RRA-Corporate-Redesign" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.house_five}
          </a>
        </div>

        </div>
        
                
      </section>

      {/* Кейсы об Искусстве */}
      <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5`}>
                
        <h2 className='stat-item stat-top col-span-full font-bebas pt-5 text-neutal-black text-[64px] leading-none md:text-9xl '>
          {t.h2_art}
        </h2>
          
        <div className="col-span-full grid grid-cols-2 gap-5 md:grid-cols-4 pt-5 xl:grid-cols-10">
        
        <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
          <img src={case26} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
          <a href="https://www.behance.net/gallery/195905339/MoMa-Corporate-website-redesign" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.art_one}
          </a>
        </div>

        <div className="stat-item stat-left col-span-1 md:col-span-2 self-start">
          <img src={case27} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
          <a href="https://www.behance.net/gallery/190823515/Mystery-Mythology-Poster-Collection-II" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.art_two}
          </a>
        </div>

        <div className="stat-item stat-top col-span-2  md:col-span-4 self-start xl:col-span-2">
          <img src={case30} alt="Баннер Кейса" className='rounded-xl object-cover mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] w-full xl:h-[450px]' />
          <a href="https://www.behance.net/gallery/202644729/AZUKI-Corporate-Redesign-concept" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.art_three}
          </a>
        </div>

        <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
          <img src={case29} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[550px] object-cover' />
          <a href="https://www.behance.net/gallery/202395223/MSUB-museum" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.art_four}
          </a>
        </div>

        <div className="stat-item stat-right col-span-1  md:col-span-2 self-start">
          <img src={case28} alt="Баннер Кейса" className='rounded-xl mb-2.5 h-[175px] md:h-[354px] lg:h-[482px] xl:h-[650px] object-cover' />
          <a href="https://www.behance.net/gallery/204812351/TADAO-ANDO-landing" className='text-3xl font-medium md:text-4xl font-bebas  text-neutal-black underline underline-offset-4'>
            {t.art_five}
          </a>
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

export default Case

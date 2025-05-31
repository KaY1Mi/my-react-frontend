import React, { useCallback, useEffect, useRef, useState } from 'react'
import { translations } from '../translation'
import Header from '../Header';
import Footer from '../Footer';

import {  useContext } from 'react';

import { LanguageContext } from './LanguageContext'; // Импортируем контекст





const UsefulPage = () => {
    const { language } = useContext(LanguageContext); // Получаем язык из контекста
    // для перевода текста
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
    <div className={`overflow-hidden ${isMobile ? 'overflow-y-auto' : 'h-screen'}`}>


        <main ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-neutal-black py-5`}>

        <Header
        language={language} 

        />

        <section className={`mx-2.5 grid grid-cols-2 gap-x-2.5 gap-y-5 md:grid-cols-4 xl:grid-cols-10 md:mx-5`}>
                
            <h1 className='stat-item stat-top col-span-full text-center font-bebas pt-10 text-neutal-white text-4xl leading-none md:text-8xl 2xl:text-9xl'>
                {t.h1_useful}
            </h1>

            <h2 className='stat-item stat-top col-span-full text-center font-manrope text-neutal-white text-sm leading-none md:text-xl md:uppercase '>
                {t.h2_useful}
            </h2>

            <div className="col-span-full grid grid-cols-2 gap-5 md:grid-cols-4 pt-5 xl:grid-cols-10">

                <h3 className='stat-item stat-top col-span-full font-bebas text-neutal-blue text-center leading-none text-4xl'>{t.h3_useful}</h3>

                {/* Фотографии */}
                <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3 ">
                    <h4 className='font-manrope text-neutal-blue uppercase font-light text-xl tracking-wide p-2.5 border-b '>{t.h4_useful_one}</h4>

                    <a href="https://unsplash.com/">
                        <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_useful_one}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_useful_one_title}</p>
                    </a>

                    <a href="https://www.freepik.com/">
                        <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_useful_two}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_useful_two_title}</p>
                    </a>

                    <a href="https://www.reshot.com/">
                        <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_useful_three}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_useful_three_title}</p>
                    </a>

                    <a href="https://www.rgbstock.com/">
                        <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_useful_four}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_useful_four_title}</p>
                    </a>
                </div>

                {/* Шрифты */}
                <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-4">
                    <h4 className='font-manrope text-neutal-blue uppercase font-light text-xl tracking-wide p-2.5 border-b '>{t.h4_useful_two}</h4>

                    <a href="https://www.fonts.uprock.ru/">
                        <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_fonts_one}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_fonts_one_title}</p>
                    </a>

                    <a href="https://fonts.google.com/">
                        <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_fonts_two}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_fonts_two_title}</p>
                    </a>

                    <a href="https://www.fontshare.com/">
                        <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_useful_three}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_useful_three_title}</p>
                    </a>

                    <a href="https://www.rufonts.ru/">
                        <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_fonts_four}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_fonts_four_title}</p>
                    </a>
                </div>

                {/* Иконки */}
                <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3">
                    <h4 className='font-manrope text-neutal-blue uppercase font-light text-xl tracking-wide p-2.5 border-b '>{t.h4_useful_three}</h4>

                    <a href="https://www.flaticon.com/">
                        <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_icon_one}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_icon_one_title}</p>
                    </a>

                    <a href="https://iconer.app/">
                        <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_icon_two}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_icon_two_title}</p>
                    </a>

                    <a href="https://fonts.google.com/icons">
                        <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_icon_three}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_icon_three_title}</p>
                    </a>

                    <a href="https://icons8.com/">
                        <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_icon_four}</p>
                        <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_icon_four_title}</p>
                    </a>
                </div>

            </div>

        
        </section>

        </main>

        <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} mx-2.5 grid grid-cols-2 gap-x-2.5 gap-y-5 md:grid-cols-4 xl:grid-cols-10 py-5 md:px-5 self-center`}>

           <h3 className='stat-item stat-top col-span-full font-bebas text-neutal-black text-center leading-none text-4xl mt-auto'>{t.h3_useful_two}</h3>

                    {/* Изображения и видео */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3 ">
                        <h4 className='font-manrope text-neutal-black uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-black '>{t.h4_ii}</h4>

                        <a href="https://endlesstools.io/">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_ii_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_ii_one_title}</p>
                        </a>

                        <a href="https://www.krea.ai/home">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_ii_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_ii_two_title}</p>
                        </a>

                        <a href="https://pika.art/login">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_ii_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_ii_three_title}</p>
                        </a>

                    </div>

                    {/* Генерация текста */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-4">
                        <h4 className='font-manrope text-neutal-black uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-black '>{t.h4_text}</h4>

                        <a href="https://chat.openai.com/chat">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_text_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_text_one_title}</p>
                        </a>

                        <a href="https://ya.ru/ai/gpt">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_text_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_text_two_title}</p>
                        </a>

                        <a href="https://www.copymonkey.app/">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_text_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_text_three_title}</p>
                        </a>

                    </div>

                    {/* Другое */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3">
                        <h4 className='font-manrope text-neutal-black uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-black '>{t.h4_other}</h4>

                        <a href="https://www.prezo.ai/">
                            <p className='font-bebas text-neutal-black font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_other_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_other_one_title}</p>
                        </a>

                        <a href="https://www.khroma.co/">
                            <p className='font-bebas text-neutal-black font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_other_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_other_two_title}</p>
                        </a>

                        <a href="https://www.topazlabs.com/topaz-video-ai">
                            <p className='font-bebas text-neutal-black font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_other_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_other_three_title}</p>
                        </a>

                    </div>

                     {/* ИИ-плагины Figma */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3">
                        <h4 className='font-manrope text-neutal-black uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-black'>{t.h4_Figma}</h4>

                        <a href="https://www.figma.com/community/plugin/1197517744665935378/jis-ai">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_figma_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_figma_one_title}</p>
                        </a>

                        <a href="https://www.figma.com/community/plugin/1184110746118034942/magicopy-ai-text-generator">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_figma_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_figma_two_title}</p>
                        </a>

                        <a href="https://www.figma.com/community/plugin/1228969298040149016/wireframe-designer">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_figma_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_figma_three_title}</p>
                        </a>

                    </div>

                    {/* Для команды */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-4">
                        <h4 className='font-manrope text-neutal-black uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-black'>{t.h4_team}</h4>

                        <a href="https://miro.com/research-and-design/ux/">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_team_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_team_one_title}</p>
                        </a>

                        <a href="https://datamask.tech/editor">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_team_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_team_two_title}</p>
                        </a>

                        <a href="https://www.framer.com/gallery/">
                            <p className='font-bebas text-neutal-black text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_team_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_team_three_title}</p>
                        </a>


                    </div>

                    {/*Генерация Градиентов */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3">
                        <h4 className='font-manrope text-neutal-black uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-black'>{t.h4_gradient}</h4>

                        <a href="https://hihayk.github.io/scale/#4/6/50/80/-51/67/20/14/1D9A6C/29/154/108/white">
                            <p className='font-bebas text-neutal-black font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_gradient_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_gradient_one_title}</p>
                        </a>

                        <a href="https://jwenjian.github.io/gradex/">
                            <p className='font-bebas text-neutal-black font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_gradient_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_gradient_two_title}</p>
                        </a>

                        <a href="https://colinkeany.com/blend/">
                            <p className='font-bebas text-neutal-black font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_gradient_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-black xl:text-base'>{t.p_gradient_three_title}</p>
                        </a>

                    </div>                 
               
        </section>
        {/* не сделаны нормальные ссылки */}
        <section ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-neutal-black px-2.5 grid grid-cols-2 gap-x-2.5 gap-y-5 md:grid-cols-4 xl:grid-cols-10 py-5 md:px-5 self-center`}>

           <h3 className='stat-item stat-top col-span-full font-bebas text-neutal-blue text-center leading-none text-4xl mt-auto'>{t.h3_useful_three}</h3>

                    {/* Подбор цвета */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3 ">
                        <h4 className='font-manrope text-neutal-blue uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-white '>{t.h4_Color}</h4>

                        <a href="https://color.adobe.com/ru/create/color-wheel">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_Color_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_Color_one_title}</p>
                        </a>

                        <a href="https://coolors.co/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_Color_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_Color_two_title}</p>
                        </a>

                        <a href="https://colors.dopely.top/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_Color_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_Color_three_title}</p>
                        </a>

                    </div>

                    {/* Инфографика */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-4">
                        <h4 className='font-manrope text-neutal-blue uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-white '>{t.h4_info}</h4>

                        <a href="https://developers.google.com/chart?hl=ru">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_info_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_info_one_title}</p>
                        </a>

                        <a href="https://www.canva.com/ru_ru/sozdat/infografika/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_info_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_info_two_title}</p>
                        </a>

                        <a href="https://piktochart.com/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_info_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_info_three_title}</p>
                        </a>

                    </div>

                    {/* Прототипирование */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3">
                        <h4 className='font-manrope text-neutal-blue uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-white '>{t.h4_proto}</h4>

                        <a href="https://helpx.adobe.com/ru/support/xd.html">
                            <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_proto_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_proto_one_title}</p>
                        </a>

                        <a href="https://miro.com/ru/">
                            <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_proto_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_proto_two_title}</p>
                        </a>

                        <a href="https://marvelapp.com/">
                            <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_proto_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_proto_three_title}</p>
                        </a>

                    </div>

                     {/* Вдохновение */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3">
                        <h4 className='font-manrope text-neutal-blue uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-white'>{t.h4_inspiration}</h4>

                        <a href="https://www.awwwards.com/websites/sites_of_the_day/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_inspiration_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_inspiration_one_title}</p>
                        </a>

                        <a href="https://www.behance.net/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_inspiration_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_inspiration_two_title}</p>
                        </a>

                        <a href="https://dribbble.com/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_inspiration_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_inspiration_three_title}</p>
                        </a>

                    </div>

                    {/* Игры */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-4">
                        <h4 className='font-manrope text-neutal-blue uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-white'>{t.h4_game}</h4>

                        <a href="https://bezier.method.ac/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_game_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-whitek xl:text-base'>{t.p_game_one_title}</p>
                        </a>

                        <a href="https://shape.method.ac/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_game_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_game_two_title}</p>
                        </a>

                        <a href="https://cantunsee.space/">
                            <p className='font-bebas text-neutal-white text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_game_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_game_three_title}</p>
                        </a>


                    </div>

                    {/* Фриланс-биржи */}
                    <div className="stat-item stat-left col-span-2 pt-5 md:col-span-2 xl:col-span-3">
                        <h4 className='font-manrope text-neutal-blue uppercase font-light text-xl tracking-wide p-2.5 border-b border-neutal-white'>{t.h4_freelance}</h4>

                        <a href="https://www.upwork.com/">
                            <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_freelance_one}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_freelance_one_title}</p>
                        </a>

                        <a href="https://www.freelancer.com.ru/">
                            <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_freelance_two}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_freelance_two_title}</p>
                        </a>

                        <a href="https://dribbble.com/jobs">
                            <p className='font-bebas text-neutal-white font-light text-2xl tracking-wide p-2.5 hover:text-assent-red'>{t.p_freelance_three}</p>
                            <p className='font-manrope text-neutal-grey font-light text-sm tracking-wide px-2.5 pb-2.5 border-b border-neutal-white xl:text-base'>{t.p_freelance_three_title}</p>
                        </a>

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

export default UsefulPage

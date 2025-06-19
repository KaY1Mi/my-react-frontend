import React, { useEffect, useState } from 'react'
import { translations } from '../../../translation'
import HeaderBlack from '../../../HeaderBlack';
import Footer from '../../../Footer';
import {  useContext } from 'react';
import { LanguageContext } from '../../LanguageContext'; // Импортируем контекст
import figma_main from '../../../../Image/webp/Course/Figma/figma_main.jpg'
import { useNavigate } from 'react-router-dom';

const ProLesson3 = () => {
    const navigate = useNavigate()
// для перевода текста
const { language } = useContext(LanguageContext); // Получаем язык из контекста

    const t = translations[language];

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
        <div>
            <main className='h-screen'>
                <HeaderBlack
                language={language} 

                />
                <div className = {`grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 xl:my-5`}>
                    <img src={figma_main} alt="Гифка Figma" className='w-full col-span-full h-[450px] object-cover md:h-[700px]' />
                    <p className='stat-item stat-left pt-7 text-base font-manrope col-span-full mx-2.5 md:pt-5 md:text-lg lg:text-xl lg:pt-10 xl:col-span-6 xl:pt-10'>{t.f_lesson_p}</p>
                   
                </div>
            </main>

            <section class="mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5">
                <h2 className='stat-item stat-top col-span-full font-bebas text-6xl md:text-7xl lg:text-8xl'>{t.f_l_h2}</h2>
                <div className="col-span-full">

                    <div className="stat-item stat-left flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
                        <h3 className='text-4xl font-bebas'>{t.f_l_h3_one}</h3>
                        <p className='text-sm font-manrope pt-5 text-neutal-grey md:text-lg lg:text-xl xl:pt-0 xl:w-[60%]'>
                            {t.f_l_p_one}
                        </p>
                    </div>

                    <div className="stat-item stat-right flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
                        <h3 className='text-4xl font-bebas'>{t.f_l_h3_two}</h3>
                        <p className='text-sm font-manrope pt-5 text-neutal-grey md:text-lg lg:text-xl xl:pt-0 xl:w-[60%]'>
                            {t.f_l_p_two}
                        </p>
                    </div>

                    <div className="stat-item stat-bottom flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
                        <h3 className='text-4xl font-bebas'>{t.f_l_h3_three}</h3>
                        <ul className='pt-5 list-disc list-inside space-y-2 xl:pt-0 xl:w-[60%]'>
                           <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.f_l_list_one}</li>
                           <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.f_l_list_two}</li>
                           <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.f_l_list_three}</li>
                           <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.f_l_list_four}</li>
                        </ul>
                    </div>

                </div>
            </section>

            <section class="mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5">
                <h2 className='stat-item stat-top col-span-full font-bebas text-6xl md:text-7xl lg:text-8xl'>{t.f_l_h2_h2}</h2>
                <div className="relative w-full pt-[56.25%] col-span-full">
  <iframe
    src="https://rutube.ru/play/embed/5dd33587d9d8bbf13bc0204a919cbf03/"
    className="absolute top-0 left-0 w-full h-full"
    frameBorder="0"
    allow="clipboard-write; autoplay"
    webkitAllowFullScreen
    mozAllowFullScreen
    allowFullScreen
    title="Figma Lesson Video"
  ></iframe>
</div>

                <button className='stat-item stat-bottom text-2xl mt-5 font-bebas bg-black text-white w-full col-span-full rounded-[10px] h-[70px] md:h-[100px] md:text-3xl ' onClick={()=>navigate('/figma-lesson-two')}>{t.f_btn_2}</button>
            </section>
            
            <footer  className={`bg-neutal-black`}>
                <Footer
                language={language} 

                />
            </footer>

        </div>
  )
}

export default ProLesson3

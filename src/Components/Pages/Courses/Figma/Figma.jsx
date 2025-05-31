import React, { useCallback, useEffect, useRef, useState } from 'react'
import { translations } from '../../../translation'
import Footer from '../../../Footer';
import HeaderBlack from '../../../HeaderBlack';
import figma_main from '../../../../Image/webp/Course/Figma/figma_main.jpg'

import { useNavigate } from 'react-router-dom';
import  {  useContext } from 'react';

import { LanguageContext } from '../../LanguageContext'; // Импортируем контекст
const Figma = () => {
  const navigate = useNavigate()
// для перевода текста
const { language } = useContext(LanguageContext); // Получаем язык из контекста

    const t = translations[language];

// для плавного скролла


;
 
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
    <div className={`bg-white `}>
         <main>
            <HeaderBlack
            language={language} 

            />
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 xl:my-5 ">
                <img src={figma_main} alt="Гифка Figma" className='w-full col-span-full h-[450px] object-cover md:h-[700px]' />
                <p className='stat-item stat-left pt-7 text-base font-manrope col-span-full mx-2.5 md:pt-5 md:text-lg lg:text-2xl lg:pt-10 xl:col-span-6 xl:pt-10'>{t.figma_p}</p>
                <button className='stat-item stat-right h-[70px] bg-black text-2xl font-bebas text-white rounded-[10px] col-span-full mx-2.5 mt-7 md:min-h-[85px] md:mt-5 lg:mt-10 lg:text-3xl lg:min-h-[100px] xl:col-span-4 xl:mt-10' onClick={()=>navigate('/figma-lesson-one')}>{t.figma_btn}</button>
            </div>

         </main>

         <section className={`grid grid-cols-2 gap-5 mx-2.5 md:grid-cols-4 md:gap-5 xl:grid-cols-10 xl:h-screen my-5`} >
            <h2 className='stat-item stat-top col-span-full text-7xl font-bebas text-neutal-blue md:cold-span-3 xl:col-span-5 xl:pt-10'>{t.figma_section1_h2}</h2>
            <p className=' stat-item stat-right col-span-full text-sm font-manrope text-neutal-black md:col-span-3 lg:text-xl xl:col-span-full xl:pt-10'>{t.figma_section1_p_one}</p>

            <div className="stat-item stat-left col-span-1 h-[300px] bg-neutal-black rounded-[10px] p-2.5 flex flex-col justify-between md:col-span-2 md:p-5 md:h-[450px] lg:col-span-1 lg:h-[575px] xl:col-span-2">
                <div className="">
                    <p className='text-neutal-grey text-sm font-manrope md:text-xl'>{t.figma_card_one_lesson}</p>
                    <h3 className='text-neutal-blue text-2xl font-bebas md:text-4xl'>{t.figma_card_one_work}</h3>
                </div>

                <div className="flex space-x-1">
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-grey md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-grey md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-grey md:w-[40px] md:h-[40px]"></div>
                </div>
            </div>

            <div className="stat-item stat-left col-span-1 h-[300px] bg-neutal-black rounded-[10px] p-2.5 flex flex-col justify-between md:col-span-2 md:p-5 md:h-[450px] lg:col-span-1 lg:h-[575px] xl:col-span-2">
                <div className="">
                    <p className='text-neutal-grey text-sm font-manrope md:text-xl'>{t.figma_card_two_lesson}</p>
                    <h3 className='text-neutal-blue text-2xl font-bebas md:text-4xl'>{t.figma_card_two_work}</h3>
                </div>

                <div className="flex space-x-1">
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-grey md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-grey md:w-[40px] md:h-[40px]"></div>
                </div>
            </div>

            <div className="hidden xl:col-span-2 xl:block stat-item stat-top">
                <p className='text-xl font-manrope font-light'>{t.figma_section1_p_two}</p>
            </div>

            <div className=" stat-item stat-right col-span-1 h-[300px] bg-neutal-black rounded-[10px] p-2.5 flex flex-col justify-between md:col-span-2 md:p-5 md:h-[450px] lg:col-span-1 lg:h-[575px] xl:col-span-2">
                <div className="">
                    <p className='text-neutal-grey text-sm font-manrope md:text-xl'>{t.figma_card_three_lesson}</p>
                    <h3 className='text-neutal-blue text-2xl font-bebas md:text-4xl'>{t.figma_card_three_work}</h3>
                </div>

                <div className="flex space-x-1">
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-grey md:w-[40px] md:h-[40px]"></div>
                </div>
            </div>

            <div className=" stat-item stat-right col-span-1 h-[300px] bg-neutal-black rounded-[10px] p-2.5 flex flex-col justify-between md:col-span-2 md:p-5 md:h-[450px] lg:col-span-1 lg:h-[575px] xl:col-span-2">
                <div className="">
                    <p className='text-neutal-grey text-sm font-manrope md:text-xl'>{t.figma_card_four_lesson}</p>
                    <h3 className='text-neutal-blue text-2xl font-bebas md:text-4xl'>{t.figma_card_four_work}</h3>
                </div>

                <div className="flex space-x-1">
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                    <div className="w-[25px] h-[25px] rounded-full bg-neutal-blue md:w-[40px] md:h-[40px]"></div>
                </div>
            </div>

         </section>



        <footer  className={`bg-neutal-black `}>
            <Footer
            language={language} 

            />
        </footer>
    </div>
  )
}

export default Figma

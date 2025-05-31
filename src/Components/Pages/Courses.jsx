import React, { useState,useEffect } from 'react'
import { translations } from '../translation'
import HeaderBlack from '../HeaderBlack'
import Footer from '../Footer'
import { useContext } from 'react';

import { LanguageContext } from './LanguageContext'; // Импортируем контекст
// Импорт изображений
import figma from '../../Image/webp/figma.webp'
import figma_one from '../../Image/webp/figma_one.webp'
import ux from '../../Image/webp/ux.webp'
import ux_one from '../../Image/webp/ux_one.webp'
import ae from '../../Image/webp/ae.webp'
import ae_one from '../../Image/webp/ae_one.webp'
import tilda from '../../Image/webp/tilda.webp'
import tilda_one from '../../Image/webp/tilda_one.webp'
import sitepro from '../../Image/webp/sitepro.webp'
import sitepro_one from '../../Image/webp/sitepro_one.webp'
import link from '../../Image/svg/link.svg'
import { useNavigate } from 'react-router-dom'


const Courses = () => {
    const { language } = useContext(LanguageContext); // Получаем язык из контекста

const t = translations[language];
const navigate = useNavigate();

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
    <div className='bg-neutal-white space-y-5'>
        <HeaderBlack
        language={language} 
 
        />

        <div className='stat-item stat-left mx-2.5 grid grid-cols-2 md:grid-cols-4 md:mx-5 xl:grid-cols-10 '>
            <div className="bg-black col-span-full p-2.5 pb-10 grid grid-cols-2 rounded-[10px] md:grid-cols-4 md:px-2.5 md:py-5 xl:grid-cols-10 gap-2.5">

                <img src={figma} alt="" className='order-1 col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-5 xl:col-span-2' />
                
                <img src={figma_one} alt="" className='order-1 hidden col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-7 xl:block xl:col-span-2' />

                <button onClick={()=>navigate('/figma-course')} className="order-2 col-span-1 rounded-[10px] min-h-[175px] object-cover bg-neutal-white font-manrope uppercase text-base text-neutal-black flex flex-col justify-center items-center gap-y-2 md:row-span-3 md:min-h-[360px] xl:col-span-2 xl:text-xl transition-all duration-300 hover:bg-neutal-blue hover:scale-[1.02]">
                    <img src={link} alt="Стрелка" className='w-[60px] h-[60px] xl:w-[100px] xl:h-[100px]' />
                    {t.btn_figma}
                </button>

                <div className="order-3 col-span-2 space-y-2 pt-4 md:row-start-1 md:pt-0 xl:col-span-3">
                    <h2 className='font-bebas font-light uppercase text-5xl text-neutal-white md:row-start-1 md:text-6xl lg:text-8xl'>{t.h2_figma}</h2>
                    <h3 className='font-manrope font-light text-sm text-neutal-white md:row-start-2 md:text-base '>{t.h3_figma}</h3>
                </div>

                <ul className='order-4 col-span-2 list-inside list-disc pt-4 space-y-3 md:row-start-3 xl:col-span-4 2xl:grid 2xl:grid-cols-4 2xl:gap-x-4 2xl:space-y-0'>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_figma_work_one}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_figma_work_two}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_figma_work_three}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_figma_work_four}</li>
                </ul>

            </div>
        </div>

        <div className='stat-item stat-right mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 md:mx-5'>
            <div className="bg-black col-span-full p-2.5 pb-10 grid grid-cols-2 rounded-[10px] md:grid-cols-4 md:px-2.5 md:py-5 xl:grid-cols-10 gap-2.5">

                <img src={tilda} alt="" className='order-1 col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-5 xl:col-span-2' />
                
                <img src={tilda_one} alt="" className='order-1 hidden col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-7 xl:block xl:col-span-2' />

                <button onClick={()=>navigate('/tilda-course')} className="order-2 col-span-1 rounded-[10px] min-h-[175px] object-cover bg-neutal-white font-manrope uppercase text-base text-neutal-black flex flex-col justify-center items-center gap-y-2 md:row-span-3 md:min-h-[360px] xl:col-span-2 xl:text-xl transition-all duration-300 hover:bg-neutal-blue hover:scale-[1.02]">
                    <img src={link} alt="Стрелка" className='w-[60px] h-[60px] xl:w-[100px] xl:h-[100px]' />
                    {t.btn_figma}
                </button>

                <div className="order-3 col-span-2 space-y-2 pt-4 md:row-start-1 md:pt-0 xl:col-span-3">
                    <h2 className='font-bebas font-light uppercase text-5xl text-neutal-white md:row-start-1 md:text-6xl lg:text-8xl'>{t.h2_tilda}</h2>
                    <h3 className='font-manrope font-light text-sm text-neutal-white md:row-start-2 md:text-base '>{t.h3_tilda}</h3>
                </div>

                <ul className='order-4 col-span-2 list-inside list-disc pt-4 space-y-3 md:row-start-3 xl:col-span-4 2xl:grid 2xl:grid-cols-4 2xl:gap-x-4 2xl:space-y-0'>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_tilda_one}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_tilda_two}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_tilda_three}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_tilda_four}</li>
                </ul>

            </div>
        </div>

        <div className='stat-item stat-left mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 md:mx-5'>
            <div className="bg-black col-span-full p-2.5 pb-10 grid grid-cols-2 rounded-[10px] md:grid-cols-4 md:px-2.5 md:py-5 xl:grid-cols-10 gap-2.5">

                <img src={ae} alt="" className='order-1 col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-5 xl:col-span-2' />
                
                <img src={ae_one} alt="" className='order-1 hidden col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-7 xl:block xl:col-span-2' />

                <button onClick={()=>navigate('/ae-course')} className="order-2 col-span-1 rounded-[10px] min-h-[175px] object-cover bg-neutal-white font-manrope uppercase text-base text-neutal-black flex flex-col justify-center items-center gap-y-2 md:row-span-3 md:min-h-[360px] xl:col-span-2 xl:text-xl transition-all duration-300 hover:bg-neutal-blue hover:scale-[1.02]">
                    <img src={link} alt="Стрелка" className='w-[60px] h-[60px] xl:w-[100px] xl:h-[100px]' />
                    {t.btn_figma}
                </button>

                <div className="order-3 col-span-2 space-y-2 pt-4 md:row-start-1 md:pt-0 xl:col-span-4">
                    <h2 className='font-bebas font-light uppercase text-5xl text-neutal-white md:row-start-1 md:text-6xl lg:text-8xl'>{t.h2_ae}</h2>
                    <h3 className='font-manrope font-light text-sm text-neutal-white md:row-start-2 md:text-base '>{t.h3_ae}</h3>
                </div>

                <ul className='order-4 col-span-2 list-inside list-disc pt-4 space-y-3 md:row-start-3 xl:col-span-4 2xl:grid 2xl:grid-cols-4 2xl:gap-x-4 2xl:space-y-0'>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_ae_one}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_ae_two}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_ae_three}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_ae_four}</li>
                </ul>

            </div>
        </div>

        <div className='stat-item stat-right mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 md:mx-5'>
            <div className="bg-black col-span-full p-2.5 pb-10 grid grid-cols-2 rounded-[10px] md:grid-cols-4 md:px-2.5 md:py-5 xl:grid-cols-10 gap-2.5">

                <img src={ux} alt="" className='order-1 col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-5 xl:col-span-2' />
                
                <img src={ux_one} alt="" className='order-1 hidden col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-7 xl:block xl:col-span-2' />

                <button onClick={()=>navigate('/ux-course')} className="order-2 col-span-1 rounded-[10px] min-h-[175px] object-cover bg-neutal-white font-manrope uppercase text-base text-neutal-black flex flex-col justify-center items-center gap-y-2 md:row-span-3 md:min-h-[360px] xl:col-span-2 xl:text-xl transition-all duration-300 hover:bg-neutal-blue hover:scale-[1.02]">
                    <img src={link} alt="Стрелка" className='w-[60px] h-[60px] xl:w-[100px] xl:h-[100px]' />
                    {t.btn_figma}
                </button>

                <div className="order-3 col-span-2 space-y-2 pt-4 md:row-start-1 md:pt-0 xl:col-span-3">
                    <h2 className='font-bebas font-light uppercase text-5xl text-neutal-white md:row-start-1 md:text-6xl lg:text-8xl'>{t.h2_ux}</h2>
                    <h3 className='font-manrope font-light text-sm text-neutal-white md:row-start-2 md:text-base '>{t.h3_ux}</h3>
                </div>

                <ul className='order-4 col-span-2 list-inside list-disc pt-4 space-y-3 md:row-start-3 xl:col-span-4 2xl:grid 2xl:grid-cols-4 2xl:gap-x-4 2xl:space-y-0'>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_ux_one}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_ux_two}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_ux_three}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_ux_four}</li>
                </ul>

            </div>
        </div>

        <div className='stat-item stat-left mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 md:mx-5'>
            <div className="bg-black col-span-full p-2.5 pb-10 grid grid-cols-2 rounded-[10px] md:grid-cols-4 md:px-2.5 md:py-5 xl:grid-cols-10 gap-2.5">

                <img src={sitepro} alt="" className='order-1 col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-5 xl:col-span-2' />
                
                <img src={sitepro_one} alt="" className='order-1 hidden col-span-1 rounded-[10px] min-h-[175px] object-cover md:col-start-3 md:row-span-3 md:min-h-[360px] xl:col-start-7 xl:block xl:col-span-2' />

                <button onClick={()=>navigate('/pro-course')} className="order-2 col-span-1 rounded-[10px] min-h-[175px] object-cover bg-neutal-white font-manrope uppercase text-base text-neutal-black flex flex-col justify-center items-center gap-y-2 md:row-span-3 md:min-h-[360px] xl:col-span-2 xl:text-xl transition-all duration-300 hover:bg-neutal-blue hover:scale-[1.02]">
                    <img src={link} alt="Стрелка" className='w-[60px] h-[60px] xl:w-[100px] xl:h-[100px]' />
                    {t.btn_figma}
                </button>

                <div className="order-3 col-span-2 space-y-2 pt-4 md:row-start-1 md:pt-0 xl:col-span-3">
                    <h2 className='font-bebas font-light uppercase text-5xl text-neutal-white md:row-start-1 md:text-6xl lg:text-8xl'>{t.h2_sitepro}</h2>
                    <h3 className='font-manrope font-light text-sm text-neutal-white md:row-start-2 md:text-base '>{t.h3_sitepro}</h3>
                </div>

                <ul className='order-4 col-span-2 list-inside list-disc pt-4 space-y-3 md:row-start-3 xl:col-span-4 2xl:grid 2xl:grid-cols-4 2xl:gap-x-4 2xl:space-y-0'>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_sitepro_one}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_sitepro_two}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_sitepro_three}</li>
                    <li className='font-manrope font-light text-sm text-neutal-white md:text-base 2xl:col-span-2'>{t.p_sitepro_four}</li>
                </ul>

            </div>
        </div>

        <Footer
        language={language} 
       
        />


    </div>
  )
}

export default Courses

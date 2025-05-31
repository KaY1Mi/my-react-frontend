
import { Link } from 'react-router-dom'
import { translations } from './translation'
import React, { useState, useContext } from 'react';
import { LanguageContext } from './Pages/LanguageContext'; // Импортируем контекст
const Footer = () => {
    const { language } = useContext(LanguageContext); // Получаем язык из контекста
const t = translations[language] || translations['ru'] || {};



    return (
        <footer className='bg-neutal-black grid grid-cols-2 py-10 px-2.5 gap-5 md:grid-cols-4 md:px-5 md:gap-5 lg:grid-cols-4 xl:grid-cols-10 xl:h-screen'>

        <Link to="/" className='stat-item stat-top font-bebas col-span-full text-center text-8xl text-neutal-blue leading-none md:text-[290px] xl:text-[300px] 2xl:text-[440px]'>{t.footer_logo}</Link>
    
      
        <div className="col-span-full space-y-7 xl:grid xl:grid-cols-3 xl:gap-10 xl:space-y-0 xl:mt-5">

            <div className="stat-item stat-left xl:col-span-1">
                <h3 className='font-bebas text-5xl text-neutal-blue text-center md:text-8xl xl:text-left'>{t.footer_section_one}</h3>
                <div className="flex flex-col space-y-5 pt-5">
                    <Link to="/courses" className='font-bebas text-3xl text-neutal-grey text-center md:text-5xl xl:text-left hover:text-gray-300 cursor-pointer transition-colors duration-200'>{t.footer_section_one_link_one}</Link>
                    <Link to="/acticles" className='font-bebas text-3xl text-neutal-grey text-center md:text-5xl xl:text-left hover:text-gray-300 cursor-pointer transition-colors duration-200'>{t.footer_section_one_link_two}</Link>
                    <Link to="/useful" className='font-bebas text-3xl text-neutal-grey text-center md:text-5xl xl:text-left hover:text-gray-300 cursor-pointer transition-colors duration-200'>{t.footer_section_one_link_three}</Link>
                </div>
            </div>
    
 
            <div className="stat-item stat-top xl:col-span-1">
                <h3 className='font-bebas text-5xl text-neutal-blue text-center md:text-8xl'>{t.footer_section_two}</h3>
                <div className="flex flex-col space-y-5 pt-5">
                    <Link to="/vacancies" className='font-bebas text-3xl text-neutal-grey text-center md:text-5xl hover:text-gray-300 cursor-pointer transition-colors duration-200'>{t.footer_section_two_link_one}</Link>
                    <Link to="/case-project" className='font-bebas text-3xl text-neutal-grey text-center md:text-5xl hover:text-gray-300 cursor-pointer transition-colors duration-200'>{t.footer_section_two_link_two}</Link>
                </div>
            </div>

            <div className="stat-item stat-right xl:col-span-1">
                <h3 className='font-bebas text-5xl text-neutal-blue text-center md:text-8xl xl:text-right'>{t.footer_section_three}</h3>
                <div className="flex flex-col space-y-5 pt-5">
                    <a href='https://vk.com/club228572416?from=groups' className='font-bebas text-3xl text-neutal-grey text-center md:text-5xl xl:text-right hover:text-gray-300 cursor-pointer transition-colors duration-200'>{t.footer_section_three_link_one}</a>
                    <a href='https://web.telegram.org/k/#-2367128985' className='font-bebas text-3xl text-neutal-grey text-center md:text-5xl xl:text-right hover:text-gray-300 cursor-pointer transition-colors duration-200'>{t.footer_section_three_link_two}</a>
                </div>
            </div>
    

            <div className="stat-item stat-bottom text-center space-y-5 col-span-full xl:mt-10">
            <a href="mailto:Sakuraflow@yandex.ru" className='font-bebas col-start-1 text-3xl text-neutal-grey text-center md:text-5xl hover:text-gray-300 cursor-pointer transition-colors duration-200'>{t.footer_email}</a>
                <p className='font-bebas text-3xl text-neutal-grey text-center md:text-5xl hover:text-gray-300 cursor-pointer transition-colors duration-200'>{t.footer_copy}</p>
            </div>
        </div>
        </footer>
  )
}

export default Footer

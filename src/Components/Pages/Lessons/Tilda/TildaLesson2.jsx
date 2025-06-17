import React, { useEffect, useContext } from 'react';
import { translations } from '../../../translation';
import HeaderBlack from '../../../HeaderBlack';
import Footer from '../../../Footer';
import { LanguageContext } from '../../LanguageContext';
import tilda_main from '../../../../Image/webp/Course/Tilda/Tilda_main.jpg' // твоя картинка для Тильды
import { useNavigate } from 'react-router-dom';

const TildaLesson2 = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

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
        <HeaderBlack language={language} />
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 xl:my-5">
          <img src={tilda_main} alt="Гифка Tilda" className='w-full col-span-full h-[450px] object-cover md:h-[700px]' />
          <p className='stat-item stat-left pt-7 text-base font-manrope col-span-full mx-2.5 md:pt-5 md:text-lg lg:text-xl lg:pt-10 xl:col-span-6 xl:pt-10'>
            {t.tilda_lesson2_intro}
          </p>
        </div>
      </main>

      <section className="mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5">
        <h2 className='stat-item stat-top col-span-full font-bebas text-6xl md:text-7xl lg:text-8xl'>{t.tilda_lesson2_main_title}</h2>
        <div className="col-span-full">
          <div className="stat-item stat-left flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
            <h3 className='text-4xl font-bebas'>{t.tilda_lesson2_section1_title}</h3>
            <p className='text-sm font-manrope pt-5 text-neutal-grey md:text-lg lg:text-xl xl:pt-0 xl:w-[60%]'>{t.tilda_lesson2_section1_content}</p>
          </div>

          <div className="stat-item stat-right flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
            <h3 className='text-4xl font-bebas'>{t.tilda_lesson2_section2_title}</h3>
            <p className='text-sm font-manrope pt-5 text-neutal-grey md:text-lg lg:text-xl xl:pt-0 xl:w-[60%]'>{t.tilda_lesson2_section2_content}</p>
          </div>

          <div className="stat-item stat-bottom flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
            <h3 className='text-4xl font-bebas'>{t.tilda_lesson2_section3_title}</h3>
            <ul className='pt-5 list-disc list-inside space-y-2 xl:pt-0 xl:w-[60%]'>
              <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.tilda_lesson2_list_item1}</li>
              <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.tilda_lesson2_list_item2}</li>
              <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.tilda_lesson2_list_item3}</li>
              <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.tilda_lesson2_list_item4}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5">
        <h2 className='stat-item stat-top col-span-full font-bebas text-6xl md:text-7xl lg:text-8xl'>{t.tilda_lesson2_video_title}</h2>
        <div className="relative w-full pt-[56.25%] col-span-full">
  <iframe
    src="https://rutube.ru/play/embed/22afe5645366c9f4f68f148f7a11e05d/"
    className="absolute top-0 left-0 w-full h-full"
    frameBorder="0"
    allow="clipboard-write; autoplay"
    webkitAllowFullScreen
    mozAllowFullScreen
    allowFullScreen
    title="Figma Lesson Video"
  ></iframe>
</div>

        <button
          className='stat-item stat-bottom text-2xl mt-5 font-bebas bg-black text-white w-full col-span-full rounded-[10px] h-[70px] md:h-[100px] md:text-3xl'
          onClick={() => navigate('/tilda-lesson-three')}
        >
          {t.tilda_lesson2_next_button}
        </button>
      </section>

      <footer className="bg-neutal-black">
        <Footer language={language} />
      </footer>
    </div>
  );
};

export default TildaLesson2;
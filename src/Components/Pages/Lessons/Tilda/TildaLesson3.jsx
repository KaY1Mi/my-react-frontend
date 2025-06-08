import React, { useEffect, useContext, useState } from 'react';
import { translations } from '../../../translation';
import HeaderBlack from '../../../HeaderBlack';
import Footer from '../../../Footer';
import { LanguageContext } from '../../LanguageContext';
import tilda_main from '../../../../Image/webp/Course/Tilda/Tilda_main.jpg' // твоя картинка для Тильды
import { useNavigate } from 'react-router-dom';

const TildaLesson3 = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [showModal, setShowModal] = useState(false);

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

  const handleCompleteCourse = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/'); // Перенаправление на главную страницу после закрытия
  };

  return (
    <div>
      <main className='h-screen'>
        <HeaderBlack language={language} />
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 xl:my-5">
          <img src={tilda_main} alt="Tilda animation" className='w-full col-span-full h-[450px] object-cover md:h-[700px]' />
          <p className='stat-item stat-left pt-7 text-base font-manrope col-span-full mx-2.5 md:pt-5 md:text-lg lg:text-xl lg:pt-10 xl:col-span-6 xl:pt-10'>
            {t.tilda_lesson3_intro}
          </p>
        </div>
      </main>

      {/* Остальные секции остаются без изменений */}
      {/* ... */}

      <section className="mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5">
        <h2 className='stat-item stat-top col-span-full font-bebas text-6xl md:text-7xl lg:text-8xl'>{t.tilda_lesson3_video_title}</h2>
        <iframe width="1860" height="1024" src="https://rutube.ru/play/embed/4e5729477ecf4d09ce9cfdf9568bf77a/" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
        <button
          className='stat-item stat-bottom text-2xl mt-5 font-bebas bg-black text-white w-full col-span-full rounded-[10px] h-[70px] md:h-[100px] md:text-3xl'
          onClick={handleCompleteCourse}
        >
          {t.tilda_lesson3_complete_button}
        </button>
      </section>

      {/* Модальное окно */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-2xl font-bebas mb-4">{t.tilda_course_complete_title}</h3>
            <p className="font-manrope mb-6">{t.tilda_course_complete_message}</p>
            <div className="flex justify-between">
              <a 
                href="https://web.telegram.org/k/#-2367128985" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {t.tilda_join_telegram}
              </a>
              <button 
                onClick={closeModal}
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
              >
                {t.tilda_close}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-neutal-black">
        <Footer language={language} />
      </footer>
    </div>
  );
};

export default TildaLesson3;
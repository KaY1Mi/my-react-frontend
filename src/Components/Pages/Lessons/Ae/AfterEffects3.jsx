import React, { useEffect, useState, useContext } from 'react';
import { translations } from '../../../translation';
import HeaderBlack from '../../../HeaderBlack';
import Footer from '../../../Footer';
import { LanguageContext } from '../../LanguageContext';
import ae from '../../../../Image/webp/Course/AE/AE_main.jpg'
import { useNavigate } from 'react-router-dom';

const AfterEffectsLesson3 = () => {
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
        navigate('/'); // редирект на главную после закрытия
    };

    return (
        <div>
            <main className='h-screen'>
                <HeaderBlack language={language} />
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 xl:my-5">
                    <img src={ae} alt="After Effects animation" className='w-full col-span-full h-[450px] object-cover md:h-[700px]' />
                    <p className='stat-item stat-left pt-7 text-base font-manrope col-span-full mx-2.5 md:pt-5 md:text-lg lg:text-xl lg:pt-10 xl:col-span-6 xl:pt-10'>
                        {t.ae_lesson3_intro}
                    </p>
                </div>
            </main>

            <section className="mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5">
                <h2 className='stat-item stat-top col-span-full font-bebas text-6xl md:text-7xl lg:text-8xl'>{t.ae_lesson3_main_title}</h2>
                <div className="col-span-full">
                    <div className="stat-item stat-left flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
                        <h3 className='text-4xl font-bebas'>{t.ae_lesson3_section1_title}</h3>
                        <p className='text-sm font-manrope pt-5 text-neutal-grey md:text-lg lg:text-xl xl:pt-0 xl:w-[60%]'>
                            {t.ae_lesson3_section1_content}
                        </p>
                    </div>

                    <div className="stat-item stat-right flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
                        <h3 className='text-4xl font-bebas'>{t.ae_lesson3_section2_title}</h3>
                        <p className='text-sm font-manrope pt-5 text-neutal-grey md:text-lg lg:text-xl xl:pt-0 xl:w-[60%]'>
                            {t.ae_lesson3_section2_content}
                        </p>
                    </div>

                    <div className="stat-item stat-bottom flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
                        <h3 className='text-4xl font-bebas'>{t.ae_lesson3_section3_title}</h3>
                        <ul className='pt-5 list-disc list-inside space-y-2 xl:pt-0 xl:w-[60%]'>
                           <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.ae_lesson3_list_item1}</li>
                           <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.ae_lesson3_list_item2}</li>
                           <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.ae_lesson3_list_item3}</li>
                           <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.ae_lesson3_list_item4}</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5">
                <h2 className='stat-item stat-top col-span-full font-bebas text-6xl md:text-7xl lg:text-8xl'>{t.ae_lesson3_video_title}</h2>
                <div className="relative w-full pt-[56.25%] col-span-full">
  <iframe
    src="https://rutube.ru/play/embed/a67e08903dbb18dc26828b2444e06f03/"
    className="absolute top-0 left-0 w-full h-full"
    frameBorder="0"
    allow="clipboard-write; autoplay"
    webkitAllowFullScreen
    mozAllowFullScreen
    allowFullScreen
    title="After Effects Lesson 3 Video"
  ></iframe>
</div>
                <button 
                    className='stat-item stat-bottom text-2xl mt-5 font-bebas bg-black text-white w-full col-span-full rounded-[10px] h-[70px] md:h-[100px] md:text-3xl'
                    onClick={handleCompleteCourse}
                >
                    {t.ae_lesson3_complete_button}
                </button>
            </section>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md animate-fade-in">

                        <h3 className="text-2xl font-bebas mb-4">{t.ae_course_complete_title}</h3>
                        <p className="font-manrope mb-6">{t.ae_course_complete_message}</p>
                        <div className="flex justify-between">
                            <a 
                                href="https://web.telegram.org/k/#-2367128985" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                {t.ae_join_telegram}
                            </a>
                            <button 
                                onClick={closeModal}
                                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
                            >
                                {t.ae_close}
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

export default AfterEffectsLesson3;

import React, { useEffect, useContext } from 'react'
import { translations } from '../../../translation'
import HeaderBlack from '../../../HeaderBlack';
import Footer from '../../../Footer';
import { LanguageContext } from '../../LanguageContext';
import ae from '../../../../Image/webp/Course/AE/AE_main.jpg'
import { useNavigate } from 'react-router-dom';

const AfterEffects1 = () => {
    const navigate = useNavigate()
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
                    <img src={ae} alt="After Effects Animation" className='w-full col-span-full h-[450px] object-cover md:h-[700px]' />
                    <p className='stat-item stat-left pt-7 text-base font-manrope col-span-full mx-2.5 md:pt-5 md:text-lg lg:text-xl lg:pt-10 xl:col-span-6 xl:pt-10'>
                        {t.ae_lesson_p}
                    </p>
                </div>
            </main>

            <section className="mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5">
                <h2 className='stat-item stat-top col-span-full font-bebas text-6xl md:text-7xl lg:text-8xl'>{t.ae_l_h2}</h2>
                <div className="col-span-full">

                    <div className="stat-item stat-left flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
                        <h3 className='text-4xl font-bebas'>{t.ae_l_h3_one}</h3>
                        <p className='text-sm font-manrope pt-5 text-neutal-grey md:text-lg lg:text-xl xl:pt-0 xl:w-[60%]'>{t.ae_l_p_one}</p>
                    </div>

                    <div className="stat-item stat-right flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
                        <h3 className='text-4xl font-bebas'>{t.ae_l_h3_two}</h3>
                        <p className='text-sm font-manrope pt-5 text-neutal-grey md:text-lg lg:text-xl xl:pt-0 xl:w-[60%]'>{t.ae_l_p_two}</p>
                    </div>

                    <div className="stat-item stat-bottom flex flex-col mt-5 py-5 border-b border-neutal-grey xl:flex-row xl:justify-between xl:items-start">
                        <h3 className='text-4xl font-bebas'>{t.ae_l_h3_three}</h3>
                        <ul className='pt-5 list-disc list-inside space-y-2 xl:pt-0 xl:w-[60%]'>
                            <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.ae_l_list_one}</li>
                            <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.ae_l_list_two}</li>
                            <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.ae_l_list_three}</li>
                            <li className='text-sm font-manrope text-neutal-grey md:text-lg lg:text-xl'>{t.ae_l_list_four}</li>
                        </ul>
                    </div>

                </div>
            </section>

            <section className="mx-2.5 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-10 my-5 md:mx-5">
                <h2 className='stat-item stat-top col-span-full font-bebas text-6xl md:text-7xl lg:text-8xl'>{t.ae_l_h2_h2}</h2>
                <iframe width="1860" height="1024" src="https://rutube.ru/play/embed/420b813feb0757654e2f45d1dea6c604/" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                <button
                    className='stat-item stat-bottom text-2xl mt-5 font-bebas bg-black text-white w-full col-span-full rounded-[10px] h-[70px] md:h-[100px] md:text-3xl'
                    onClick={() => navigate('/aftereffects-lesson-two')}
                >
                    {t.ae_btn_2}
                </button>
            </section>

            <footer className="bg-neutal-black">
                <Footer language={language} />
            </footer>
        </div>
    )
}

export default AfterEffects1

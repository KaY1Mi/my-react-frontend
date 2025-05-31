import React, { useCallback, useEffect, useRef, useState } from 'react'
import { translations } from '../translation'
import HeaderBlack from '../HeaderBlack';
import Footer from '../Footer';
import AnimatedCounter from '../AnimatedCounter';
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext'; // Импортируем контекст
const PayAll = () => {
    // для перевода текста
    const { language } = useContext(LanguageContext); // Получаем язык из контекста

    const t = translations[language];

    // для плавного скролла
    const [currentSection, setCurrentSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionsRef = useRef([]);
    const scrollTimeout = useRef(null);
const [cardNumber, setCardNumber] = useState("");
const [expiry, setExpiry] = useState('');
const [cvv, setCvv] = useState('');

const formatCardNumber = (value) => {
  return value
    .replace(/\D/g, '') // только цифры
    .replace(/(.{4})/g, '$1 ') // добавляем пробелы каждые 4 цифры
    .trim(); // удаляем последний пробел
};

const formatExpiry = (value) => {
  return value
    .replace(/\D/g, '') // только цифры
    .replace(/^(\d{2})(\d{1,2})?/, (_, m, y) => (y ? `${m}/${y}` : m))
    .slice(0, 5); // максимум 5 символов
};

const formatCVV = (value) => value.replace(/\D/g, '').slice(0, 3); // только 3 цифры

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

            <main ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'}`}>
                <HeaderBlack
                    language={language} 

                />

                <div className="grid grid-cols-2 pt-[200px] px-2.5 gap-5 md:grid-cols-4 md:px-5 md:gap-5 lg:grid-cols-4 xl:grid-cols-10">
                    <form className="col-span-full space-y-5 md:col-start-2 md:col-span-2 xl:col-start-4 xl:col-span-4">

                        <div className="col-span-2">
                            <label className='font-manrope font-normal text-xl text-black px-[5px]' htmlFor="">{t.pay_label_one}</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                className='font-manrope font-normal text-base text-black px-[5px] py-2.5 border-b-2 border-neutal-grey w-full'
                                placeholder={t.pay_placeholder_one}
                              />
                       </div>

                        <div className="col-span-2 grid grid-cols-2 gap-5">

                            <div>
                                <label className='font-manrope font-normal text-xl text-black px-[5px] block' htmlFor="">{t.pay_label_two}</label>
                                <input
                                  type="text"
                                  value={expiry}
                                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                  className='font-manrope font-normal text-base text-black px-[5px] py-2.5 border-b-2 border-neutal-grey w-full'
                                  placeholder={t.pay_placeholder_two}
                                />                            </div>

                            <div>
                                <label className='font-manrope font-normal text-xl text-black px-[5px] block' htmlFor="">{t.pay_label_three}</label>
                                  <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(formatCVV(e.target.value))}
                                    className='font-manrope font-normal text-base text-black px-[5px] py-2.5 border-b-2 border-neutal-grey w-full'
                                    placeholder={t.pay_placeholder_three}
/>                            </div>

                        </div>

                        <div className="">
                            <p className='font-manrope font-normal text-[12px] text-black'>{t.pay_text}</p>    
                        </div>

                        <div className="">
                            <AnimatedCounter/>
                        </div>

                        <button type="submit" className='font-bebas text-white bg-black w-full h-[55px] rounded-[10px] text-xl'>
                            {t.pay_btn}
                        </button> 

                    </form>
                </div>
            </main>

            <footer ref={addToRefs} className={`${isMobile ? 'min-h-screen' : 'h-screen'} bg-neutal-black `}>
            <Footer
            language={language} 

            />
            </footer>

        </div>
    )
}

export default PayAll

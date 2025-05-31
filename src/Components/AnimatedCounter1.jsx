import React, { useState, useEffect, useRef } from 'react';
import { translations } from './translation'

const AnimatedCounter = ({
  className = "my-number",
  initialValue = 0,
  targetValue = 49900, // ← заменили 5.974 на 59900
  prefix = "",
  suffix = "  ₽",
  triggerOffset = 50,
  animationDuration = 850,
  animationDelay = 100,
  decimals = 0 // ← без дробей
}) => {
  const [value, setValue] = useState(initialValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);
// для перевода текста
const [language, setLanguage] = useState('ru');
const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimated || !counterRef.current) return;

      const element = counterRef.current;
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight - triggerOffset;

      if (elementTop < triggerPoint) {
        setHasAnimated(true);
        
        setTimeout(() => {
          let startTimestamp = null;
          
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
            const currentValue = initialValue + (targetValue - initialValue) * progress;
            
            setValue(currentValue);
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setValue(targetValue);
            }
          };
          
          window.requestAnimationFrame(step);
        }, animationDelay);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasAnimated, initialValue, targetValue, triggerOffset, animationDuration, animationDelay]);

  const formatNumber = (num) => {
    return num.toFixed(decimals).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  };

  return (
    <div className={`${className}`} ref={counterRef}>
      <span className=" text-8xl text-center">
        {prefix}
        <span className="text-neutal-black tracking-tighter font-bebas leading-none">{formatNumber(value)}</span>
        <span className='pl-1 font-semibold tracking-tighter leading-none'>{suffix}</span>
        {/* <span className='text-xl font-manrope text-neutal-grey leading-none'>{t.pay_month}</span> */}
      </span>
    </div>
  );
};

export default AnimatedCounter;
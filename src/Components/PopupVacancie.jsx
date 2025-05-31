import React, { useState, useContext } from 'react';
import { translations } from './translation';
import { LanguageContext } from './Pages/LanguageContext'; // Импортируем контекст

const PopupVacancie = ({ onClose, onConfirm }) => {
  const { language } = useContext(LanguageContext); // Получаем язык из контекста
  const t = translations[language];
  
  return (
    <>
      <div className="fixed inset-0 bg-gray-700 bg-opacity-70 z-40"></div>
      
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl max-w-3xl w-full mx-4">
          <h3 className="font-bebas text-4xl mb-6 text-center md:text-8xl">
            {t.h3_popup}
          </h3>
          <h4 className='font-bebas text-2xl mb-6 text-center text-neutal-grey'>
            {t.h4_popup}
          </h4>
          <div className="flex justify-center w-full">
            <button
              onClick={onClose}
              className="bg-gray-300 text-neutal-black font-bebas text-xl px-8 py-2 rounded-xl hover:bg-gray-400 transition-colors"
            >
              {t.pop_close}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupVacancie;

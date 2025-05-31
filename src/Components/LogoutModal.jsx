import React, { useState, useContext } from 'react';
import { translations } from './translation';
import { LanguageContext } from './Pages/LanguageContext'; // Импортируем контекст
const LogoutModal = ({ onClose, onConfirm }) => {
    const { language } = useContext(LanguageContext); // Получаем язык из контекста
      const t = translations[language];
  return (
    <>
      {/* Затемнение фона */}
      <div className="fixed inset-0 bg-gray-700 bg-opacity-70 z-40"></div>
      
      {/* Модальное окно */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
          <h3 className="font-bebas text-3xl mb-6 text-center">
            {t.h3_popap}
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="bg-red-400 text-neutal-white font-bebas text-xl px-8 py-2 rounded-xl hover:bg-red-600 transition-colors"
            >
              {t.pop_yes}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-neutal-black font-bebas text-xl px-8 py-2 rounded-xl hover:bg-gray-400 transition-colors"
            >
              {t.pop_no}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
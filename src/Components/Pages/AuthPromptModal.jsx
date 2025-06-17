import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPromptModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center">
        <h3 className="text-2xl font-bold mb-4">Требуется авторизация</h3>
        <p className="mb-6">Пожалуйста, войдите или зарегистрируйтесь, чтобы добавлять курсы в избранное.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Войти
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Регистрация
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 underline"
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

export default AuthPromptModal;

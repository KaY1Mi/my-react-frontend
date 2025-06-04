import React, { useContext, useEffect, useState } from 'react';
import HeaderBlack from '../HeaderBlack';
import { translations } from '../translation';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import LogoutModal from '../LogoutModal';
import { LanguageContext } from './LanguageContext';

// Пусть у тебя есть 3 локальных аватара в папке public/avatars/avatar1.png и т.д.
const AVATARS = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
];

const UserProfile = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('https://my-django-backend-rrxo.onrender.com/api/user/profile/', {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);

        // Попытаемся определить индекс аватара по URL, если совпадает с одним из AVATARS
        const currentAvatarIndex = AVATARS.findIndex((avatarUrl) => avatarUrl === data.avatar);
        setSelectedAvatarIndex(currentAvatarIndex !== -1 ? currentAvatarIndex : null);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSaveChanges = async () => {
    if (selectedAvatarIndex === null) {
      alert(t.no_changes || "Нет изменений для сохранения");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Отправляем просто выбранный URL аватара, который у нас локальный
      const response = await fetch('https://my-django-backend-rrxo.onrender.com/api/upload-avatar/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: AVATARS[selectedAvatarIndex] }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else if (response.status === 500) {
          setError("Ошибка сервера, попробуйте позже.");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      if (data.avatar) {
        setUserData(prev => ({ ...prev, avatar: data.avatar }));
        alert(t.changes_saved || "Изменения сохранены");
      }
    } catch (err) {
      console.error('Error:', err);
      alert(err.message || t.avatar_upload_error || "Ошибка обновления аватара");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowLogoutModal(false);
    navigate('/login');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">No user data available</div>;
  }

  return (
    <div className="overflow-hidden min-h-screen">
      <main className="min-h-screen">
        <HeaderBlack language={language} />

        <section className="py-5 px-5">
          <h2 className="text-3xl font-bold mb-6">{t.select_avatar || 'Выберите аватар'}</h2>

          <div className="flex gap-6 justify-center mb-8">
            {AVATARS.map((avatarUrl, index) => (
              <div
                key={index}
                className={`w-32 h-32 rounded-full overflow-hidden border-4 cursor-pointer 
                  ${selectedAvatarIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setSelectedAvatarIndex(index)}
              >
                <img src={avatarUrl} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <button
            className="bg-neutal-black text-white px-6 py-3 rounded-md font-bebas text-xl"
            onClick={handleSaveChanges}
            disabled={selectedAvatarIndex === null}
          >
            {t.btn_save}
          </button>

          <button
            className="mt-5 text-red-600 underline"
            onClick={() => setShowLogoutModal(true)}
          >
            {t.link_logout}
          </button>

          {showLogoutModal && (
            <LogoutModal
              onClose={() => setShowLogoutModal(false)}
              onConfirm={handleLogout}
              language={language}
            />
          )}
        </section>
      </main>

      <footer className="bg-neutal-black">
        <Footer language={language} />
      </footer>
    </div>
  );
};

export default UserProfile;
import React, { useContext, useEffect, useState } from 'react';
import HeaderBlack from '../HeaderBlack';
import { translations } from '../translation';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import LogoutModal from '../LogoutModal';
import { LanguageContext } from './LanguageContext';

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
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await fetch('https://my-django-backend-rrxo.onrender.com/api/user/profile/', {
          headers: { 'Authorization': `Token ${token}` },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setUserData(data);

        const index = AVATARS.findIndex(url => url === data.avatar);
        setSelectedAvatarIndex(index !== -1 ? index : null);
      } catch (err) {
        setError(err.message);
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

    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const avatarFileName = `avatar${selectedAvatarIndex + 1}.png`;

      const res = await fetch('https://my-django-backend-rrxo.onrender.com/api/change-avatar/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: avatarFileName }),
      });
        

      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Ошибка обновления аватара');

      setUserData(prev => ({ ...prev, avatar: data.avatar }));
      alert(t.changes_saved || "Изменения сохранены");
    } catch (err) {
      alert(err.message || t.avatar_upload_error || "Ошибка");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const avatarPreview = selectedAvatarIndex !== null
    ? AVATARS[selectedAvatarIndex]
    : userData?.avatar;

  return (
    <div className="min-h-screen overflow-hidden bg-gray-50 text-black">
      <HeaderBlack language={language} />

      <main className="py-10 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">{t.select_avatar || 'Выберите аватар'}</h2>

        <div className="flex justify-center mb-8">
          <div className="w-40 h-40 border-4 border-gray-400 rounded-full overflow-hidden shadow-lg">
            <img
              src={avatarPreview}
              alt="Выбранный аватар"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-center gap-6 flex-wrap mb-8">
          {AVATARS.map((url, index) => (
            <div
              key={index}
              className={`w-24 h-24 rounded-full border-4 cursor-pointer overflow-hidden transition duration-200
                ${selectedAvatarIndex === index ? 'border-blue-600 scale-105' : 'border-gray-300 hover:border-blue-400 hover:scale-105'}`}
              onClick={() => setSelectedAvatarIndex(index)}
            >
              <img src={url} alt={`Аватар ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <button
            className="bg-black text-white px-6 py-3 rounded-md font-bold text-lg mb-4 hover:bg-gray-800"
            onClick={handleSaveChanges}
            disabled={selectedAvatarIndex === null}
          >
            {t.btn_save || 'Сохранить изменения'}
          </button>

          <button className="text-red-600 underline" onClick={() => setShowLogoutModal(true)}>
            {t.link_logout || 'Выйти'}
          </button>
        </div>

        {showLogoutModal && (
          <LogoutModal
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
            language={language}
          />
        )}
      </main>

      <Footer language={language} />
    </div>
  );
};

export default UserProfile;

import React, { useContext, useEffect, useState } from 'react';
import HeaderBlack from '../HeaderBlack';
import Footer from '../Footer';
import LogoutModal from '../LogoutModal';
import { useNavigate } from 'react-router-dom';
import { translations } from '../translation';
import { LanguageContext } from './LanguageContext';

const UserProfile = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = translations[language];
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const response = await fetch('https://my-django-backend-rrxo.onrender.com/api/user/profile/', {
          headers: { 'Authorization': `Token ${token}` }
        });

        if (!response.ok) throw new Error(t.profile_load_error);
        const data = await response.json();
        setUserData({ username: data.username, email: data.email });
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate, t.profile_load_error]);

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      setLoading(true);
      const body = {
        username: userData.username,
        email: userData.email,
      };
      if (password.trim()) body.password = password;

      const response = await fetch('https://my-django-backend-rrxo.onrender.com/api/user/profile/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        throw new Error(t.avatar_save_error);
      }

      alert(t.changes_saved);
      setPassword('');
    } catch (error) {
      alert(t.avatar_save_error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      <HeaderBlack language={language} setLanguage={setLanguage} />

      <main className="p-5">
        <section className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bebas mb-6 text-center">{t.link_userprofile}</h1>

          <div className="mb-4">
            <label className="block font-bold mb-1">{t.username}:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-1">{t.email}:</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-1">{t.password_new}:</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.password_placeholder}
            />
          </div>

          <button
            onClick={handleSaveChanges}
            className="w-full bg-black text-white py-3 rounded font-bebas text-xl mt-4"
            disabled={loading}
          >
            {loading ? t.saving : t.btn_save}
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full text-red-500 mt-6 underline"
          >
            {t.link_logout}
          </button>

          {showLogoutModal && (
            <LogoutModal onClose={() => setShowLogoutModal(false)} onConfirm={handleLogout} language={language} />
          )}
        </section>
      </main>

      <Footer language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default UserProfile;
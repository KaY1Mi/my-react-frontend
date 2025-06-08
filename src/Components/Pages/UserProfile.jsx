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
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState({ username: false, email: false, password: false });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const response = await fetch('https://my-django-backend-rrxo.onrender.com/api/user/profile/', {
          headers: { Authorization: `Token ${token}` },
        });

        if (!response.ok) throw new Error(t.profile_load_error);
        const data = await response.json();
        setUserData(data);
        setFormData({ username: data.username, email: data.email, password: '' });
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate, language, t.profile_load_error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage(t.profile_update_error);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://my-django-backend-rrxo.onrender.com/api/user/profile/update/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(t.profile_updated_successfully);
        setUserData((prev) => ({
          ...prev,
          username: formData.username,
          email: formData.email,
        }));
        setFormData((prev) => ({ ...prev, password: '' }));
        setIsEditing({ username: false, email: false, password: false });
      } else {
        setErrorMessage(data?.message || t.profile_update_error);
      }
    } catch (error) {
      setErrorMessage(t.profile_update_error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="overflow-hidden min-h-screen">
      <main className="min-h-screen">
        <HeaderBlack language={language} setLanguage={setLanguage} />

        <section className="grid grid-cols-2 py-5 gap-5 md:grid-cols-4 md:gap-5 lg:grid-cols-4 xl:grid-cols-10">
          <div className="col-span-full xl:col-span-4">
            <button
              onClick={() => navigate('/profile')}
              className="text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue"
            >
              {t.link_userprofile}
            </button>
            <button
              onClick={() => navigate('/likecourses')}
              className="text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue"
            >
              {t.link_linkcourses}
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue"
            >
              {t.link_logout}
            </button>
          </div>

          {showLogoutModal && (
            <LogoutModal onClose={() => setShowLogoutModal(false)} onConfirm={handleLogout} language={language} />
          )}

          <div className="col-span-full px-5 md:col-span-2 md:col-start-2 xl:col-span-3 xl:col-start-6">
            <div className="grid grid-cols-1 gap-5">
              <div className="grid grid-cols-1 gap-4 w-full">
                <h2 className="text-3xl font-bold font-bebas text-center relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    readOnly={!isEditing.username}
                    className={`w-full text-center bg-transparent border-b border-gray-300 focus:outline-none ${
                      !isEditing.username ? 'text-gray-400 cursor-default' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditing((prev) => ({ ...prev, username: true }))}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-600 text-sm"
                  >
                    ✏️ {t.edit || 'Edit'}
                  </button>
                </h2>

                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-2">
                  <label className="font-bebas text-4xl">{t.email}:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={!isEditing.email}
                    className={`font-manrope text-base text-neutal-grey break-all text-right border-b border-gray-300 focus:outline-none ${
                      !isEditing.email ? 'text-gray-400 cursor-default' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditing((prev) => ({ ...prev, email: true }))}
                    className="text-blue-600 text-sm"
                  >
                    ✏️ {t.edit || 'Edit'}
                  </button>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-2">
                  <label className="font-bebas text-4xl">{t.password || 'Password'}:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    readOnly={!isEditing.password}
                    placeholder="••••••••"
                    className={`font-manrope text-base text-neutal-grey break-all text-right border-b border-gray-300 focus:outline-none ${
                      !isEditing.password ? 'text-gray-400 cursor-default' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditing((prev) => ({ ...prev, password: true }))}
                    className="text-blue-600 text-sm"
                  >
                    ✏️ {t.edit || 'Edit'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-neutal-black h-[50px] text-white font-bebas text-xl w-full rounded-[10px] mt-4"
                  disabled={loading}
                >
                  {loading ? t.saving : t.btn_save}
                </button>

                {successMessage && <p className="text-green-600">{successMessage}</p>}
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-neutal-black">
        <Footer language={language} setLanguage={setLanguage} />
      </footer>
    </div>
  );
};

export default UserProfile;
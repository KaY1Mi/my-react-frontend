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

useEffect(() => {
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const response = await fetch('https://my-django-backend-rrxo.onrender.com/api/user/profile/', {
        headers: { 'Authorization': `Token ${token}` },
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
  setFormData({ ...formData, [name]: value });
};

const handleSave = async () => {
  setLoading(true);
  setSuccessMessage('');
  setErrorMessage('');

  const token = localStorage.getItem('token');
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
      setFormData({ ...formData, password: '' }); // очищаем пароль
    } else {
      setErrorMessage(data?.message || t.profile_update_error);
    }
  } catch (error) {
    setErrorMessage(t.profile_update_error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const response = await fetch('https://my-django-backend-rrxo.onrender.com/api/user/profile/', {
          headers: { 'Authorization': `Token ${token}` },
        });

        if (!response.ok) throw new Error(t.profile_load_error);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate, language, t.profile_load_error]);

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
            <button onClick={() => navigate("/profile")} className='text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue'>
              {t.link_userprofile}
            </button>
            <button onClick={() => navigate("/likecourses")} className='text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue'>
              {t.link_linkcourses}
            </button>
            <button onClick={() => setShowLogoutModal(true)} className='text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue'>
              {t.link_logout}
            </button>
          </div>

          {showLogoutModal && (
            <LogoutModal onClose={() => setShowLogoutModal(false)} onConfirm={handleLogout} language={language} />
          )}

          <div className="col-span-full px-5 md:col-span-2 md:col-start-2 xl:col-span-3 xl:col-start-6">
            <div className="grid grid-cols-1 gap-5">
              <div className="grid grid-cols-1 gap-4 w-full">
                <h2 className="text-3xl font-bold font-bebas text-center">
                  {userData.username || t.no_username}
                </h2>
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2">
                  <p className="font-bebas text-4xl">{t.email}:</p>
                  <p className="font-manrope text-base text-neutal-grey break-all text-right">
                    {userData.email || t.no_email}
                  </p>
                </div>

                {/* Пример будущей кнопки "Сохранить", если добавишь редактирование */}
                <button
                  type="button"
                  className="bg-neutal-black h-[50px] text-white font-bebas text-xl w-full rounded-[10px] mt-4 opacity-50 cursor-not-allowed"
                  disabled
                >
                  {loading ? t.saving : t.btn_save}
                </button>
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
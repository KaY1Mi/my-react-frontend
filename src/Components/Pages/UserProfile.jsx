import React, { useContext, useEffect, useRef, useState } from 'react';
import HeaderBlack from '../HeaderBlack';
import Footer from '../Footer';
import LogoutModal from '../LogoutModal';
import plus from '../../Image/svg/plus.svg';
import defaultAvatar1 from '../../Image/avatars/default1.png';
import defaultAvatar2 from '../../Image/avatars/default2.png';
import defaultAvatar3 from '../../Image/avatars/default3.png';
import { useNavigate } from 'react-router-dom';
import { translations } from '../translation';
import { LanguageContext } from './LanguageContext';

const UserProfile = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = translations[language];
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  // Локальные стандартные аватарки
  const defaultAvatars = [
    { id: 1, image: defaultAvatar1, backendPath: '/media/avatars/default1.png' },
    { id: 2, image: defaultAvatar2, backendPath: '/media/avatars/default2.png' },
    { id: 3, image: defaultAvatar3, backendPath: '/media/avatars/default3.png' }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await fetch('https://my-django-backend-rrxo.onrender.com/api/user/profile/', {
          headers: { 'Authorization': `Token ${token}` },
        });

        if (!res.ok) throw new Error(t.profile_load_error);
        const data = await res.json();
        setUserData(data);
        
        // Определяем, какой аватар установлен
        const foundAvatar = defaultAvatars.find(
          avatar => data.avatar?.includes(avatar.backendPath.split('/').pop())
        );
        
        setAvatarPreview(
          foundAvatar 
            ? foundAvatar.image 
            : data.avatar?.startsWith('http') 
              ? data.avatar 
              : data.avatar 
                ? `https://my-django-backend-rrxo.onrender.com${data.avatar}`
                : null
        );
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate, language]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert(t.avatar_error_type);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t.avatar_upload_error);
      return;
    }

    setSelectedFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setIsAvatarChanged(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedFile) return;

    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const res = await fetch('https://my-django-backend-rrxo.onrender.com/api/change-avatar/', {
        method: 'PATCH',
        headers: { 'Authorization': `Token ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error(t.avatar_upload_error);

      const data = await res.json();
      setAvatarPreview(
        data.avatar.startsWith('http') 
          ? data.avatar 
          : `https://my-django-backend-rrxo.onrender.com${data.avatar}`
      );
      setIsAvatarChanged(false);
      alert(t.changes_saved);
    } catch (err) {
      console.error(err);
      alert(t.avatar_upload_error);
    }
  };

  const handleSelectDefaultAvatar = async (avatar) => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const res = await fetch('https://my-django-backend-rrxo.onrender.com/api/change-avatar/', {
        method: 'PATCH',
        headers: { 
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: avatar.backendPath }),
      });

      if (!res.ok) throw new Error(t.avatar_save_error);

      setAvatarPreview(avatar.image);
      setIsAvatarChanged(false);
      alert(t.changes_saved);
    } catch (err) {
      console.error(err);
      alert(t.avatar_save_error);
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
          {/* Меню */}
          <div className="col-span-full xl:col-span-4">
            <button 
              onClick={() => navigate("/profile")}
              className='text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue'>
              {t.link_userprofile}  
            </button>
            <button 
              onClick={() => navigate("/likecourses")}
              className='text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue'>
              {t.link_linkcourses}  
            </button>
            <button
              onClick={() => setShowLogoutModal(true)} 
              className='text-2xl col-span-full px-2.5 py-2.5 w-full border-b border-black text-neutal-black font-bebas text-left md:text-4xl md:h-[60px] md:px-5 hover:bg-neutal-blue'>
              {t.link_logout}  
            </button>
          </div>

          {showLogoutModal && (
            <LogoutModal 
              onClose={() => setShowLogoutModal(false)}
              onConfirm={handleLogout}
              language={language}
            />
          )}

          {/* Профиль */}
          <div className="col-span-full px-5 md:col-span-2 md:col-start-2 xl:col-span-3 xl:col-start-6">
            <div className="grid grid-cols-1 gap-5">
              <div 
                className="relative w-[250px] h-[250px] justify-self-center cursor-pointer group xl:justify-self-start"
                onClick={handleAvatarClick}
              >
                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-2 border-gray-300">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-lg">{t.no_avatar}</div>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 w-[55px] h-[55px] bg-black rounded-full flex items-center justify-center">
                  <img src={plus} alt="Add avatar" className="w-6 h-6" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Стандартные аватарки */}
              <div className="flex justify-center gap-4 mt-2">
                {defaultAvatars.map((avatar) => (
                  <div 
                    key={avatar.id}
                    className={`w-14 h-14 rounded-full overflow-hidden cursor-pointer border-2 ${
                      avatarPreview === avatar.image ? 'border-blue-500' : 'border-gray-300'
                    } hover:border-blue-400 transition-colors`}
                    onClick={() => handleSelectDefaultAvatar(avatar)}
                    title={`Аватар ${avatar.id}`}
                  >
                    <img 
                      src={avatar.image} 
                      alt={`Default avatar ${avatar.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

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

                <button 
                  type="button" 
                  className={`bg-neutal-black h-[50px] text-white font-bebas text-xl w-full rounded-[10px] mt-4 ${
                    !isAvatarChanged ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleSaveChanges}
                  disabled={!isAvatarChanged}
                >
                  {t.btn_save}
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
import React, { useEffect, useRef, useState, useContext } from 'react';
import HeaderBlack from '../HeaderBlack';
import { translations } from '../translation';
import { useNavigate } from 'react-router-dom';
import plus from '../../Image/svg/plus.svg';
import Footer from '../Footer';
import LogoutModal from '../LogoutModal';
import { LanguageContext } from './LanguageContext';
import { supabase } from '../../supabaseClient';

const UserProfile = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const fileInputRef = useRef(null);

  // Получаем пользователя из Supabase Auth
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          navigate('/login');
          return;
        }

        setUserData({
          id: user.id,
          email: user.email,
          username: user.user_metadata?.username || user.email,
          avatar: null,
        });

        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSaveChanges = async () => {
    if (!isAvatarChanged || !fileInputRef.current?.files[0]) {
      alert(t.no_changes || "Нет изменений для сохранения");
      return;
    }

    const file = fileInputRef.current.files[0];
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("User not authenticated");
      navigate('/login');
      return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `avatar.${fileExt}`;
    const filePath = `avatars/${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data: { publicUrl }, error: urlError } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (urlError) {
      alert(urlError.message);
      return;
    }

    setAvatarPreview(publicUrl);
    setIsAvatarChanged(false);
    setUserData(prev => ({ ...prev, avatar: publicUrl }));

    alert(t.changes_saved || "ИЗМЕНЕНИЯ СОХРАНЕНЫ");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(t.avatar_error_type);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t.avatar_upload_error);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setIsAvatarChanged(true);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowLogoutModal(false);
    navigate('/login');
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  if (!userData) return <div className="flex justify-center items-center h-screen">No user data available</div>;

  return (
    <div className="overflow-hidden min-h-screen">
      <main className="min-h-screen">
        <HeaderBlack language={language} />

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
              {/* Аватар */}
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

              {/* Информация */}
              <div className="grid grid-cols-1 gap-4 w-full">
                <h2 className="text-3xl font-bold font-bebas text-center">
                  {userData.username || 'No username'}
                </h2>

                <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2">
                  <p className="font-bebas text-4xl">{t.email}:</p>
                  <p className="font-manrope text-base text-neutal-grey break-all text-right">
                    {userData.email || 'No email'}
                  </p>
                </div>

                <button
                  type="button"
                  className="bg-neutal-black h-[50px] text-white font-bebas text-xl w-full rounded-[10px] mt-4"
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
        <Footer language={language} />
      </footer>
    </div>
  );
};

export default UserProfile;
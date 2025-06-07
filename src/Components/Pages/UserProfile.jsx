import React, { useEffect, useState } from "react";
import { useGetUserProfileQuery } from "../../redux/api/userApi";
import { useUpdateAvatarMutation } from "../../redux/api/avatarApi";
import { defaultAvatars } from "../../constants";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { data, isLoading, isError } = useGetUserProfileQuery();
  const [updateAvatar] = useUpdateAvatarMutation();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDefaultPath, setSelectedDefaultPath] = useState(null);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  useEffect(() => {
    if (data?.avatar) {
      const avatarUrl = getFullAvatarUrl(data.avatar);
      setAvatarPreview(avatarUrl);

      // Если это дефолтный аватар — подсвечиваем
      const matchedDefault = defaultAvatars.find((avatar) =>
        avatarUrl.includes(avatar.backendPath)
      );
      if (matchedDefault) {
        setSelectedDefaultPath(matchedDefault.backendPath);
      }
    }
  }, [data]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setSelectedDefaultPath(null); // сбрасываем дефолтный выбор
      setIsAvatarChanged(true);
    }
  };

  const handleSelectDefaultAvatar = (avatar) => {
    setSelectedDefaultPath(avatar.backendPath);
    setAvatarPreview(avatar.image);
    setSelectedFile(null);
    setIsAvatarChanged(true);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("avatar", selectedFile);
        await updateAvatar(formData).unwrap();
      } else if (selectedDefaultPath) {
        await updateAvatar({ avatar: selectedDefaultPath }).unwrap();
      }
      toast.success("Аватар успешно обновлён!");
      setIsAvatarChanged(false);
    } catch (error) {
      toast.error("Ошибка при сохранении аватара");
    }
  };

  const getFullAvatarUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${window.location.origin}${path}`;
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Произошла ошибка при загрузке профиля</p>;
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
              <div className="relative w-[250px] h-[250px] justify-self-center cursor-pointer group xl:justify-self-start" onClick={handleAvatarClick}>
                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-2 border-gray-300">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="User avatar" className="w-full h-full object-cover" onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar1;
                      setAvatarPreview(defaultAvatar1);
                    }} />
                  ) : (
                    <div className="text-gray-400 text-lg">{t.no_avatar}</div>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 w-[55px] h-[55px] bg-black rounded-full flex items-center justify-center">
                  <img src={plus} alt="Add avatar" className="w-6 h-6" />
                </div>
                <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
              </div>

              <div className="flex justify-center gap-4 mt-2">
                {defaultAvatars.map((avatar) => (
                  <div 
                  key={avatar.id}
                  className={`w-14 h-14 rounded-full overflow-hidden cursor-pointer border-2 ${
                    avatarPreview?.includes(avatar.backendPath) ? 'border-blue-500' : 'border-gray-300'
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

                <button type="button" className={`bg-neutal-black h-[50px] text-white font-bebas text-xl w-full rounded-[10px] mt-4 ${!isAvatarChanged ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleSaveChanges} disabled={!isAvatarChanged || loading}>
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

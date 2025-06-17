import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Components/Pages/Home";
import RegPage from "./Components/Pages/RegPage";
import Login from "./Components/Pages/Login";
import Case from "./Components/Pages/Case";
import Articles from "./Components/Pages/Articles";
import UsefulPage from "./Components/Pages/UsefulPage";
import Courses from "./Components/Pages/Courses";
import PayAll from "./Components/Pages/PayAll";
import UserProfile from "./Components/Pages/UserProfile";
import LikeCourses from "./Components/Pages/LikeCourses";
import Vacancies from "./Components/Pages/Vacancies";
import VacancieOne from "./Components/Pages/Vacancie/VacancieOne";
import VacancieTwo from "./Components/Pages/Vacancie/VacancieTwo";
import ColorOne from "./Components/Pages/Articles/Color/ColorOne";
import ColorTwo from "./Components/Pages/Articles/Color/ColorTwo";
import ColorThree from "./Components/Pages/Articles/Color/ColorThree";
import ColorFour from "./Components/Pages/Articles/Color/ColorFour";
import Figma from "./Components/Pages/Courses/Figma/Figma";
import FigmaLesson from "./Components/Pages/Lessons/Figma/FigmaLesson";
import FigmaLesson2 from './Components/Pages/Lessons/Figma/FigmaLesson2';
import TOne from './Components/Pages/Articles/Typography/TOne';
import TTwo from './Components/Pages/Articles/Typography/TTwo';
import TThree from './Components/Pages/Articles/Typography/TThree';
import TFour from './Components/Pages/Articles/Typography/TFour';
import POne from './Components/Pages/Articles/Psychology/Pone';
import PTwo from './Components/Pages/Articles/Psychology/PTwo';
import PThree from './Components/Pages/Articles/Psychology/PThree';
import PFour from './Components/Pages/Articles/Psychology/PFour';
import TrendOne from './Components/Pages/Articles/Trends/TrendOne';
import TrendTwo from './Components/Pages/Articles/Trends/TrendTwo';
import TrendThree from './Components/Pages/Articles/Trends/TrendThree';
import TrendFour from './Components/Pages/Articles/Trends/TrendFour';
import { LanguageProvider } from "./Components/Pages/LanguageContext";
import VacancieThree from "./Components/Pages/Vacancie/VacancieThree";
import VacancieFour from './Components/Pages/Vacancie/VacancieFour';
import VacancieFive from './Components/Pages/Vacancie/VacancieFive';
import VacancieSix from './Components/Pages/Vacancie/VacancieSix';
import VacancieSeven from './Components/Pages/Vacancie/VacancieSeven';
import VacancieEight from './Components/Pages/Vacancie/VacancieEight';
import Tilda from './Components/Pages/Courses/Tilda/Tilda';
import AfterEffects from "./Components/Pages/Courses/AfterEffects/AfterEffects";
import Ux from './Components/Pages/Courses/Ux/Ux';
import SitePro from "./Components/Pages/Courses/SitePro/SitePro";
import FigmaLesson3 from "./Components/Pages/Lessons/Figma/FigmaLesson3";
import TildaLesson from "./Components/Pages/Lessons/Tilda/TildaLesson";
import TildaLesson2 from "./Components/Pages/Lessons/Tilda/TildaLesson2";
import TildaLesson3 from "./Components/Pages/Lessons/Tilda/TildaLesson3";
import AfterEffects1 from "./Components/Pages/Lessons/Ae/AfterEffects1";
import AfterEffects2 from './Components/Pages/Lessons/Ae/AfterEffects2';
import AfterEffects3 from './Components/Pages/Lessons/Ae/AfterEffects3';
import PayFixed from "./Components/Pages/PayFixed";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* Основные маршруты */}
            <Route path="/" element={<Home />} />
            <Route path="/regpage" element={<RegPage />} />
            <Route path="/login" element={<Login />} />
            
            {/* Профиль с обработкой неавторизованного доступа */}
            <Route 
              path="/profile/" 
              element={
                localStorage.getItem('token') 
                  ? <UserProfile /> 
                  : <Navigate to="/login" replace />
              } 
            />
            
            {/* Дублирующий маршрут для совместимости */}
            <Route path="/userprofile" element={<Navigate to="/profile/" replace />} />

            {/* Остальные маршруты */}
            <Route path="/case-project" element={<Case />} />
            <Route path="/acticles" element={<Articles />} />
            <Route path="/useful" element={<UsefulPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/payall" element={<PayAll />} />
            <Route path="/payfixed" element={<PayFixed />} />
            <Route path="/likecourses" element={<LikeCourses />} />
            
            {/* Вакансии */}
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/vacancie-one" element={<VacancieOne />} />
            <Route path="/vacancie-two" element={<VacancieTwo />} />
            <Route path="/vacancie-three" element={<VacancieThree />} />
            <Route path="/vacancie-four" element={<VacancieFour />} />
            <Route path="/vacancie-five" element={<VacancieFive />} />
            <Route path="/vacancie-six" element={<VacancieSix />} />
            <Route path="/vacancie-seven" element={<VacancieSeven />} />
            <Route path="/vacancie-eight" element={<VacancieEight />} />
            
            {/* Статьи */}
            <Route path="/color-one" element={<ColorOne />} />
            <Route path="/color-two" element={<ColorTwo />} />
            <Route path="/color-three" element={<ColorThree />} />
            <Route path="/color-four" element={<ColorFour />} />
            
            <Route path="/t-one" element={<TOne />} />
            <Route path="/t-two" element={<TTwo />} />
            <Route path="/t-three" element={<TThree />} />
            <Route path="/t-four" element={<TFour />} />
            
            <Route path="/p-one" element={<POne />} />
            <Route path="/p-two" element={<PTwo />} />
            <Route path="/p-three" element={<PThree />} />
            <Route path="/p-four" element={<PFour />} />
            
            <Route path="/trend-one" element={<TrendOne />} />
            <Route path="/trend-two" element={<TrendTwo />} />
            <Route path="/trend-three" element={<TrendThree />} />
            <Route path="/trend-four" element={<TrendFour />} />
            
            {/* Курсы */}
            <Route path="/figma-course" element={<Figma />} />
            <Route path="/tilda-course" element={<Tilda />} />
            <Route path="/ae-course" element={<AfterEffects />} />
            <Route path="/ux-course" element={<Ux />} />
            <Route path="/pro-course" element={<SitePro />} />
            
            {/* Уроки */}
            <Route path="/figma-lesson-one" element={<FigmaLesson />} />
            <Route path="/figma-lesson-two" element={<FigmaLesson2 />} />
            <Route path="/figma-lesson-three" element={<FigmaLesson3 />} />
            <Route path="/tilda-lesson-one" element={<TildaLesson />} />
            <Route path="/tilda-lesson-two" element={<TildaLesson2 />} />
            <Route path="/tilda-lesson-three" element={<TildaLesson3 />} />
            <Route path="/aftereffects-lesson-one" element={<AfterEffects1 />} />
            <Route path="/aftereffects-lesson-two" element={<AfterEffects2 />} />
            <Route path="/aftereffects-lesson-three" element={<AfterEffects3 />} />
            
            {/* Резервный маршрут для 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;
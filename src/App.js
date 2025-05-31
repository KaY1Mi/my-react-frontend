import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import FigmaLesson2 from './Components/Pages/Lessons/Figma/FigmaLesson2'
import TOne from './Components/Pages/Articles/Typography/TOne'
import TTwo from './Components/Pages/Articles/Typography/TTwo'
import TThree from './Components/Pages/Articles/Typography/TThree'
import TFour from './Components/Pages/Articles/Typography/TFour'
import POne from './Components/Pages/Articles/Psychology/Pone'
import PTwo from './Components/Pages/Articles/Psychology/PTwo'
import PThree from './Components/Pages/Articles/Psychology/PThree'
import PFour from './Components/Pages/Articles/Psychology/PFour'
import TrendOne from './Components/Pages/Articles/Trends/TrendOne'
import TrendTwo from './Components/Pages/Articles/Trends/TrendTwo'
import TrendThree from './Components/Pages/Articles/Trends/TrendThree'
import TrendFour from './Components/Pages/Articles/Trends/TrendFour'
import { LanguageProvider } from "./Components/Pages/LanguageContext";
import VacancieThree from "./Components/Pages/Vacancie/VacancieThree";
import VacancieFour from './Components/Pages/Vacancie/VacancieFour'
import VacancieFive from './Components/Pages/Vacancie/VacancieFive';
import VacancieSix from './Components/Pages/Vacancie/VacancieSix'
import VacancieSeven from './Components/Pages/Vacancie/VacancieSeven'
import VacancieEight from './Components/Pages/Vacancie/VacancieEight'
import Tilda from './Components/Pages/Courses/Tilda/Tilda'
import AfterEffects from "./Components/Pages/Courses/AfterEffects/AfterEffects";
import Ux from './Components/Pages/Courses/Ux/Ux'
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
          <Route path="/regpage" element={<RegPage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/profile" element={<UserProfile/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/case-project" element={<Case/>}></Route>
          <Route path="/acticles" element={<Articles/>}></Route>
          <Route path="/useful" element={<UsefulPage/>}></Route>
          <Route path="/courses" element={<Courses/>}></Route>
          <Route path="/payall" element={<PayAll/>}></Route>
          <Route path="/payfixed" element={<PayFixed></PayFixed>}></Route>
          <Route path="/userprofile" element={<UserProfile/>}></Route>
          <Route path="/likecourses" element={<LikeCourses/>}></Route>
          {/* Vacancie */}
          <Route path="/vacancies" element={<Vacancies/>}></Route>
          <Route path="/vacancie-one" element={<VacancieOne/>}></Route>
          <Route path="/vacancie-two" element={<VacancieTwo></VacancieTwo>}></Route>
          <Route path="/vacancie-three" element={<VacancieThree></VacancieThree>}></Route>
          <Route path="/vacancie-four" element={<VacancieFour></VacancieFour>}></Route>
          <Route path="/vacancie-five" element={<VacancieFive></VacancieFive>}></Route>
          <Route path="/vacancie-six" element={<VacancieSix></VacancieSix>}></Route>
          <Route path="/vacancie-seven" element={<VacancieSeven></VacancieSeven>}></Route>
          <Route path="/vacancie-eight" element={<VacancieEight></VacancieEight>}></Route>
          {/* Страница статьи */}
          <Route path="/color-one" element={<ColorOne/>}></Route>
          <Route path="/color-two" element={<ColorTwo/>}></Route>
          <Route path="/color-three" element={<ColorThree></ColorThree>}></Route>
          <Route path="/color-four" element={<ColorFour></ColorFour>}></Route>

          <Route path="/t-one" element={<TOne></TOne>}></Route>
          <Route path="/t-two" element={<TTwo></TTwo>}></Route>
          <Route path="/t-three" element={<TThree></TThree>}></Route>
          <Route path="/t-four" element={<TFour></TFour>}></Route>

          <Route path="/p-one" element={<POne></POne>}></Route>
          <Route path="/p-two" element={<PTwo></PTwo>}></Route>
          <Route path="/p-three" element={<PThree></PThree>}></Route>
          <Route path="/p-four" element={<PFour></PFour>}></Route>
          
          <Route path="/trend-one" element={<TrendOne></TrendOne>}></Route>
          <Route path="/trend-two" element={<TrendTwo></TrendTwo>}></Route>
          <Route path="/trend-three" element={<TrendThree></TrendThree>}></Route>
          <Route path="/trend-four" element={<TrendFour></TrendFour>}></Route>
          {/* Страница курса по Фигма */}
          <Route path="/figma-course" element={<Figma/>}></Route>
          <Route path="/tilda-course" element={<Tilda></Tilda>}></Route>
          <Route path="/ae-course" element={<AfterEffects></AfterEffects>}></Route>
          <Route path="/ux-course" element={<Ux></Ux>}></Route>
          <Route path="/pro-course" element={<SitePro></SitePro>}></Route>
          {/* Страница первого урока по фигма */}
          <Route path="/figma-lesson-one" element={<FigmaLesson/>}></Route>
          <Route path="/figma-lesson-two" element={<FigmaLesson2/>}></Route>
          <Route path="/figma-lesson-three" element={<FigmaLesson3/>}></Route>
          <Route path="/tilda-lesson-one" element={<TildaLesson></TildaLesson>}></Route>
          <Route path="/tilda-lesson-two" element={<TildaLesson2></TildaLesson2>}></Route>
          <Route path="/tilda-lesson-three" element={<TildaLesson3></TildaLesson3>}></Route>
          <Route path="/aftereffects-lesson-one" element={<AfterEffects1></AfterEffects1>}></Route>
          <Route path="/aftereffects-lesson-two" element={<AfterEffects2></AfterEffects2>}></Route>
          <Route path="/aftereffects-lesson-three" element={<AfterEffects3></AfterEffects3>}></Route>
        </Routes>
      </BrowserRouter>



      </LanguageProvider>

    </div>
    
  );
}

export default App;

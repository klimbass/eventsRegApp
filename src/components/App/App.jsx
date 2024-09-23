import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import RegisterPage from "../../pages/RegisterPage/RegisterPage.jsx";
import ParticipantsPage from "../../pages/ParticipantsPage/ParticipantsPage.jsx";
import css from "./App.module.css";

export default function App() {
  return (
    <div className={css.wrap}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register/:cardId" element={<RegisterPage />} />
        <Route path="/participants/:cardId" element={<ParticipantsPage />} />
        {/* <Route path="*" element={<NotFoundPage />} />  */}
      </Routes>
    </div>
  );
}

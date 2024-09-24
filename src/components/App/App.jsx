import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import RegisterPage from "../../pages/RegisterPage/RegisterPage.jsx";
import ParticipantsPage from "../../pages/ParticipantsPage/ParticipantsPage.jsx";
import css from "./App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";

export default function App() {
  return (
    <div className={css.wrap}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register/:cardId" element={<RegisterPage />} />
        <Route path="/participants/:cardId" element={<ParticipantsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import RegisterPage from "../../pages/RegisterPage/RegisterPage.jsx";
import ParticipantsPage from "../../pages/ParticipantsPage/ParticipantsPage.jsx";
import css from "./App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickToHome = () => {
    navigate("/?page=1&sortBy=date");
  };
  return (
    <div className={css.wrap}>
      <h1 className={css.title} onClick={handleClickToHome}>
        Events Registration
      </h1>
      <Routes>
        <Route path="/" element={<HomePage key={location.search} />} />
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

import { useParams } from "react-router-dom";
import css from "./RegisterPage.module.css";

import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import EventDetails from "../../components/EventDetails/EventDetails.jsx";
import { useState } from "react";

export default function RegisterPage() {
  const { cardId } = useParams();
  const [changer, setChanger] = useState(false);

  return (
    <div className={css.registerPage}>
      <RegistrationForm cardId={cardId} setChanger={setChanger} />
      <EventDetails cardId={cardId} changer={changer} />
    </div>
  );
}

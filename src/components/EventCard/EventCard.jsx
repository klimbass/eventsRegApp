import { Link } from "react-router-dom";
import css from "./EventCard.module.css";

export default function EventCard({ event }) {
  const cardId = event._id;
  return (
    <div className={css.card}>
      <div className={css.description}>
        <h3>{event.title}</h3>
        <p>Date: {event.date}</p>
        <p className={css.desc}>{event.description}</p>
        <h4 className={css.org}>
          {" "}
          <span>by:</span> {event.organizer}
        </h4>
      </div>
      <div className={css.buttonBox}>
        <Link to={`/register/${cardId}`}>Register</Link>
        <Link to={`/participants/${cardId}`}>View</Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import css from "./EventDetailsModal.module.css";

export default function EventDetailsModal({ event }) {
  const participantsCount = event.participantsList.length;
  return (
    <div className={css.wrap}>
      <h2>{event.title}</h2>
      <div>
        <p className={css.textTitle}>Description: </p>
        <p>{event.description}</p>
      </div>
      <div>
        <Link>
          <p className={css.textTitle}>Date: {event.date}</p>
        </Link>
      </div>
      <div className={css.partWrap}>
        <p>Participants: {participantsCount}</p>
        <Link to={`/participants/${event._id}`}>
          <p>See all participants</p>
        </Link>
      </div>
      <div className={css.organizer}>
        <p>Organizer:</p>
        <Link>
          <h3>{event.organizer}</h3>
        </Link>
      </div>
    </div>
  );
}

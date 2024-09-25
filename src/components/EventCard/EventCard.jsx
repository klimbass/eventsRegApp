import { Link } from "react-router-dom";
import css from "./EventCard.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal.jsx";
import EventDetailsModal from "../EventDetailsModal/EventDetailsModal.jsx";

export default function EventCard({ event }) {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
  };
  const cardId = event._id;
  return (
    <div className={css.card} onClick={handleClick}>
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
      {showModal && (
        <Modal onClose={handleClick}>
          <EventDetailsModal event={event} />
        </Modal>
      )}
    </div>
  );
}

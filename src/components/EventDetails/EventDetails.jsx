import axios from "axios";
import { useEffect, useState } from "react";
import css from "./EventDetails.module.css";

export default function EventDetails({ cardId, changer }) {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCardInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/events/${cardId}`);
        setCard(response.data.data);
        setLoading(false);

        return;
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    };
    getCardInfo();
  }, [cardId, changer]);

  return (
    <div className={css.wrap}>
      <p className={css.boxName}>Event details</p>
      <div className={css.boxDescription}>
        {loading ? (
          <p>...loading</p>
        ) : (
          <>
            <h3>{card.title}</h3>
            <div>
              <p>Description:</p>
              <p>{card.description}</p>
            </div>

            <p>
              Participants:
              {card.participantsList.length || "Not participants yet"}
            </p>
            <div>
              <span>Organizer:</span>
              <h4>{card.organizer}</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

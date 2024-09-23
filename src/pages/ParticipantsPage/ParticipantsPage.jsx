import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./ParticipantsPage.module.css";

export default function ParticipantsPage() {
  const { cardId } = useParams();
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCardInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/events/${cardId}`);
        // console.log(response.data.data);
        setCard(response.data.data);
        setLoading(false);

        return card;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCardInfo();
  }, [cardId]);

  const { title, participantsList = [] } = card;
  // console.dir(card);

  return (
    <div>
      {loading ? (
        "...loading"
      ) : (
        <>
          <h3>"{title}" participants</h3>
          {participantsList.length > 0 ? (
            <ul className={css.partsList}>
              {participantsList.map((user) => {
                return (
                  <li key={user.userId}>
                    <h4>{user.userName}</h4>
                    <p>{user.userEmail}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No participants</p>
          )}
        </>
      )}
    </div>
  );
}

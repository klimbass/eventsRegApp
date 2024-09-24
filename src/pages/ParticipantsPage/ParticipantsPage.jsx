import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./ParticipantsPage.module.css";

export default function ParticipantsPage() {
  const { cardId } = useParams();
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    const getCardInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/events/${cardId}`);
        setCard(response.data.data);
        setLoading(false);

        return card;
      } catch (error) {
        setLoading(false);
      }
    };
    getCardInfo();
  }, [cardId]);

  const { title, participantsList = [] } = card;
  const currentParticipantsList = participantsList.filter(
    (item) =>
      item.userName.toLowerCase().includes(searchParams.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(searchParams.toLowerCase())
  );

  return (
    <div className={css.wrap}>
      {loading ? (
        "...loading"
      ) : (
        <>
          <h3>"{title}" participants</h3>
          <input
            type="text"
            placeholder="seach"
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
            className={css.searchField}
          />
          {currentParticipantsList.length > 0 ? (
            <ul className={css.partsList}>
              {currentParticipantsList.map((user) => {
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

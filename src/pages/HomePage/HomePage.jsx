import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard.jsx";
import css from "./HomePage.module.css";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
axios.defaults.baseURL = "https://back-eventsregapp.onrender.com";
// axios.defaults.baseURL = "http://localhost:3000";

export default function HomePage() {
  const [eventsList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);

  useEffect(() => {
    const getEventsList = async () => {
      try {
        setLoading(true);
        const events = await axios.get("/events", {
          params: {
            page: page,
            perPage: 8,
          },
        });
        setEventList(events.data.data.data);
        setResponse(events.data.data);
        // console.log(events.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getEventsList();
  }, [page]);
  const handleBack = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      navigate(`?page=${newPage}`);
    }
  };
  const handleFront = () => {
    const newPage = page + 1;
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };
  const handleGoPage = (i) => {
    navigate(`?page=${i}`);

    setPage(i);
  };
  const { totalPages } = response;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        type="button"
        onClick={() => handleGoPage(i)}
        key={i}
        className={clsx(css.page, { [css.currentPage]: i == page })}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={css.homePage}>
      <h1 className={css.title}>Events</h1>
      {loading ? <p className={css.loading}>...loading </p> : null}
      {eventsList.length > 0 && (
        <>
          <ul className={css.list}>
            {eventsList.map((event) => (
              <li key={event._id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
          <div className={css.buttonWrap}>
            <button type="button" onClick={handleBack} disabled={page <= 1}>
              <FaCircleChevronLeft size={20} />
            </button>
            {pages}
            <button
              type="button"
              onClick={handleFront}
              disabled={page >= totalPages}
            >
              <FaCircleChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

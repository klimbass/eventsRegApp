import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard.jsx";
import css from "./HomePage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";
import SortEventsBy from "../../components/SortEventsBy/SortEventsBy.jsx";
import { toast } from "react-toastify";
// const serverURL = 'https://back-eventsregapp.onrender.com'
const serverURL = "http://localhost:3000";

axios.defaults.baseURL = serverURL;

export default function HomePage() {
  const [eventsList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "date");
  const [sortOrder] = useState("asc");
  useEffect(() => {
    const getEventsList = async () => {
      try {
        setLoading(true);
        const events = await axios.get("/events", {
          params: {
            page: page,
            perPage: 8,
            sortBy,
            sortOrder,
          },
        });
        setEventList(events.data.data.data);
        setResponse(events.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);

        toast.error("Something went wrong");
      }
    };
    getEventsList();
  }, [page, sortBy]);

  const handleBack = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      navigate(`?page=${newPage}&sortBy=${sortBy}`);
    }
  };

  const handleFront = () => {
    const newPage = page + 1;
    setPage(newPage);
    navigate(`?page=${newPage}&sortBy=${sortBy}`);
  };

  const handleGoPage = (i) => {
    navigate(`?page=${i}&sortBy=${sortBy}`);

    setPage(i);
  };

  const handleSortBy = (e) => {
    navigate(`?page=${page}&sortBy=${e.target.value}`);
    setSortBy(e.target.value);
  };

  const handleClickToHome = () => {
    navigate(`?page=1&sortBy=date`);
    setPage(1);
    setSortBy("date");
  };
  const { totalPages } = response;

  return (
    <div className={css.homePage}>
      <h1 className={css.title} onClick={handleClickToHome}>
        Events
      </h1>

      {loading ? <p className={css.loading}>...loading </p> : null}
      {eventsList.length > 0 && (
        <>
          <SortEventsBy handleSortBy={handleSortBy} sortBy={sortBy} />
          <ul className={css.list}>
            {eventsList.map((event) => (
              <li key={event._id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
          <Pagination
            totalPages={totalPages}
            page={page}
            handleGoPage={handleGoPage}
            handleBack={handleBack}
            handleFront={handleFront}
          />
        </>
      )}
    </div>
  );
}

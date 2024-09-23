import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    eventSource: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      await axios.patch(`/events/${cardId}`, formData);
      console.log("Registration successful");

      navigate("/");
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div className={css.formWrap}>
      <h3>Event registration</h3>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.field}>
          <label htmlFor="name">Full name</label>
          <input
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={css.field}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={css.field}>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={css.radio}>
          <div>
            <input
              type="radio"
              id="socialMedia"
              name="eventSource"
              value="social media"
              onChange={handleInputChange}
            />
            <label htmlFor="socialMedia">Social media</label>
          </div>
          <div>
            <input
              type="radio"
              name="eventSource"
              id="friends"
              value="friends"
              onChange={handleInputChange}
            />
            <label htmlFor="friends">Friends</label>
          </div>
          <div>
            <input
              type="radio"
              name="eventSource"
              id="foundMyself"
              value="foundMyself"
              onChange={handleInputChange}
            />
            <label htmlFor="found myself">Found myself</label>
          </div>
        </div>
        <button type="submit" className={css.button}>
          Register
        </button>
      </form>
    </div>
  );
}

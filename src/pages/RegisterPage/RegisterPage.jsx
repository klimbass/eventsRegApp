import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import css from "./RegisterPage.module.css";
import { differenceInYears } from "date-fns";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as Yup from "yup";

const MIN_AGE = 18;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .test(
      "is-old-enough",
      `You must be at least ${MIN_AGE} years old`,
      (value) => {
        return differenceInYears(new Date(), new Date(value)) >= MIN_AGE;
      }
    ),
  eventSource: Yup.string().required("Event source is required"),
});

export default function RegisterPage() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.setFullYear(today.getFullYear() - MIN_AGE)
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: eighteenYearsAgo,
    eventSource: "",
  });

  const [errors, setErrors] = useState({});

  const handleDatePicker = (e) => {
    setFormData({
      ...formData,
      dateOfBirth: e,
    });
  };
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
      await validationSchema.validate(formData, { abortEarly: false });
      await axios.patch(`/events/${cardId}`, formData);
      console.log("Registration successful");
      setErrors({});
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      console.log("Error submitting form:", err);
      const validationErrors = {};
      if (err.inner) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }
      setErrors(validationErrors);
      toast.error("Please check your form for errors.");
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
          {errors.name && <p className={css.error}>{errors.name}</p>}
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
          {errors.email && <p className={css.error}>{errors.email}</p>}
        </div>
        <div className={css.field}>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <DatePicker
            selected={formData.dateOfBirth}
            name="dateOfBirth"
            onChange={(date) => {
              handleDatePicker(date);
            }}
            popperPlacement="bottom-start"
            required
          />
          {errors.dateOfBirth && (
            <p className={css.error}>{errors.dateOfBirth}</p>
          )}
        </div>
        <div className={css.radioWrap}>
          <p>Where did you hear about thist event?</p>
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
              <label htmlFor="foundMyself">Found myself</label>
            </div>
            {errors.eventSource && (
              <p className={css.error}>{errors.eventSource}</p>
            )}
          </div>
        </div>
        <button type="submit" className={css.button}>
          Register
        </button>
      </form>
    </div>
  );
}

import css from "./SortEventsBy.module.css";

export default function SortEventsBy({ handleSortBy, sortBy }) {
  return (
    <div className={css.sortBy}>
      <p>Sort by:</p>
      <div className={css.radio}>
        <label htmlFor="title">Title</label>
        <input
          type="radio"
          name="sortBy"
          id="title"
          value="title"
          checked={sortBy === "title"}
          onChange={handleSortBy}
        />
      </div>
      <div className={css.radio}>
        <label htmlFor="date">Date</label>
        <input
          type="radio"
          name="sortBy"
          id="date"
          value="date"
          checked={sortBy === "date"}
          onChange={handleSortBy}
        />
      </div>
      <div className={css.radio}>
        <label htmlFor="organizer">Organizer</label>
        <input
          type="radio"
          name="sortBy"
          id="organizer"
          value="organizer"
          checked={sortBy === "organizer"}
          onChange={handleSortBy}
        />
      </div>
    </div>
  );
}

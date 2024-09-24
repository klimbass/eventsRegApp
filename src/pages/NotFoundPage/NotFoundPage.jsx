import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";
export default function NotFoundPage() {
  return (
    <div className={css.wrap}>
      <h3>Page not found</h3>
      <Link to="/">Go Home</Link>
    </div>
  );
}

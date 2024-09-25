import ReactDOM from "react-dom";
import css from "./Modal.module.css";
import { CgClose } from "react-icons/cg";

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className={css.modal}>
      <div className={css.modalContent}>
        {children}
        <button onClick={onClose} className={css.button}>
          <CgClose />
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

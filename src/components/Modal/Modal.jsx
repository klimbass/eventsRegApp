import ReactDOM from "react-dom";
import css from "./Modal.module.css";
import { CgClose } from "react-icons/cg";
import { useEffect } from "react";

export default function Modal({ children, onClose, isOpen }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

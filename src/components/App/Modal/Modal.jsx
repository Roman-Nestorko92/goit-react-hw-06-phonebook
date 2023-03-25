import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

function Modal({ children, onClose, title }) {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} onClick={onBackdropClick}>
      <div className={css.modal}>
        <div className={css.wrapper}>
          <h2 className={css.title}>{title}</h2>
          <button className={css.button} type="button" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

Modal.prototype = {
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;

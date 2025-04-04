import "./Modal.css";

const Modal = ({ children, closeModal }) => {
  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={closeModal}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

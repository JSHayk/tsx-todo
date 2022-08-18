import React from "react";
import "./index.scss";

interface TodoModalInterface {
  closeModal(): void;
  confirmModal(): void;
}

const TodoModal: React.FC<TodoModalInterface> = ({
  closeModal,
  confirmModal,
}) => {
  return (
    <div className="todo-modal">
      <div className="todo-modal-container">
        <h3 className="todo-modal-question">
          Are you sure you want to delete?
        </h3>
        <div className="row">
          <span onClick={confirmModal} className="todo-modal-answer">
            Yes
          </span>
          <span onClick={closeModal} className="todo-modal-answer">
            No
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;

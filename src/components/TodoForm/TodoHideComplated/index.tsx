import React, { useState } from "react";
import "./index.scss";
import { BsCheck } from "react-icons/bs";

interface TodoHideComplatedInterface {
  hideComplated(payloadState: boolean): void;
}

const TodoHideComplated: React.FC<TodoHideComplatedInterface> = ({
  hideComplated,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div className="todo-hide-complated">
      <div
        onClick={() => setIsActive((prev) => !prev)}
        style={isActive ? { backgroundColor: "#008594", border: "none" } : {}}
        className="todo-checkbox"
      >
        {isActive ? (
          <i>
            <BsCheck />
          </i>
        ) : undefined}
      </div>
      <span>Hide Complated</span>
    </div>
  );
};

export default TodoHideComplated;

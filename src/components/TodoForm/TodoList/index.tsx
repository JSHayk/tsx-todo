import React from "react";
import { ListItemInterface } from "../../../interfaces/ListItemInterface";
import { IoCloseOutline } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";

interface TodoListInterface {
  listItems: ListItemInterface[];
  openModal(id: number): void;
  doneTask(id: number): void;
}

const TodoList: React.FC<TodoListInterface> = ({
  listItems,
  openModal,
  doneTask,
}) => {
  return (
    <ul className="todo-form-list">
      {listItems.map((item) => {
        const { taskName, isDone, id } = item;
        return (
          <li key={id} className="todo-form-list-item">
            <div className="left-side">
              <div
                style={
                  isDone ? { backgroundColor: "#008594", border: "none" } : {}
                }
                onClick={() => doneTask(id)}
                className="todo-checkbox"
              >
                {isDone ? (
                  <i>
                    {" "}
                    <BsCheck />
                  </i>
                ) : undefined}
              </div>
              <span style={isDone ? { color: "#ACACAC" } : {}}>{taskName}</span>
            </div>
            <i onClick={() => openModal(id)}>
              <IoCloseOutline />
            </i>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;

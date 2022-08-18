import React, { useReducer, useState } from "react";
import {
  ADD_LIST_ITEM,
  CHANGE_DONE_STATE,
  DELETE_LIST_ITEM,
  HIDE_COMPLATED,
} from "../../constants/reducerActionTypes";
import { ListItemInterface } from "../../interfaces/ListItemInterface";
import "./index.scss";
import TodoFormAdd from "./TodoAdd";
import TodoHideComplated from "./TodoHideComplated";
import TodoList from "./TodoList";
import TodoModal from "./TodoModal";

const reducer = (
  state: ListItemInterface[],
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ADD_LIST_ITEM:
      return [
        ...state,
        {
          id: Date.now(),
          taskName: action.payload,
          isDone: false,
          isHidden: false,
        },
      ];
    case DELETE_LIST_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case CHANGE_DONE_STATE:
      return state.map((item) => {
        if (item.id === action.payload) {
          item.isDone = !item.isDone;
        }
        return item;
      });
    case HIDE_COMPLATED:
      return state.map((item) => {
        if (item.isDone) {
          item.isHidden = !item.isHidden;
        }
        return item;
      });
    default:
      break;
  }

  return state;
};

const TodoForm: React.FC = () => {
  const [listItems, dispatch] = useReducer(reducer, []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTodoId, setCurrentTodoId] = useState<number>();
  const [isHideComplatedOpen, setIsHideComplatedOpen] = useState<boolean>(true);

  const onAdd = (taskName: string) => {
    dispatch({
      type: ADD_LIST_ITEM,
      payload: taskName,
    });
  };

  const openModal = (id: number) => {
    setIsModalOpen(true);
    setCurrentTodoId(id);
  };

  const onDelete = () => {
    dispatch({
      type: DELETE_LIST_ITEM,
      payload: currentTodoId,
    });
    setIsModalOpen(false);
  };

  const changeDoneState = (id: number) => {
    dispatch({
      type: CHANGE_DONE_STATE,
      payload: id,
    });
  };

  const hideComplated = () => {
    dispatch({
      type: HIDE_COMPLATED,
      payload: "",
    });
  };

  return (
    <div className="todo-form">
      {isHideComplatedOpen ? (
        <TodoHideComplated hideComplated={hideComplated} />
      ) : undefined}
      <TodoFormAdd onAdd={onAdd} />
      <TodoList
        listItems={listItems}
        openModal={openModal}
        doneTask={changeDoneState}
      />
      {isModalOpen ? (
        <TodoModal
          closeModal={() => setIsModalOpen(false)}
          confirmModal={onDelete}
        />
      ) : undefined}
    </div>
  );
};

export default TodoForm;

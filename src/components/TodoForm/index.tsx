import React, { useEffect, useReducer, useState } from "react";
import {
  ADD_LIST_ITEM,
  CHANGE_DONE_STATE,
  DELETE_LIST_ITEM,
  HIDE_COMPLATED,
  LOCAL_STORE_DATA,
} from "../../constants/reducerActionTypes";
import { ListItemInterface } from "../../interfaces/ListItemInterface";
import { TodoFormReducer } from "../../store/TodoFormReducer";
import "./index.scss";
import TodoFormAdd from "./TodoAdd";
import TodoHideComplated from "./TodoHideComplated/index";
import TodoList from "./TodoList";
import TodoModal from "./TodoModal";

const TodoForm: React.FC = () => {
  const [listItems, dispatch] = useReducer(TodoFormReducer, []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTodoId, setCurrentTodoId] = useState<number>();
  const [isHideComplatedOpen, setIsHideComplatedOpen] =
    useState<boolean>(false);

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

  const hideComplated = (payloadState: boolean) => {
    dispatch({
      type: HIDE_COMPLATED,
      payload: payloadState,
    });
  };

  useEffect(() => {
    const savedTasks = JSON.parse(
      localStorage.getItem("listItems") || "[]"
    ) as ListItemInterface[];
    if (savedTasks) {
      dispatch({
        type: LOCAL_STORE_DATA,
        payload: savedTasks,
      });
    }
  }, []);

  useEffect(() => {
    setIsHideComplatedOpen(
      listItems.some((item: ListItemInterface) => item.isDone === true)
    );
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);

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

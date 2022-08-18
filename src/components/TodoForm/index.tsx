import React, { useEffect, useReducer, useState } from 'react'
import { ADD_LIST_ITEM, OPEN_DELETE_MODAL } from '../../constants/reducerActionTypes'
import { ListItemInterface } from '../../interfaces/ListItemInterface'
import "./index.scss"
import TodoFormAdd from './TodoAdd'
import TodoList from './TodoList'
import TodoModal from './TodoModal'

const reducer = (state: ListItemInterface[], action: {type: string, payload: any}) => {
    switch(action.type) {
        case ADD_LIST_ITEM:
        return [
            ...state,
            {
                id: Date.now(),
                taskName: action.payload,
                isDone: false
            }
        ]
        default:
            break;
    }

    return state;
}

const TodoForm: React.FC = () => {
    const [listItems, dispatch] = useReducer(reducer, []);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onAdd = (taskName: string) => {
        dispatch({
            type: ADD_LIST_ITEM,
            payload: taskName
        });
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    return (
        <div className='todo-form'>
            <TodoFormAdd onAdd={onAdd} />
            <TodoList listItems={ listItems } openModal={ openModal } />
            {isModalOpen ? <TodoModal /> : undefined}
        </div>
    )
}

export default TodoForm
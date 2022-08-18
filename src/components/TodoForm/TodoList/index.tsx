import React from 'react'
import { ListItemInterface } from '../../../interfaces/ListItemInterface'
import { IoCloseOutline } from "react-icons/io5"

interface TodoListInterface {
    listItems: ListItemInterface[],
    openModal(): void
}

const TodoList: React.FC<TodoListInterface> = ({ listItems, openModal }) => {
  return (
    <ul className='todo-form-list'>
        {
            listItems.map(item => {
                const { taskName, isDone, id } = item;
                return (
                    <li key={ id } className='todo-form-list-item'>
                        <div className='left-side'>
                            <div className='list-item-checkbox'></div>
                            <span>{ taskName }</span>
                        </div>
                        <i onClick={openModal}><IoCloseOutline /></i>
                    </li>
                )
            })
        }
    </ul>
  )
}

export default TodoList
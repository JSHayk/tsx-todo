import React, { useEffect, useRef, useState } from "react"
import { useDebaunce } from "../../../utils/hooks/useDebaunce";

interface TodoFormAddInterface {
    onAdd(taskName: string): void;
}

const TodoFormAdd: React.FC<TodoFormAddInterface> = ({ onAdd }) => {
    const [taskText, setTaskText] = useState<string>("");
    const [isWritten, setIsWritten] = useState<boolean>(false);
    const debaunce = useDebaunce();
    const inputRef = useRef<HTMLInputElement>(null);

    const changeHandleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        debaunce({ ms: 800, func: () => {
            setTaskText(val);
            setIsWritten(true);
        } })
    }
    const keyPressHandleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && isWritten && taskText.trim()) {
            onAdd(taskText); 
            inputRef.current!.value = "";
            setTaskText("");           
        }
    }
    const clickHandleInput = () => {
        if (isWritten && taskText.trim()) {
            onAdd(taskText); 
            inputRef.current!.value = "";
            setTaskText("");  
        }
    }

    return (
        <div className="todo-form-add">
            <label>Task</label>
            <div className="row">
                <input 
                    ref={ inputRef }
                    type="text" 
                    placeholder="Write here" 
                    onChange={changeHandleInput} 
                    onKeyDown={keyPressHandleInput}
                />
                <button onClick={clickHandleInput}>Add</button>
            </div>
        </div>
    )
}

export default TodoFormAdd
import React, { useEffect, useRef, useState } from "react";
import { useDebaunce } from "../../../utils/hooks/useDebaunce";

interface TodoFormAddInterface {
  onAdd(taskName: string): void;
}

const TodoFormAdd: React.FC<TodoFormAddInterface> = ({ onAdd }) => {
  const [taskText, setTaskText] = useState<string>("");
  const [isWritten, setIsWritten] = useState<boolean>(false);
  const debaunce = useDebaunce();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputStyles, setInputStyles] = useState<{ border: string }>({
    border: "1px solid #FFCD04",
  });
  const [isWarningTextShown, setIsWarningTextShown] = useState<boolean>(false);
  const [isPromptTextShown, setIsPromptTextShown] = useState<boolean>(false);

  const changeHandleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val.length === 54) {
      setInputStyles({
        border: "1px solid #FF3104",
      });
      setIsWarningTextShown(true);
    } else {
      setInputStyles({
        border: "1px solid #FFCD04",
      });
      setIsWarningTextShown(false);
    }
    debaunce({
      ms: 1000,
      func: () => {
        setTaskText(val);
        setIsWritten(true);
        setIsPromptTextShown(false);
        setInputStyles({
          border: "1px solid #FFCD04",
        });
      },
    });
  };
  const keyPressHandleInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (!isWritten && !taskText.trim()) {
        setInputStyles({
          border: "1px solid #FF3104",
        });
        setIsPromptTextShown(true);
      } else {
        onAdd(taskText);
        inputRef.current!.value = "";
        setTaskText("");
        setIsWritten(false);
      }
    }
  };
  const clickHandleInput = () => {
    if (!isWritten && !taskText.trim()) {
      setInputStyles({
        border: "1px solid #FF3104",
      });
      setIsPromptTextShown(true);
    } else {
      onAdd(taskText);
      inputRef.current!.value = "";
      setTaskText("");
      setIsWritten(false);
    }
  };

  return (
    <div className="todo-form-add">
      <label>Task</label>
      <div className="row">
        <div className="input-container">
          <input
            style={inputStyles}
            ref={inputRef}
            type="text"
            maxLength={54}
            placeholder="Write here"
            onChange={changeHandleInput}
            onKeyDown={keyPressHandleInput}
          />
          {isWarningTextShown ? (
            <span className="warning-text">
              Task content can contain max 54 characters.
            </span>
          ) : undefined}
          {isPromptTextShown ? (
            <span className="warning-text">Please wait a second</span>
          ) : undefined}
        </div>
        <button onClick={clickHandleInput}>Add</button>
      </div>
    </div>
  );
};

export default TodoFormAdd;

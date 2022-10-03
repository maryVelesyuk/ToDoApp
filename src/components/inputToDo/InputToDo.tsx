import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hook";
import { addNewTodo } from "../../store/slices/todosSlice";
import SvgIcons from "../icons/SvgIcons";
import s from "./InputToDo.module.css";

const InputToDo: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [inputError, setInputError] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (inputText.length > 10) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  }, [inputText]);

  const addTodoBtn = (text: string) => {
    if (!inputError) {
      dispatch(addNewTodo(text));
      setInputText("");
    }
  };

  return (
    <>
      <label>
        <input
          className={s.input_todo}
          placeholder="create a new todo..."
          value={inputText}
          onChange={handleChange}
        ></input>

        <button className={s.add_btn} onClick={() => addTodoBtn(inputText)}>
          <SvgIcons id="add" />
        </button>
      </label>
      {inputError && (
        <div className={s.input_error}>
          Превышен лимит текста задачи на {inputText.length - 10} символов
        </div>
      )}
    </>
  );
};

export default InputToDo;

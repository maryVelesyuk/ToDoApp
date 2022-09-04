import React from "react";
import { useAppDispatch } from "../../hooks/hook";
import { deleteTodo } from "../../store/slices/todosSlice";
import SvgIcons from "../icons/SvgIcons";
import s from "./Modal.module.css";

interface ModalProps {
  text: string;
  id: string;
  date: number;
  switchModalActive: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  id,
  text,
  date,
  switchModalActive,
}) => {
  const dispatch = useAppDispatch();

  const removeTodo = (id: string) => {
    dispatch(deleteTodo(id));
    switchModalActive();
  };

  return (
    <div className={s.modal} onClick={switchModalActive}>
      <div className={s.modal_field} onClick={(e) => e.stopPropagation()}>
        <div>Вы действительно хотите удалить эту задачу?</div>
        <div className={s.todo_text}>{text}</div>
        <div className={s.todo_date}>{`${new Date(date).getDate()}-${
          new Date(date).getMonth() + 1
        }-${new Date(date).getFullYear()}`}</div>
        <div className={s.btns_block}>
          <button onClick={switchModalActive}>Отмена</button>
          <button onClick={() => removeTodo(id)}>Удалить</button>
        </div>
        <button className={s.close_btn} onClick={switchModalActive}>
          <SvgIcons id="close" />
        </button>
      </div>
    </div>
  );
};

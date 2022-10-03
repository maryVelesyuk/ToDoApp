import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/hook";
import {
  toggleFavourite,
  toggleCompleted,
  editTodo,
  deleteTodo,
} from "../../store/slices/todosSlice";
import SvgIcons from "../icons/SvgIcons";
import { Menu } from "../menu/Menu";
import { Modal } from "../modal/Modal";
import s from "./ToDoItem.module.css";

interface ToDoItemProps {
  id: string;
  text: string;
  date: number;
  isFavourite: boolean;
  isCompleted: boolean;
}

type PopupClick = MouseEvent & {
  path: Node[];
};

const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  text,
  date,
  isFavourite,
  isCompleted,
}) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [inputEditValue, setInputEditValue] = useState(text);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setIsMenuActive(true);
  };
  const switchModalActive = () => {
    setIsModalActive(!isModalActive);
  };
  const switchCompleted = (id: string) => {
    dispatch(toggleCompleted(id));
    setIsMenuActive(false);
  };
  const switchFavourite = (id: string) => {
    dispatch(toggleFavourite(id));
    setIsMenuActive(false);
  };
  const deleteItem = () => {
    setIsMenuActive(false);
    switchModalActive();
  };

  const editTodoBtn = (id: string) => {
    setIsMenuActive(false);
    setIsEditActive(true);
  };

  const handleInputEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditValue(e.target.value);
  };
  const handeInputEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditActive(false);
      if (inputEditValue.trim()) {
        dispatch(editTodo({ id: id, text: inputEditValue }));
      } else {
        dispatch(deleteTodo(id));
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (menuRef.current && !_event.path.includes(menuRef.current)) {
        setIsMenuActive(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <li className={s.to_do_item}>
      {isEditActive ? (
        <input
          type="text"
          onChange={(e) => handleInputEditChange(e)}
          onKeyPress={(e) => handeInputEditKeyPress(e)}
          className={s.text_edit}
          defaultValue={text}
          autoFocus
        />
      ) : (
        <div
          className={isCompleted ? s.text_completed : s.text}
          onClick={() => switchCompleted(id)}
        >
          {text}
        </div>
      )}
      <div
        className={isFavourite ? s.favorites_active : s.favorites}
        onClick={() => switchFavourite(id)}
      >
        <SvgIcons id="star" />
      </div>

      <div className={s.menu} ref={menuRef}>
        <button onClick={openMenu}>
          <SvgIcons id="menu" />
        </button>
        {isMenuActive && (
          <Menu
            id={id}
            isFavourite={isFavourite}
            switchFavourite={switchFavourite}
            isCompleted={isCompleted}
            switchCompleted={switchCompleted}
            deleteItem={deleteItem}
            editTodo={editTodoBtn}
          />
        )}
        {isModalActive && (
          <Modal
            id={id}
            text={text}
            date={date}
            switchModalActive={switchModalActive}
          />
        )}
      </div>
    </li>
  );
};

export default ToDoItem;

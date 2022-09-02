import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/hook";
import {
  toggleFavourite,
  toggleCompleted,
} from "../../store/slices/todosSlice";
import SvgIcons from "../icons/SvgIcons";
import { Menu } from "../menu/Menu";
import { Modal } from "../modal/Modal";
import s from "./ToDoItem.module.css";

interface ToDoItemProps {
  id: string;
  text: string;
  isFavourite: boolean;
  isCompleted: boolean;
}

type PopupClick = MouseEvent & {
  path: Node[];
};

const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  text,
  isFavourite,
  isCompleted,
}) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenuActive = () => {
    setIsMenuActive(!isMenuActive);
  };
  const switchModalActive = () => {
    setIsModalActive(!isModalActive);
  };
  const switchCompleted = (id: string) => {
    dispatch(toggleCompleted(id));
  };
  const switchFavourite = (id: string) => {
    dispatch(toggleFavourite(id));
  };
  const deleteItem = () => {
    toggleMenuActive();
    switchModalActive();
  };

  const editTodo = (id: string) => {};
  ///код из интернета, чтобы по клику вне закрывалось меню.
  //Добавила, чтобы быстрее сделать дз. потом посмотрю как лучше сделать
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
      <div
        className={isCompleted ? s.text_completed : s.text}
        onClick={() => switchCompleted(id)}
      >
        {text}
      </div>
      <div
        className={isFavourite ? s.favorites_active : s.favorites}
        onClick={() => switchFavourite(id)}
      >
        <SvgIcons id="star" />
      </div>

      <div className={s.menu} ref={menuRef}>
        <button onClick={toggleMenuActive}>
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
            editTodo={editTodo}
          />
        )}
        {isModalActive && (
          <Modal id={id} text={text} switchModalActive={switchModalActive} />
        )}
      </div>
    </li>
  );
};

export default ToDoItem;

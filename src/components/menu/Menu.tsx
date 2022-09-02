import React from "react";
import s from "./Menu.module.css";

interface MenuProps {
  id: string;
  isFavourite: boolean;
  isCompleted: boolean;
  switchFavourite: (id: string) => void;
  switchCompleted: (id: string) => void;
  deleteItem: () => void;
  editTodo: (id: string) => void;
}

export const Menu: React.FC<MenuProps> = ({
  id,
  isFavourite,
  isCompleted,
  switchFavourite,
  switchCompleted,
  deleteItem,
  editTodo,
}) => {
  return (
    <>
      <div className={s.menu}>
        <ul>
          <li onClick={() => switchFavourite(id)}>
            {isFavourite ? "Убрать из избранного" : "В избранное"}
          </li>
          <li onClick={() => switchCompleted(id)}>
            {isCompleted ? "Вернуть в работу" : "Выполнено"}
          </li>
          <li onClick={() => editTodo(id)}>Редактировать</li>
          <li onClick={deleteItem}>Удалить</li>
        </ul>
      </div>
    </>
  );
};

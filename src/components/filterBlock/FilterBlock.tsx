import React from "react";
import s from "./FilterBlock.module.css";

interface FilterBlockProps {
  filterTodos: (filter: string) => void;
  isFilterActive: {
    all: boolean;
    completed: boolean;
    favourite: boolean;
    inProgress: boolean;
  };
}

export const FilterBlock: React.FC<FilterBlockProps> = ({
  filterTodos,
  isFilterActive,
}) => {
  return (
    <div className={s.filter_block}>
      <ul>
        <li
          onClick={() => filterTodos("all")}
          className={isFilterActive.all ? s.active : null}
        >
          все
        </li>
        <li
          onClick={() => filterTodos("completed")}
          className={isFilterActive.completed ? s.active : null}
        >
          выполненные задачи
        </li>
        <li
          onClick={() => filterTodos("inProgress")}
          className={isFilterActive.inProgress ? s.active : null}
        >
          задачи в работе
        </li>
        <li
          onClick={() => filterTodos("favourite")}
          className={isFilterActive.favourite ? s.active : null}
        >
          избранные задачи
        </li>
      </ul>
    </div>
  );
};

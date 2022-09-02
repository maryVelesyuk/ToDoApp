import React from "react";
import s from "./FilterBlock.module.css";

//const filters = ['все', "выполненные задачи", "задачи в работе", "избранные задачи"];

interface FilterBlockProps {
  filterCompletedTodos: () => void;
  filterFavouriteTodos: () => void;
  filterInProgressTodos: () => void;
  filterAllTodos: () => void;
  isFilterActive: {
    all: boolean;
    completed: boolean;
    favourite: boolean;
    inProgress: boolean;
  };
}

export const FilterBlock: React.FC<FilterBlockProps> = ({
  filterCompletedTodos,
  filterFavouriteTodos,
  filterInProgressTodos,
  filterAllTodos,
  isFilterActive,
}) => {
  return (
    <div className={s.filter_block}>
      <ul>
        <li
          onClick={filterAllTodos}
          className={isFilterActive.all ? s.active : null}
        >
          все
        </li>
        <li
          onClick={filterCompletedTodos}
          className={isFilterActive.completed ? s.active : null}
        >
          выполненные задачи
        </li>
        <li
          onClick={filterInProgressTodos}
          className={isFilterActive.inProgress ? s.active : null}
        >
          задачи в работе
        </li>
        <li
          onClick={filterFavouriteTodos}
          className={isFilterActive.favourite ? s.active : null}
        >
          избранные задачи
        </li>
      </ul>
    </div>
  );
};

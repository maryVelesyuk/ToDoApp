import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { fetchTodos } from "../../store/slices/todosSlice";
import { FilterBlock } from "../filterBlock/FilterBlock";
import { Header } from "../header/Header";
import InputToDo from "../inputToDo/InputToDo";
import TodoList from "../todoList/TodoList";
import { Error } from "../error/Error";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const { todos, error } = useAppSelector((state) => state.todos);
  const [filtredTodos, setFiltredTodos] = useState(todos);
  const [isFilterActive, setIsFilterActive] = useState({
    all: true,
    completed: false,
    favourite: false,
    inProgress: false,
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  useEffect(() => {
    setFiltredTodos(todos);
  }, [todos]);

  const filterTodos = (filter: string) => {
    switch (filter) {
      case "all":
        setFiltredTodos(todos);
        setIsFilterActive({
          all: true,
          completed: false,
          favourite: false,
          inProgress: false,
        });

        break;
      case "completed":
        setFiltredTodos(todos.filter((todo) => todo.isCompleted === true));
        setIsFilterActive({
          all: false,
          completed: true,
          favourite: false,
          inProgress: false,
        });
        break;
      case "favourite":
        setFiltredTodos(todos.filter((todo) => todo.isFavourite === true));
        setIsFilterActive({
          all: false,
          completed: false,
          favourite: true,
          inProgress: false,
        });
        break;
      case "inProgress":
        setFiltredTodos(todos.filter((todo) => todo.isCompleted !== true));
        setIsFilterActive({
          all: false,
          completed: false,
          favourite: false,
          inProgress: true,
        });
        break;
      default:
        setFiltredTodos(todos);
        break;
    }
  };

  return (
    <div className="app">
      <Header />
      <main>
        <InputToDo />
        <FilterBlock
          filterTodos={filterTodos}
          isFilterActive={isFilterActive}
        />
        <TodoList todos={filtredTodos} />
        {error && <Error error={error} />}
      </main>
    </div>
  );
}

export default App;

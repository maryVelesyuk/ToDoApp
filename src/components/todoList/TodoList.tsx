import ToDoItem from "../toDoItem/ToDoItem";
import { Todo } from "../../store/slices/todosSlice";
import s from "./TodoList.module.css";
import { useAppSelector } from "../../hooks/hook";
import Spinner from "../spinner/Spinner";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const { loading } = useAppSelector((state) => state.todos);

  if (loading) return <Spinner />;

  return (
    <div className={s.to_do_list_container}>
      <ul className={s.to_do_list}>
        {todos.map((todo) => (
          <ToDoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

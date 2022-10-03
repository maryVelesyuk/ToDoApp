import ToDoItem from "../toDoItem/ToDoItem";
import { Todo } from "../../store/slices/todosSlice";
import s from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
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

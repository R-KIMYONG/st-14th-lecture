import { useNavigate } from "react-router-dom";
import { TodoWithIsDone } from "../types/todo.type";

interface TodoListProps {
  todos: TodoWithIsDone[];
  setTodos: React.Dispatch<React.SetStateAction<TodoWithIsDone[]>>;
}
export default function TodoList({ todos, setTodos }: TodoListProps) {
  const navigate = useNavigate();
  const toggleTodo = (id: TodoWithIsDone["id"]) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };
  return (
    <ul style={{ listStyle: "none", width: 250 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
            textDecoration: todo.isDone ? "line-through" : "none",
          }}
        >
          <h3>{todo.title}</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => navigate(`/detail/${todo.id}`)}>
              내용보기
            </button>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.isDone ? "취소" : "완료"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

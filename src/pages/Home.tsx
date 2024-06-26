import { useState, useEffect } from "react";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { AxiosError } from "axios";
import { TodoWithIsDone } from "../types/todo.type";
import { todoApi } from "../api/todos";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<TodoWithIsDone[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await todoApi.get<TodoWithIsDone[]>("/todos");
      const todos = response.data;
      const todosWithIsDone = todos.map((todo) => ({ ...todo, isDone: false }));
      setData(todosWithIsDone);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err);
      } else {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div style={{ fontSize: 36 }}>로딩중...</div>;
  }

  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <>
      <h2>서버통신 투두리스트 by useState</h2>
      <TodoForm fetchData={fetchData} />
      <TodoList todos={data} setTodos={setData} />
    </>
  );
}

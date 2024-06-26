import { useState } from "react";
import { todoApi } from "../api/todos";

interface TodoFormProps {
  fetchData: () => Promise<void>;
}

export default function TodoForm({ fetchData }: TodoFormProps) {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const handleAddTodo: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ): Promise<void> => {
    e.preventDefault();
    setTitle("");
    setContents("");
    await todoApi.post("/todos", {
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    });
    await fetchData();
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="title">제목:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <label htmlFor="contents">내용:</label>
      <input
        id="contents"
        name="contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        required
      />
      <button type="submit">추가하기</button>
    </form>
  );
}

import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../api/todos";
import { AxiosError } from "axios";
import { TodoWithIsDone } from "../types/todo.type";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<TodoWithIsDone | null>(null);

  useEffect(() => {
    const fetchDetail = async (): Promise<void> => {
      try {
        const response = await todoApi(`/todos/${id}`);
        setData(response.data);
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

    fetchDetail();
  }, [id]);

  if (isLoading || !data) return <div style={{ fontSize: 36 }}>로딩중...</div>;
  if (error) {
    console.error(error);
    return (
      <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
      <p>제목: {data.title}</p>
      <p>내용: {data.contents}</p>
      <p>작성일자: {new Date(data.createdAt).toDateString()}</p>
    </div>
  );
}

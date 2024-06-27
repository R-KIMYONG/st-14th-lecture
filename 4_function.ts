import axios, { AxiosResponse } from "axios";

// 함수 선언문에서의 타입 지정
function greet(name: string): string {
  return `Hello, ${name}!`;
}

function add(a: number, b: number): number {
  return a + b;
}

function printName(name: string): void {
  // void 타입, 반환 값이 없음
  console.log(name);
  ``;
}

// 화살표 함수에서의 타입 지정
const logMessage1: (message: string) => void = (message) => {
  console.log(message);
};
// 또는
type LogMessageType = (message: string) => void;
const logMessage2: LogMessageType = (message) => {
  console.log(message);
};
// 또는
const logMessage3 = (message: string): void => {
  console.log(message);
};

// async 함수에서의 타입 지정
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
// TODO: 함수 타입 정의할 것
const getTodos = async (): Promise<Todo> => {
  const response = await axios.get<Todo>(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  return response.data;
};
getTodos().then((data) => console.log(data));

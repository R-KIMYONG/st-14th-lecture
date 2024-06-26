type ExtraPropertyType = { [key: string]: string };

type Todo = {
  id: string;
  title: string;
  contents: string;
  createdAt: number;
  extraProperty?: ExtraPropertyType;
};

export type TodoWithIsDone = Todo & {
  isDone: boolean;
};

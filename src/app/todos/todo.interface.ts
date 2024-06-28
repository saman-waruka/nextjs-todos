export interface Todo {
  id?: string;
  no: number;
  title: string;
  description: string;
  completed: boolean;
  created_by?: {
    id: string;
    username: string;
  };
  date?: Date;
  created_at?: string; //"2024-06-25T04:18:59.137Z"
  updated_at?: string; //"2024-06-25T04:18:59.137Z"
}

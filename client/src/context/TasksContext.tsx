"use client";

import { createContext, useReducer, ReactNode, Dispatch } from "react";

export type Task = {
  id: number;
  title?: string;
  project_id?: number;
  description?: string;
  priority?: string;
  due_date?: string;
  tags?: string;
  starred?: boolean;
  status?: string;
  [key: string]: any;
};

type TasksState = {
  tasks: Task[];
};

type TasksAction =
  | {
      type: "SET_TASKS";
      payload: Task[];
    }
  | {
      type: "CREATE_TASK";
      payload: Task;
    }
  | {
      type: "REMOVE_TASK";
      payload: Task;
    }
  | {
      type: "UPDATE_TASK";
      payload: Task;
    };

type TasksContextType = TasksState & {
  dispatchTasks: Dispatch<TasksAction>;
};

export const TasksContext = createContext<TasksContextType | null>(null);

export const tasksReducer = (
  state: TasksState,
  action: TasksAction,
): TasksState => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload,
      };

    case "CREATE_TASK":
      return {
        tasks: [...state.tasks, action.payload],
      };

    case "REMOVE_TASK":
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case "UPDATE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };

    default:
      return state;
  }
};

type TasksContextProviderProps = {
  children: ReactNode;
};

export const TasksContextProvider = ({
  children,
}: TasksContextProviderProps) => {
  const [state, dispatchTasks] = useReducer(tasksReducer, {
    tasks: [],
  });

  return (
    <TasksContext.Provider
      value={{
        ...state,
        dispatchTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

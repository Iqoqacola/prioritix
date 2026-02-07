import { createContext, useEffect, useReducer } from "react";

export const TasksContext = createContext(null);

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { tasks: action.payload };
    case "CREATE_TASK":
      return { tasks: [action.payload, ...state.tasks] };
    case "REMOVE_TASK":
      return {
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };
    case "UPDATE_TASK":
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
  }
};

export const TasksContextProvider = ({ children }) => {
  const [state, dispatchTasks] = useReducer(tasksReducer, { tasks: null });

  return (
    <TasksContext.Provider value={{ ...state, dispatchTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

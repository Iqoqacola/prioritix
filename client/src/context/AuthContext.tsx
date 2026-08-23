"use client";

import { createContext, useReducer } from "react";

export const AuthContext = createContext(null);

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children, initialUser = null }) => {
  const [state, dispatchAuth] = useReducer(authReducer, {
    user: initialUser,
  });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

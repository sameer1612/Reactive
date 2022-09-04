import React, {createContext, Dispatch, ReactElement, useReducer} from 'react';
import {TodoActions, todosReducer} from '../reducers/todos-reducer';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextInterface {
  todos: Todo[];
}

const initialState = {
  todos: [],
};

const TodosContext = createContext<{state: TodoContextInterface; dispatch: Dispatch<TodoActions>}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({todos}: TodoContextInterface, action: TodoActions) => ({
  todos: todosReducer(todos, action),
});

const TodosProvider = ({children}: {children: ReactElement | ReactElement[]}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <TodosContext.Provider value={{state, dispatch}}>{children}</TodosContext.Provider>;
};

export {TodosProvider, TodosContext};

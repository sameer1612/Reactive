import {Todo} from '../contexts/todos-context';

type ActionMap<M extends {[index: string]: any}> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum TodoActionTypes {
  Create = 'CREATE_TODO',
  Update = 'UPDATE_TODO',
  Reset = 'RESET_TODOS',
  Delete = 'DELETE_TODO',
  Complete = 'COMPLETE_TODO',
}

type TodoPayload = {
  [TodoActionTypes.Create]: Todo;
  [TodoActionTypes.Update]: Todo;
  [TodoActionTypes.Reset]: Todo[];
  [TodoActionTypes.Complete]: Todo;
  [TodoActionTypes.Delete]: Todo;
};

export type TodoActions = ActionMap<TodoPayload>[keyof ActionMap<TodoPayload>];

export const todosReducer = (state: Todo[], action: TodoActions) => {
  switch (action.type) {
    case TodoActionTypes.Create:
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          completed: action.payload.completed,
          userId: action.payload.id,
        },
      ];
    case TodoActionTypes.Update:
      return [
        ...state.filter(todo => todo.id !== action.payload.id),
        {
          id: action.payload.id,
          title: action.payload.title,
          completed: action.payload.completed,
          userId: action.payload.id,
        },
      ];
    case TodoActionTypes.Delete:
      return [...state.filter(todo => todo.id !== action.payload.id)];
    case TodoActionTypes.Reset:
      return [...action.payload];
    case TodoActionTypes.Complete:
      const todo = action.payload;
      todo.completed = true;
      return [...state.filter(t => t.id !== todo.id), todo];
    default:
      return state;
  }
};

import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Todo} from '../../contexts/todos-context';
import {getTodos} from '../../services/todosApi';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: SerializedError | undefined;
}

const initialState: TodosState = {
  todos: [],
  loading: true,
  error: undefined,
};

export const fetchTodos = createAsyncThunk('users/fetchByIdStatus', async () => {
  const response = await getTodos();
  return response;
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    create: (state, action: PayloadAction<Todo>) => {
      state.todos = [action.payload, ...state.todos];
    },
    update: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map(t => (t.id === action.payload.id ? action.payload : t));
    },
    destroy: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload.id);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, _) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export const {init, create, update, destroy} = todosSlice.actions;

export default todosSlice.reducer;

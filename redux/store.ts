import {configureStore} from '@reduxjs/toolkit';
import todosReducer from './features/todosSlice';
import {todosApi} from '../services/todosRtk';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todosApi.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

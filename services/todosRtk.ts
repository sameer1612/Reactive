import {Todo} from '../contexts/todos-context';
import {api} from './api';

export const todosApi = api.injectEndpoints({
  endpoints: build => ({
    getTodos: build.query<Todo[], void>({
      query: () => ({url: 'todos'}),
      providesTags: (result = []) => [
        ...result.map(({id}) => ({type: 'Todos', id} as const)),
        {type: 'Todos' as const, id: 'LIST'},
      ],
    }),
    createTodo: build.mutation<Todo, Todo>({
      query: body => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Todos', id: 'LIST'}],
    }),
    getTodo: build.query<Todo, number>({
      query: id => `todos/${id}`,
      providesTags: (_todo, _err, id) => [{type: 'Todos', id}],
    }),
    updateTodo: build.mutation<Todo, Todo>({
      query(data) {
        const {id, ...body} = data;
        return {
          url: `todos/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: todo => [{type: 'Todos', id: todo?.id}],
    }),
    deleteTodo: build.mutation<{success: boolean; id: number}, number>({
      query(id) {
        return {
          url: `todos/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: todo => [{type: 'Todos', id: todo?.id}],
    }),
  }),
});

export const {useCreateTodoMutation, useDeleteTodoMutation, useGetTodoQuery, useGetTodosQuery, useUpdateTodoMutation} =
  todosApi;

export const {
  endpoints: {getTodo},
} = todosApi;

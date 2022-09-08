import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/',
  prepareHeaders: headers => {
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 6});

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Todos'],
  endpoints: () => ({}),
});

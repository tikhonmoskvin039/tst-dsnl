import { TTreatment } from '@models/TTreatment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3004/';

export const TreatmentApi = createApi({
  reducerPath: 'TreatmentApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllTreatments: builder.query({
      query: () => ({
        url: '/treatments',
        method: 'GET',
      }),
    }),
    getTreatment: builder.query({
      query: (id: number) => ({
        url: `/treatments/${id}`,
        method: 'GET',
      }),
    }),
    addTreatment: builder.mutation({
      query: (body) => ({
        url: '/treatments',
        method: 'POST',
        body,
      }),
    }),
    removeTreatment: builder.mutation({
      query: (id: number) => ({
        url: `/treatments/${id}`,
        method: 'DELETE',
      }),
    }),
    editTreatment: builder.mutation({
  query: ({ id, body }: { id: number, body: TTreatment }) => ({
    url: `/treatments/${id}`,
    method: 'PUT',
    body,
  }),
}),
  }),
});

export const { useAddTreatmentMutation, useGetAllTreatmentsQuery, useRemoveTreatmentMutation, useEditTreatmentMutation, useGetTreatmentQuery } = TreatmentApi;

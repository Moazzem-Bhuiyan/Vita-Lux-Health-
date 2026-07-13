import { baseApi } from './baseApi';

const reviewAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: '/review/get-service-review',
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),
    checkReviewEligibility: builder.query({
      query: () => ({
        url: '/review/is-review',
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),
    createReview: builder.mutation({
      query: (data = {}) => ({
        url: `/review/create/${data.service_id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Review'],
    }),
    getmyReviews: builder.query({
      query: () => ({
        url: '/review/get',
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),
  }),
});

export const { useGetReviewsQuery, useCheckReviewEligibilityQuery, useCreateReviewMutation, useGetmyReviewsQuery } =
  reviewAPi;

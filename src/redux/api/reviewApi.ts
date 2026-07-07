import { baseApi } from './baseApi';

const reviewAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: '/review/get-service-review',
        method: 'GET',
      }),
    }),
    checkReviewEligibility: builder.query({
      query: () => ({
        url: '/review/is-review',
        method: 'GET',
      }),
    }),
    createReview: builder.mutation({
      query: (data = {}) => ({
        url: `/review/create/${data.service_id}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useCheckReviewEligibilityQuery, useCreateReviewMutation } =
  reviewAPi;

import { baseApi } from './baseApi';

const BlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (params = {}) => ({
        url: '/blog/get', // Correct endpoint
        method: 'GET',
        params: {
          search: params.search || '',
          category_name: params.category_name || '',
          status: params.status,
          from_date: params.from_date,
          to_date: params.to_date,
          page: params.page || 1,
          per_page: params.per_page || 9,
        },
      }),
      providesTags: ['Blogs'],
    }),

    getBlogBySlug: builder.query({
      query: ({ slug }) => ({
        url: `/blog/view/${slug}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Blogs', id }],
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogBySlugQuery } = BlogApi;

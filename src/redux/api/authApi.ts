import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data = {}) => {
        console.log('Sign Up Data in api :', data);
        return {
          url: '/auth/register',
          method: 'POST',
          body: data,
        };
      },
    }),

    signIn: builder.mutation({
      query: (data = {}) => {
        console.log('Sign In Data in api :', data);
        return {
          url: '/auth/login',
          method: 'POST',
          body: data,
        };
      },
    }),

    verifyEmail: builder.mutation({
      query: (data = {}) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),

    resendOtp: builder.mutation({
      query: (data = {}) => ({
        url: '/otp/resend-otp',
        method: 'POST',
        body: { email: data },
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: '/user/create-password?_method=PUT',
        method: 'POST',
        body: payload,
      }),
    }),

    changepassword: builder.mutation({
      query: (data = {}) => ({
        url: '/user/password',
        method: 'PUT',
        body: data,
      }),
    }),

    // get my profile ---------------
    getMyProfile: builder.query({
      query: () => ({
        url: '/users/my-profile',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),

    // update profile api endpoint
    updateProfileinfo: builder.mutation({
      query: (data = {}) => ({
        url: '/users/update-my-profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangepasswordMutation,
  useGetMyProfileQuery,
  useUpdateProfileinfoMutation,
} = authApi;

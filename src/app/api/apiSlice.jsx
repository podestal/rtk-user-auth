import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/auth/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `JWT ${token}`)
        }
        return headers
    }

})

const baseQuerywithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api , extraOptions)
    // or 401
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery('jwt/refresh', api, extraOptions)
        console.log('refresh result', refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token
        }
        else{
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQuerywithReauth,
    endpoints: builder => ({})
})
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export type User = {
   id: number;
   username: string;
   email: string;
   image?: string;
   isTokenExists: boolean;
};

export type Csrf = {
   headerName: string;
   token: string;
};

export const authApi = createApi({
   reducerPath: "authApi",
   tagTypes: ["User"],
   baseQuery: baseQuery("/"),
   endpoints: (builder) => ({
      getCurrentUser: builder.query<User, void>({
         query: () => ({ url: "currentAccount" })
      })
   })
});

export const { useGetCurrentUserQuery } = authApi;

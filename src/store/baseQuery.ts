import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { application } from "~/global/config/application.config";

export const baseQuery = (basePath: string) =>
   fetchBaseQuery({
      baseUrl: `${application.API_URL}${basePath}`,
      credentials: "include"
   });

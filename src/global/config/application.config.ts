import axios from "axios";

const application = {
   // Backend URL
   API_URL: "https://api.sabaody.org",
   cookieDomain: import.meta.env.SABAODY_COOKIE_DOMAIN
};

const api = axios.create({
   baseURL: application.API_URL,
   withCredentials: true
});

const apiWithCsrf = axios.create({
   baseURL: application.API_URL,
   withCredentials: true
});

export async function getCsrfToken() {
   const response = await api.get("/csrf");
   return response.data.token;
}

apiWithCsrf.interceptors.request.use(
   async (config) => {
      const token = await getCsrfToken();
      if (token) {
         config.headers["X-XSRF-Token"] = token;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export { api, application, apiWithCsrf };

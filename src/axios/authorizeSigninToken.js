import { buyNGAxios } from "./axios";

export const setAuthToken = token => {
   if (token)
       buyNGAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   else
       delete buyNGAxios.defaults.headers.common["Authorization"];
}

95
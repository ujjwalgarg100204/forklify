import axios from "axios";

export const API = axios.create({
    baseURL: "/api/",
});

export const fetcher = (url: string) => API.get(url).then(res => res.data);

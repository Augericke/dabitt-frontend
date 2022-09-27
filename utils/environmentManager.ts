import axios, { AxiosRequestHeaders } from "axios";

function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

const api = axios.create({
  baseURL: `${
    isDev() ? "http://localhost:3001/api" : "http://localhost:3001/api"
  }`,
});

export { isDev, isProd, api };

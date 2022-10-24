import axios from "axios";

function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

const baseApiUrl = isDev()
  ? "http://localhost:3001/api"
  : "https://dabitt.onrender.com/api";

const api = axios.create({
  baseURL: `${baseApiUrl}`,
});

export { isDev, isProd, baseApiUrl, api };

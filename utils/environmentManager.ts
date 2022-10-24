import axios from "axios";

function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

const baseUrl = isProd()
  ? "https://dabitt-frontend.vercel.app/"
  : "http://localhost:3000";

const baseApiUrl = isProd()
  ? "https://dabitt.onrender.com/api"
  : "http://localhost:3001/api";

const api = axios.create({
  baseURL: `${baseApiUrl}`,
});

export { isDev, isProd, baseUrl, baseApiUrl, api };

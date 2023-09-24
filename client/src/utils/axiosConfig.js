import axios from "axios";

const baseURL = "https://lets-chat-server-production.up.railway.app/";

const publicClient = axios.create({
  baseURL,
});

publicClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json"
    }
  };
});

export default publicClient;
import axios from "axios";

// 👉 Ajuste aqui se seu backend estiver em outra porta/host
const API_URL = import.meta.env.VITE_API_URL;


export const api = axios.create({
  baseURL: API_URL,
});

// ------------------------------------------------------
// 🔐 Interceptor: adiciona o token automaticamente
// ------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ------------------------------------------------------
// ❗ Interceptor: trata erros de autenticação
// (Opcional – mas MUITO útil)
// ------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token inválido ou expirado
    if (error.response?.status === 401) {
      console.warn("Token expirado ou inválido. Redirecionando para login...");

      localStorage.removeItem("token");

      // força redirecionamento global
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

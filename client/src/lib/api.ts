import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:4000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Gem {
  id: number;
  name: string;
  category: string;
  description: string;
  weight_carat: string | number; // API returns string
  dimensions: string;
  color: string;
  clarity: string;
  cut: string;
  origin: string;
  certificateUrl: string; // camelCase in API
  priceUsd: string | number; // API returns string
  stockQuantity: number;
  status: "available" | "reserved" | "sold";
  imageUrl: string; // camelCase in API
  gallery: string[];
  createdAt?: string; // camelCase in API
  updatedAt?: string; // camelCase in API
}

// Response format with pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

export const authApi = {
  login: (data: LoginRequest): Promise<AxiosResponse<AuthResponse>> =>
    apiClient.post("/auth/login", data),

  signup: (data: SignupRequest): Promise<AxiosResponse<{ message: string }>> =>
    apiClient.post("/auth/signup", data),

  getProfile: (): Promise<AxiosResponse<UserProfile>> =>
    apiClient.get("/auth/me"),
};

// Category interface
export interface GemCategory {
  id: number;
  category: string;
  imageUrl: string;
  description?: string;
}

export interface GemQueryParams {
  take?: number;
  skip?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc" | "newest" | "oldest";
  status?: "available" | "reserved" | "sold" | "all";
}

export const gemsApi = {
  getAll: (
    params?: GemQueryParams
  ): Promise<AxiosResponse<PaginatedResponse<Gem>>> =>
    apiClient.get("/api/gems", { params }),

  getById: (id: number): Promise<AxiosResponse<Gem>> =>
    apiClient.get(`/api/gems/${id}`),

  create: (
    data: Omit<Gem, "id" | "createdAt" | "updatedAt">
  ): Promise<AxiosResponse<Gem>> => apiClient.post("/api/gems", data),

  update: (id: number, data: Partial<Gem>): Promise<AxiosResponse<Gem>> =>
    apiClient.put(`/api/gems/${id}`, data),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    apiClient.delete(`/api/gems/${id}`),

  getCategories: (): Promise<AxiosResponse<PaginatedResponse<GemCategory>>> =>
    apiClient.get("/api/gems/categories"),
};

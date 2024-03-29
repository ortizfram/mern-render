import { config } from "dotenv";

config(); // Loads the .env file into process.env

export const PORT = process.env.PORT || 3000
export const HOST = process.env.HOST || "http://localhost:"
export const VITE_FRONTEND_URL = process.env.FRONTEND_URL || "https://buonavibra-client.onrender.com"
export const VITE_BACKEND_URL = process.env.VITE_BACKEND_URL || "http://localhost:3000"

export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = "https://api-m.sandbox.paypal.com";

export const DB_HOST = process.env.DB_HOST || '127.0.0.1'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'melonmelon'
export const DB_NAME = process.env.DB_NAME || 'conn'
export const DB_PORT = process.env.DB_PORT || 3307
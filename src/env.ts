import { object, string, number, parse } from "valibot";

const envSchema = object({
	VITE_API_KEY: string(),
	VITE_AUTH_DOMAIN: string(),
	VITE_PROJECT_ID: string(),
	VITE_STORAGE_BUCKET: string(),
	VITE_MESSAGING_SENDER_ID: number(),
	VITE_APP_ID: string(),
	VITE_MEASUREMENT_ID: string(),
});

export const env = parse(envSchema, import.meta.env);

import { HttpClient } from "@bazo/fetch-client";

export function createHttp(baseURL: string): HttpClient {
	const client = new HttpClient(baseURL);

	return client;
}

export const createApiClient = (): HttpClient => createHttp(import.meta.env.VITE_BASE_API_URL);

export type AppwriteServerClient = {
	isConfigured: boolean;
};

export function getServerClient(): AppwriteServerClient {
	return { isConfigured: false };
}

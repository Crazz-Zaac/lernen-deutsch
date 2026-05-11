import { Account, Client, Databases } from "appwrite";
import { APPWRITE_CONFIG } from "./config";

let client: Client | null = null;
let account: Account | null = null;
let databases: Databases | null = null;

const initClient = () => {
  if (typeof window === "undefined") return;
  if (client) return;

  const { endpoint, projectId } = APPWRITE_CONFIG;
  if (!endpoint || !projectId) return;

  client = new Client().setEndpoint(endpoint).setProject(projectId);
  account = new Account(client);
  databases = new Databases(client);
};

export const getAccount = () => {
  initClient();
  if (!account) throw new Error("Appwrite client not initialized");
  return account;
};

export const getDatabases = () => {
  initClient();
  if (!databases) throw new Error("Appwrite client not initialized");
  return databases;
};
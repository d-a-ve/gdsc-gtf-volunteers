import { Account, Client, Databases, ID, Query, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const db = new Databases(client);
export const authAccount = new Account(client);
export const uniqueId = ID.unique();
export const query = Query;
export const storage = new Storage(client);
export default client;

import { Client, Account, ID, Databases, Query, Avatars } from "appwrite";

const client = new Client();

// client created on the appwrite website
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const db = new Databases(client);
export const authAccount = new Account(client);
export const avatar = new Avatars(client);
export const uniqueId = ID.unique();
export const query = Query;
export default client;

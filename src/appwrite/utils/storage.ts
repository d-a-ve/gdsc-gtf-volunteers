import { storage, uniqueId } from "../config";

export async function createFile(data: File) {
  try {
    const file = await storage.createFile(
      import.meta.env.VITE_APPWRITE_VOLUNTEERS_BUCKET_ID,
      uniqueId,
      data
    );

    return file;
  } catch (error: any) {
    throw new Error(error);
  }
}

import { db, uniqueId } from "../config";

const DB_ID = import.meta.env.VITE_APPWRITE_VOLUNTEERS_DB_ID;
const VOLUNTEERS_COL_ID = import.meta.env.VITE_APPWRITE_VOLUNTEERS_COL_ID;

export async function createVolunteerRecord(data: {
  name: string;
  imgId: string;
}) {
  try {
    const doc = await db.createDocument(
      DB_ID,
      VOLUNTEERS_COL_ID,
      uniqueId,
      data
    );
    return doc;
  } catch (error: any) {
    throw new Error(error);
  }
}

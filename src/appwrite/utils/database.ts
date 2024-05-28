import type { birthdaysAttrType } from "@myTypes/index";

import { databaseDocType } from "../../myTypes";
import { db, query } from "../config";

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const BIRTHDAYS_COL_ID = import.meta.env.VITE_APPWRITE_BIRTHDAYS_COLLECTION_ID;

export async function createDocInBirthdaysCol(
  docId: string,
  data: databaseDocType
) {
  try {
    const doc = await db.createDocument(DB_ID, BIRTHDAYS_COL_ID, docId, data);
    return doc;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function listUserDocFromBirthdaysCol(
  userId: string | undefined,
  queryLimit = "25"
) {
  try {
    if (!userId) throw new Error("User Id is not defined");

    const docs = await db.listDocuments(
      DB_ID,
      BIRTHDAYS_COL_ID,
      [
        query.equal("user_id", userId),
        query.limit(Number(queryLimit)),
        query.orderAsc("person_birthday"),
      ]
      /*
     So it does not return an error if the user_id does not match. TODO:
     1. I have set collection permission for user, so if an error comes it means the person is not a registered user. UPDATE: It did not give an error, so only take care of case 2.
     2. If the result arrau is empty, then use default dashboard with message for user to add a birthday.
    */
    );
    return docs;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function searchForBirthday({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
  try {
    if (name.length === 0) return;

    const docs = await db.listDocuments(DB_ID, BIRTHDAYS_COL_ID, [
      query.search("person_name", name),
      query.orderAsc("person_birthday"),
      query.equal("user_id", userId),
    ]);

    return docs;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateBirthdayDocument(
  docId: string,
  data: { [k in keyof Omit<birthdaysAttrType, "user_id">]: string }
) {
  try {
    return await db.updateDocument(DB_ID, BIRTHDAYS_COL_ID, docId, data);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteBirthdayDocument(docId: string) {
  try {
    return await db.deleteDocument(DB_ID, BIRTHDAYS_COL_ID, docId);
  } catch (error: any) {
    throw new Error(error);
  }
}

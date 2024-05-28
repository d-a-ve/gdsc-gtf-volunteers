import { Dispatch, SetStateAction } from "react";

import { birthdayDataType, documentType } from "@myTypes/index";

import client from "../config";

export function enableRealtimeForBirthdaysCol(
  set: Dispatch<SetStateAction<birthdayDataType | undefined>>
) {
  return client.subscribe<documentType>(
    `databases.${import.meta.env.VITE_APPWRITE_DB_ID}.collections.${
      import.meta.env.VITE_APPWRITE_BIRTHDAYS_COLLECTION_ID
    }.documents`,
    (response) => {
      if (response.events[1].includes("create")) {
        set((prev) => {
          if (prev) {
            return {
              ...prev,
              total: prev.total + 1,
              documents: [...prev.documents, response.payload],
            };
          }
        });
      }
    }
  );
}

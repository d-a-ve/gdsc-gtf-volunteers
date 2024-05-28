import { BASE_URL } from "@config/index";

import { authAccount } from "../config";

export default function signInWithOAuth(providerName: "facebook" | "google") {
  authAccount.createOAuth2Session(
    providerName,
    `${BASE_URL}/oauth/`,
    `${BASE_URL}/login`
  );
}

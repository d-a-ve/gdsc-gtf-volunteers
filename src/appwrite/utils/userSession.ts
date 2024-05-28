import { BASE_URL } from "@config/index";

import { authAccount, uniqueId } from "../config";

export async function createUserSession(email: string, password: string) {
  try {
    const res = await authAccount.createEmailSession(email, password);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createUserAccount(
  email: string,
  password: string,
  name: string
) {
  try {
    const res = await authAccount.create(uniqueId, email, password, name);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getUserAccount() {
  try {
    const userAccount = await authAccount.get();

    return userAccount;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteSession() {
  try {
    const res = await authAccount.deleteSession("current");
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function signInWithOAuth(providerName: "facebook" | "google") {
  try {
    const oAuth = authAccount.createOAuth2Session(
      providerName,
      `${BASE_URL}/oauth`,
      `${BASE_URL}/login`
    );

    return oAuth;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getOAuthSession() {
  try {
    const OAuthAccountSession = await authAccount.getSession("current");
    return OAuthAccountSession;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateUserName(name: string) {
  try {
    const userName = await authAccount.updateName(name);
    return userName;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function forgotPassword(
  email: string,
  redirectUrl = `${BASE_URL}/reset-password`
) {
  try {
    const res = await authAccount.createRecovery(email, redirectUrl);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function resetPassword(
  userId: string,
  secretKey: string,
  password: string
) {
  try {
    const res = await authAccount.updateRecovery(
      userId,
      secretKey,
      password,
      password
    );
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

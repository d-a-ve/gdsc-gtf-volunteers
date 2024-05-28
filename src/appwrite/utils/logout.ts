import { Dispatch, SetStateAction } from "react";

import { toastError } from "helpers/toastNotifs";

import { UserType } from "../../myTypes";
import { authAccount } from "../config";

export default async function logout(
  setCurrentUser: Dispatch<SetStateAction<UserType | undefined>>,
  navigateFunction: () => void
) {
  try {
    await authAccount.deleteSession("current");
    setCurrentUser(undefined);
    navigateFunction();
  } catch (error) {
    toastError("Something went wrong. Could not log out!");
  }
}

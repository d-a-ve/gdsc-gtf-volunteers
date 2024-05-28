import { avatar } from "@appwrite/config";

export function getInitials(name?: string) {
  const initials = avatar.getInitials(name);

  return initials;
}

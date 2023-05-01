import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerifieed"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerifieed: string | null;
};

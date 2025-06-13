"use client";

import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { toast } from "sonner";
import { handleErrorWithToast } from "ui/shared-toast";
import { createDevAuthClient } from "./dev-auth";

// Check if we're in development and should use dev auth
const isDev = process.env.NODE_ENV === "development";
const useDevAuth =
  isDev && (!process.env.POSTGRES_URL || process.env.USE_DEV_AUTH === "true");

export const authClient = useDevAuth
  ? createDevAuthClient()
  : createAuthClient({
      fetchOptions: {
        onError(e) {
          if (e.error.status === 429) {
            toast.error("Too many requests. Please try again later.");
            return;
          }
          handleErrorWithToast(e.error);
        },
      },
    });

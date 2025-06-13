"use client";

// Development-only authentication bypass
// This is a temporary solution for when the database is not available

export const DEV_USER = {
  id: "dev-user-id",
  name: "Development User",
  email: "dev@example.com",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEV_SESSION = {
  id: "dev-session-id",
  userId: DEV_USER.id,
  user: DEV_USER,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  token: "dev-token",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createDevAuthClient = () => {
  return {
    useSession: () => ({
      data: { session: DEV_SESSION, user: DEV_USER },
      loading: false,
      error: null,
      refetch: () => Promise.resolve({ session: DEV_SESSION, user: DEV_USER }),
    }),
    signIn: {
      email: (credentials: any, options?: any) => {
        // Simulate successful sign-in
        setTimeout(() => {
          if (options?.onSuccess) {
            options.onSuccess();
          }
          // Redirect to home page
          window.location.href = "/";
        }, 100);
        return Promise.resolve({ data: DEV_SESSION });
      },
      social: (provider: any) => {
        // Simulate successful social sign-in
        setTimeout(() => {
          window.location.href = "/";
        }, 100);
        return Promise.resolve({ data: DEV_SESSION });
      },
    },
    signUp: {
      email: (credentials: any, options?: any) => {
        // Simulate successful sign-up
        setTimeout(() => {
          if (options?.onSuccess) {
            options.onSuccess();
          }
          // Redirect to home page
          window.location.href = "/";
        }, 100);
        return Promise.resolve({ data: DEV_SESSION });
      },
    },
    signOut: () => {
      window.location.href = "/sign-in";
      return Promise.resolve();
    },
  };
};

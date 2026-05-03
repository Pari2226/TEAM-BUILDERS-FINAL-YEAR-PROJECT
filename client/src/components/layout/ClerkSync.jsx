import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import api, { setAuthTokenGetter } from "../../api/axios";

export default function ClerkSync() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const syncedUserId = useRef(null);

  useEffect(() => {
    setAuthTokenGetter(async () => {
      const token = await getToken({ template: "default" });
      console.log("Token:", token);
      return token;
    });
  }, [getToken]);

  useEffect(() => {
    if (
      !isLoaded ||
      !isSignedIn ||
      !user?.id ||
      syncedUserId.current === user.id
    ) {
      return;
    }

    syncedUserId.current = user.id;
    api.get("/api/auth/me").catch(() => {
      syncedUserId.current = null;
    });
  }, [isLoaded, isSignedIn, user?.id]);

  return null;
}

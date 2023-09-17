import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function useStoreUserEffect() {
  const { isAuthenticated } = useConvexAuth();

  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const storeUser = useMutation(api.users.store);
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // If the user is not logged in don't do anything
    if (!isAuthenticated) {
      return;
    }

    const getUserIdfromLocalStorage = () => {
      if (
        typeof window !== "undefined" &&
        localStorage.getItem("userId") !== null
      ) {
        setUserId(localStorage.getItem("userId") as Id<"users">);
      }
    };
    getUserIdfromLocalStorage();

    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
      localStorage.setItem("userId", id);
      setUserId(id);
    }
    createUser();

    return () => setUserId(null);
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated, storeUser, userId]);

  return userId;
}

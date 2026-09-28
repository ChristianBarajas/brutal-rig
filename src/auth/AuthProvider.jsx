import { useCallback, useEffect, useMemo, useState } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { getFirebaseServices } from "../lib/firebase";
import { AuthContext } from "./auth-context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState(null);
  const [status, setStatus] = useState("loading");
  const [configurationError, setConfigurationError] = useState("");

  useEffect(() => {
    let isActive = true;
    let unsubscribe = () => {};

    getFirebaseServices()
      .then(async (nextServices) => {
        await setPersistence(nextServices.auth, browserLocalPersistence);

        if (!isActive) {
          return;
        }

        setServices(nextServices);
        unsubscribe = onAuthStateChanged(nextServices.auth, (nextUser) => {
          if (isActive) {
            setUser(nextUser);
            setStatus("ready");
          }
        });
      })
      .catch((error) => {
        if (isActive) {
          setConfigurationError(error.message);
          setStatus("unavailable");
        }
      });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!services) {
      throw new Error("Account services are not ready yet.");
    }

    return signInWithPopup(services.auth, services.googleProvider);
  }, [services]);

  const signInWithEmail = useCallback(
    async (email, password) => {
      if (!services) {
        throw new Error("Account services are not ready yet.");
      }

      return signInWithEmailAndPassword(services.auth, email, password);
    },
    [services],
  );

  const createAccount = useCallback(
    async ({ displayName, email, password }) => {
      if (!services) {
        throw new Error("Account services are not ready yet.");
      }

      const credential = await createUserWithEmailAndPassword(
        services.auth,
        email,
        password,
      );

      if (displayName.trim()) {
        await updateProfile(credential.user, {
          displayName: displayName.trim(),
        });
      }

      return credential;
    },
    [services],
  );

  const signOut = useCallback(async () => {
    if (services) {
      await firebaseSignOut(services.auth);
    }
  }, [services]);

  const value = useMemo(
    () => ({
      user,
      db: services?.db ?? null,
      status,
      configurationError,
      signInWithGoogle,
      signInWithEmail,
      createAccount,
      signOut,
    }),
    [
      user,
      services,
      status,
      configurationError,
      signInWithGoogle,
      signInWithEmail,
      createAccount,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

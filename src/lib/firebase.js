import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let servicesPromise;

function getEnvironmentConfig() {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  return Object.values(config).every(Boolean) ? config : null;
}

async function getHostingConfig() {
  const response = await fetch("/__/firebase/init.json", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Firebase Hosting configuration is unavailable.");
  }

  const config = await response.json();

  if (!config.apiKey || !config.projectId || !config.appId) {
    throw new Error("Firebase configuration is incomplete.");
  }

  return config;
}

export function getFirebaseServices() {
  if (!servicesPromise) {
    servicesPromise = (async () => {
      const config = getEnvironmentConfig() ?? (await getHostingConfig());
      const app = getApps()[0] ?? initializeApp(config);

      return {
        app,
        auth: getAuth(app),
        db: getFirestore(app),
        googleProvider: new GoogleAuthProvider(),
      };
    })();
  }

  return servicesPromise;
}


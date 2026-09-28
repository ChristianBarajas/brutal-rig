import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

function removeUndefined(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createSavedRigPayload({ rig, advice = null }) {
  if (!rig?.items?.length || !rig?.builderData) {
    throw new Error("A complete rig is required before it can be saved.");
  }

  return removeUndefined({
    name: rig.name,
    rig,
    advice,
    instrument: rig.builderData.instrument,
    tone: rig.builderData.tone,
    budget: rig.builderData.budget,
    totalPrice: rig.totalPrice,
    itemCount: rig.items.length,
  });
}

function rigsCollection(db, userId) {
  return collection(db, "users", userId, "rigs");
}

export async function saveRig({ db, userId, rig, advice, savedRigId }) {
  const payload = {
    ...createSavedRigPayload({ rig, advice }),
    updatedAt: serverTimestamp(),
  };

  if (savedRigId) {
    await updateDoc(doc(db, "users", userId, "rigs", savedRigId), payload);
    return savedRigId;
  }

  const reference = await addDoc(rigsCollection(db, userId), {
    ...payload,
    createdAt: serverTimestamp(),
  });

  return reference.id;
}

export function subscribeToSavedRigs({ db, userId, onChange, onError }) {
  const rigsQuery = query(
    rigsCollection(db, userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    rigsQuery,
    (snapshot) => {
      onChange(
        snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        })),
      );
    },
    onError,
  );
}

export async function getSavedRig({ db, userId, rigId }) {
  const snapshot = await getDoc(doc(db, "users", userId, "rigs", rigId));

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() };
}

export async function renameSavedRig({ db, userId, rigId, name }) {
  const normalizedName = name.trim().slice(0, 80);

  if (!normalizedName) {
    throw new Error("Rig name cannot be empty.");
  }

  await updateDoc(doc(db, "users", userId, "rigs", rigId), {
    name: normalizedName,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteSavedRig({ db, userId, rigId }) {
  await deleteDoc(doc(db, "users", userId, "rigs", rigId));
}


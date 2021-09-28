import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, enableIndexedDbPersistence } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBYasCzpw0364viUN50gGLpaPSTSfIkq0g",
    authDomain: "todo-app-e225d.firebaseapp.com",
    projectId: "todo-app-e225d",
    storageBucket: "todo-app-e225d.appspot.com",
    messagingSenderId: "761498319334",
    appId: "1:761498319334:web:271614ab2f1a35ca287e27"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore();

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully

async function updateDB() {
    try {
        await setDoc(doc(db, "data", "datadoc"), {
          currentList: JSON.stringify(currentList),
          lists: JSON.stringify(lists),
          nextListId: JSON.stringify(nextListId),
        });
        console.log("data overwritten");
      } catch (e) {
        console.error("Error updating data in Firestore: ", e);
      }
}


export { updateDB, db };
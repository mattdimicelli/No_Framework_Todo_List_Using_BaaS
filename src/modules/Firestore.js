import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, enableIndexedDbPersistence } from "firebase/firestore";
import { currentList, lists, logic, nextListId } from './Logic';


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


async function loadFromFirestore() {
    const docRef = doc(db, "data", "datadoc");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("there's stuff in the Firestore");
        const data = docSnap.data();
        logic.writeOverCurrentList(JSON.parse(data.currentList));
        lists = JSON.parse(data.lists);
        nextListId = JSON.parse(data.nextListId);
        domController.renderLists();
        domController.renderTasks();
        domController.updateColumnName();
    } else {
        console.log('nothing in Firestore');
        logic.setDefaultList();
    }
}

document.addEventListener('DOMContentLoaded', loadFromFirestore);


export { updateDB, loadFromFirestore };
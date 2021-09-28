import { Task } from './Task';
import { List } from './List';
import { domController } from './DomController';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, enableIndexedDbPersistence } from "firebase/firestore";


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

let currentList;
let nextListId = 0;
let lists = {};


class Logic {
    constructor() {}

    createNewTask(name, dueDate, details = "", taskId) {
        return new Task(name, dueDate, details, taskId);
    }

    addTaskToCurrentList(task) {
        currentList.tasks[task.taskId] = task;
        updateDB();
    }

    modifyTask(name, dueDate, details = '', taskId) {
        for (const task of Object.values(currentList.tasks)) {
            if(task.taskId == taskId) {
                task.name = name;
                task.dueDate = dueDate;
                task.details = details;
                updateDB();
                break;
            }
        }
    }

    deleteTask(task) {
        delete currentList.tasks[task];
        updateDB();
    }

    createNewList(name) {
        const newList = new List(name, nextListId++);
        lists[name] = newList;
        updateDB();
    }

    modifyListName(oldName, newName) {
        lists[newName] = lists[oldName];
        delete lists[oldName];
        lists[newName].name = newName;
        updateDB();
    }

    
    setDefaultList() {
        if (Object.keys(lists).length === 0) {
            const chores = new List('Chores', nextListId++);
            lists.Chores = chores;
            this.makeCurrentList('Chores');
        } 
    }

    makeCurrentList(listName) {
        currentList = lists[listName];
    }

    writeOverCurrentList(dataFromStorage) {
        currentList = dataFromStorage;
    }

    setCurrentListToBeOneOfTheRemainingLists() {
        const firstList = Object.keys(lists)[0];
        this.makeCurrentList(firstList);
    }

    deleteList(listName) {
        delete lists[listName];
        updateDB();
    }
}

const logic = new Logic();
    
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

document.addEventListener('DOMContentLoaded', async function() {
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
});


export {currentList, lists, logic, nextListId};

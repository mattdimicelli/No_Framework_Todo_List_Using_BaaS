import Task from './Task';
import List from './List';
import { domController } from './DomController';
import { updateFirestoreDB, db } from './Firestore';
import { getDoc, doc } from "firebase/firestore";


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
        updateFirestoreDB();
    }

    modifyTask(name, dueDate, details = '', taskId) {
        for (const task of Object.values(currentList.tasks)) {
            if(task.taskId == taskId) {
                task.name = name;
                task.dueDate = dueDate;
                task.details = details;
                updateFirestoreDB();
                break;
            }
        }
    }

    deleteTask(task) {
        delete currentList.tasks[task];
        updateFirestoreDB();
    }

    createNewList(name) {
        const newList = new List(name, nextListId++);
        lists[name] = newList;
        updateFirestoreDB();
    }

    modifyListName(oldName, newName) {
        lists[newName] = lists[oldName];
        delete lists[oldName];
        lists[newName].name = newName;
        updateFirestoreDB();
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
        updateFirestoreDB();
    }
}

const logic = new Logic();

/* Although the following function is related to the Firestore database,
I have left it here since it involves the lists object, and moving this function
to the Firestore module would involve refactoring of much of the logic, which
I deem unnecesary. */

async function loadToDoListDataFromFirestore() {
    const docRef = doc(db, "data", "datadoc");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("there's stuff in the Firestore");
        const data = docSnap.data();
        logic.writeOverCurrentList(JSON.parse(data.currentList));
        lists = JSON.parse(data.lists);
        nextListId = JSON.parse(data.nextListId);
        domController.renderDataFromFirestore();
    } else {
        console.log('nothing in Firestore');
        logic.setDefaultList();
    }
}

document.addEventListener('DOMContentLoaded', loadToDoListDataFromFirestore);
    

export {currentList, lists, logic, nextListId};

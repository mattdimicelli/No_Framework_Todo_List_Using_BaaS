import { Task } from './Task';
import { List } from './List';
import { domController } from './DomController';
import { updateDB, db } from './Firestore';
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
    

export {currentList, lists, logic, nextListId};

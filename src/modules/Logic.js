import Task from './Task';
import List from './List';
import { saveToFirestoreDB } from './Firestore';

class Logic {
    constructor() {
        this.currentList = undefined;
        this.nextListId = 0;
        this.lists = {};
    }

    createNewTask(name, dueDate, details = "", taskId) {
        return new Task(name, dueDate, details, taskId);
    }

    addTaskToCurrentList(task) {
        this.currentList.tasks[task.taskId] = task;
        saveToFirestoreDB(this.currentList, this.nextListId, this.lists);
    }

    modifyTask(name, dueDate, details = '', taskId) {
        for (let task of Object.values(this.currentList.tasks)) {
            if(task.taskId == taskId) {
                task.name = name;
                task.dueDate = dueDate;
                task.details = details;
                saveToFirestoreDB(this.currentList, this.nextListId, this.lists);
                break;
            }
        }
    }

    deleteTask(task) {
        delete this.currentList.tasks[task];
        saveToFirestoreDB(this.currentList, this.nextListId, this.lists);
    }

    createNewList(listName) {
        let newList = new List(listName, this.nextListId++);
        this.lists[listName] = newList;
        saveToFirestoreDB(this.currentList, this.nextListId, this.lists);
    }

    modifyListName(oldName, newName) {
        this.lists[newName] = this.lists[oldName];
        delete this.lists[oldName];
        this.lists[newName].name = newName;
        saveToFirestoreDB(this.currentList, this.nextListId, this.lists);
    }

    setDefaultList() {
        if (Object.keys(this.lists).length === 0) {
            let chores = new List('Chores', this.nextListId++);
            this.lists.chores = chores;
            this.makeCurrentList('chores');
        } 
    }

    makeCurrentList(listName) {
        this.currentList = this.lists[listName];
    }

    updateData(dataFromFirebase) {
        this.currentList = dataFromFirebase.currentList;
        this.lists = dataFromFirebase.lists;
        this.nextListId = dataFromFirebase.nextListId;
    }

    setOneOfTheRemainingListsToBeCurrentList() {
        let firstListName = Object.keys(this.lists)[0];
        this.makeCurrentList(firstListName);
    }

    deleteList(listName) {
        delete this.lists[listName];
        saveToFirestoreDB(this.currentList, this.nextListId, this.lists);
    }
}

export default new Logic();

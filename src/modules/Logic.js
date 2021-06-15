import {Task} from './Task';
import {List} from './List';

let currentList;
let nextListId = 0;

const lists = {};

class Logic {
    constructor() {}

    createNewTask(name, dueDate, details = "", taskId) {
        return new Task(name, dueDate, details, taskId);
    }

    addTaskToCurrentList(task) {
        currentList.tasks[task.taskId] = task;
    }

    modifyTask(name, dueDate, details = '', taskId) {
        for (const task of Object.values(currentList.tasks)) {
            if(task.taskId == taskId) {
                task.name = name;
                task.dueDate = dueDate;
                task.details = details;
                break;
            }
        }
    }

    deleteTask(task) {
        delete currentList.tasks[task];
    }

    createNewList(name) {
        const newList = new List(name, nextListId++);
        lists[name] = newList;
    }

    modifyListName(oldName, newName) {
        lists[newName] = lists[oldName];
        delete lists[oldName];
        lists[newName].name = newName;
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

    setCurrentListToARemainingList() {
        const firstList = Object.keys(lists)[0];
        this.makeCurrentList(firstList);
    }

    deleteList(listName) {
        delete lists[listName];
    }


   
}

const logic = new Logic();

export {currentList, lists, logic, nextListId};
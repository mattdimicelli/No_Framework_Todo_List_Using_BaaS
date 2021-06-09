import {Task} from './Task';
import {List} from './List';

let currentList;


const lists = new Map();

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

     // getCurrentTask() {
    //     return currentTask;
    // }

    // createNewList() {
    //     const newList = new List(name);
    //     lists.set(newList, newList);
    // }

    
    setDefaultList() {
        if (lists.size === 0) {
            const chores = new List('Chores');
            lists.set(chores, chores);
            this.setCurrentList(lists.get(chores));
        } 
    }

    setCurrentList(list) {
        currentList = list;
    }

    // getCurrentList() {
    //     return currentList;
    // }

   
}

const logic = new Logic();

export {currentList, lists, logic};
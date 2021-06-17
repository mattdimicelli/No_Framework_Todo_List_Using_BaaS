/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DomController.js":
/*!**************************************!*\
  !*** ./src/modules/DomController.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domController": () => (/* binding */ domController)
/* harmony export */ });
/* harmony import */ var _Logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logic */ "./src/modules/Logic.js");


let oldName;


class DomController {

    constructor()  {}

    initializeClickEventListeners() {
        document.addEventListener('click', this.handleClick.bind(this));
    }
    
    handleClick(e) {
        let target;

        if(e.target.closest('i')) {
            target = e.target.closest('i');
            if(target.classList.contains('new-list-cancel-btn')) {
                e.preventDefault();
                target.parentElement.remove();
            }
            if(target.classList.contains('new-list-submit-btn')) {
                e.preventDefault();
                const listTextInput = target.previousElementSibling.previousElementSibling;
                const listName = target.previousElementSibling.previousElementSibling.value;
                this.newListSubmitBtnHandler(target, listName, listTextInput);
            }
            if(target.classList.contains('edit-list-icon')) {
                e.preventDefault();
                const listItem = target.parentElement.parentElement;
                const listName = target.parentElement.parentElement.textContent;
                this.editListIconHandler(listName, listItem); 
            }
            if(target.classList.contains('edit-list-submit-btn')) {
                e.preventDefault();
                const textInput = target.previousElementSibling.previousElementSibling.previousElementSibling;
                const newName = target.previousElementSibling.previousElementSibling.previousElementSibling.value;
                if(newName === oldName) {
                     textInput.focus();
                     return;
                }
                this.editListSubmitBtnHandler(newName, textInput);
            }
            if(target.classList.contains('edit-list-cancel-btn')) {
                e.preventDefault();
                this.renderLists();
            }
            if(target.className === 'far fa-trash-alt list') {
                e.preventDefault();
                this.deleteListHandler();
            }
        }
        
        if(e.target.closest('div[class="task-date-btns"]') && e.target.className !== 'fas fa-edit') {
            const taskTarget = e.target.closest('div[class="task-date-btns"]').firstElementChild;
            const dateTarget = e.target.closest('div[class="task-date-btns"]').children[1].firstElementChild;
            this.toggleStrikethruTask(taskTarget, dateTarget);
        }

        target = e.target.closest('button, li');

        if(target) {
            if(target.className === 'menu-btn') {
                const menu = document.querySelector('.menu');
                this.menuBtnHandler(menu);
            }
            if(target.className === 'edit-task-btn') {
                const taskEditor = target.parentElement.parentElement.parentElement.children[1];
                const taskId = target.parentElement.parentElement.parentElement.dataset.id;         
                this.taskEditorHandler(taskEditor, taskId);
            }
            if(target.className === 'edit-task-submit-btn') {
                e.preventDefault();
                this.editTaskSubmitBtnHandler(target);
            }
            if(target.className === 'new-task-btn') {
                const newTaskEditor = target.previousElementSibling;
                this.newTaskBtnHandler(newTaskEditor);
            }
            if(target.className === 'task-delete-btn') {
                e.preventDefault();
                this.taskDeleteBtnHandler(target);
            }
            if(target.className === 'cancel-new-task-btn') {
                e.preventDefault();
                const newTaskEditor = target.parentElement.parentElement.parentElement;
                this.cancelNewTaskBtnHandler(newTaskEditor);
            }
            if(target.classList.contains('add-list-btn')) {
                e.preventDefault();
                this.addListBtnHandler();
            } 
            if(target.className === 'list menu-btn' && !target.children[1].matches('input')) {
                const listName = target.childNodes[1].textContent;
                this.changeListHandler(listName);
            }
            if(target.className === 'menu-btn all') {
                e.preventDefault();
                this.renderTasks();
            }
            if(target.className === 'menu-btn today') {
                e.preventDefault();
                this.viewOnlyToday();
            }
            if(target.className === 'menu-btn week') {
                e.preventDefault();
                this.viewOnlyWeek();
            }
        }
    }

    toggleStrikethruTask(taskTarget, dateTarget) {
        taskTarget.classList.toggle('strikethru');
        dateTarget.classList.toggle('strikethru');
    }

    viewOnlyWeek() {
        const ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        for (const task of Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks).filter(task => {
            const dueDateObj = new Date(task.dueDate);

            if (Math.abs(Date.now() - dueDateObj) <= 6.048e8) {
                return true;
            } else return false;
        })) {
            const html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
            ulForTasks.innerHTML += html;
        }
    }

    createTaskHTML(taskId, name, dueDate) {
        const html = `<li class="todo-item" data-id="${taskId}">
        <div class="task-date-btns">
            <span class="task">${name}</span>
            <div class="date-and-btns">
                <span class="due-date">${this.createReadableDate(dueDate)}</span>
                <button class="edit-task-btn"><i class="fas fa-edit"></i></button>

            </div>
        </div>
    <div class="task-editor hidden">
                    <form action="" method="get" class="task-editor-form">
                        <input class="task-field" name="task" type="text" placeholder="Task" />
                        <textarea class="description-field" name="description" placeholder="Details"></textarea>
                        <div class="datepicker-addbutton">
                            <input class="date-picker" name="due-date" type="date" required />
                            <button class="task-delete-btn"><i class="far fa-trash-alt"></i></button>
                            <button class="edit-task-submit-btn"><i class="far fa-check-circle"></i></button>
                        </div>
                    </form>
                </div>
            </li>`;
        return html;
    }

    viewOnlyToday() {
        const ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        for (const task of Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks).filter(task => {
            const dueDateObj = new Date(task.dueDate);
            const dueDateDay = dueDateObj.getUTCDate();
            const dueDateMonth = dueDateObj.getUTCMonth();
            const dueDateYear = dueDateObj.getUTCFullYear();
            const currentDay = new Date().getUTCDate();
            const currentMonth = new Date().getUTCMonth();
            const currentYear = new Date().getUTCFullYear();

            if (dueDateDay === currentDay && dueDateMonth === currentMonth && dueDateYear === currentYear) {
                return true;
            } else return false;
        })) {
            const html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
            ulForTasks.innerHTML += html;
        }
    }

    updateColumnName() {
        const columnName = document.querySelector('.list-column-name');
        columnName.textContent = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.name;
    }

 

    deleteListHandler() {
        const reallyDelete = confirm(`Are you sure that you want to delete the ${oldName} list and all associated tasks?`);
        if(reallyDelete) {
            if(Object.keys(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).length > 1) {
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.deleteList(oldName);
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setCurrentListToARemainingList();
                this.renderLists();
                this.renderTasks();
                this.updateColumnName();
            } else {
                alert('Unable to delete your only list!');
                this.renderLists();
            }
        } else {
            this.renderLists();
        }
    }

    deleteListBtnHandler() {
        const reallyDelete = confirm(`Are you sure that you want to delete the ${oldName} list and all of it's associated tasks?`);
        if(reallyDelete) {
            delete _Logic__WEBPACK_IMPORTED_MODULE_0__.lists[oldName];
            if(Object.keys(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).length === 0) {
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setCurrentyList = null;
            } else { _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setNextListAsCurrent();
            }
            this.renderLists();
            this.renderTasks();   
        } else this.renderLists();

    }

    editListSubmitBtnHandler(newName, textInput) {
        if(newName === '') {
            textInput.focus();
            return;
        }
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyListName(oldName, newName);
        this.renderLists();
        this.changeListHandler(newName);
    }

    editListIconHandler(listName, listItem) {
        oldName = listName;
        const html = `<i class="fas fa-list-alt"></i><input class="new-list-text-input" type="text" value="${listName}" /><i class="far fa-trash-alt list"></i><i class="far fa-times-circle edit-list-cancel-btn"></i><i class="far fa-check-circle edit-list-submit-btn"></i>`;
        listItem.innerHTML = html;
    }

    changeListHandler(listName) {
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.makeCurrentList(listName);
        this.renderTasks();
        const columnName = document.querySelector('.list-column-name');
        columnName.textContent = listName;
    }


    newListSubmitBtnHandler(target, listName, listTextInput) {
        if(listName === '') {
            listTextInput.focus();
            return;
        }
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.createNewList(listName);
        target.parentElement.remove();
        this.renderLists();
        this.changeListHandler(listName);
    }

    renderLists() {
        const ul = document.querySelector('.ul-list-of-lists');
        let html = '';
        const sortedLists = Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).sort((list1, list2) => {
            if(list1.id > list2.id) return 1;
            if (list1.id === list2.id) return 0;
            if (list1.id < list2.id) return -1;
        }); 
        for (const list of sortedLists) {
            html += `<li class="list menu-btn"><i class="fas fa-list-alt edit-list-icon"></i>${list.name}<span class="edit-list-icon"><i class="fas fa-edit edit-list-icon"></i></span></li>`;
        }
        ul.innerHTML = html;
    }

    menuBtnHandler(menu) {
        const display = window.getComputedStyle(menu).display;
        if(display === 'none'){
            menu.style.display = 'block';
        }
        else menu.style.display = 'none';
    }

    addListBtnHandler() {
        const ul = document.querySelector('.ul-list-of-lists');
        const li = document.createElement('li');
        li.classList.add('list', 'menu-btn');
        const i = document.createElement('i');
        i.classList.add('fas', 'fa-list-alt');
        li.append(i);
        const textInput = `<input class="new-list-text-input" type="text" /><i class="far fa-times-circle new-list-cancel-btn"></i><i class="far fa-check-circle new-list-submit-btn"></i>`;
        li.insertAdjacentHTML('beforeend', textInput);
        ul.append(li);
    }

    taskDeleteBtnHandler(target) {
        const taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.deleteTask(taskId);
        this.renderTasks();
    }

    taskEditorHandler(taskEditor, taskId) {
        taskEditor.classList.toggle('hidden');
        const taskTextInput = taskEditor.firstElementChild.firstElementChild;
        const detailsTextarea = taskEditor.firstElementChild.firstElementChild.nextElementSibling;
        const datepicker = taskEditor.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;
    
        taskTextInput.value = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].name;
     
        detailsTextarea.value = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].details;
        datepicker.valueAsNumber = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].dueDate;
    }

    editTaskSubmitBtnHandler(target) {
        
        const taskName = target.parentElement.parentElement.children[0].value;
        const details = target.parentElement.parentElement.children[1].value;
        const dueDate = target.parentElement.parentElement.children[2].firstElementChild.valueAsDate;

        if(!this.dueDateIsValid(dueDate)){
            target.parentElement.parentElement.children[2].firstElementChild.focus();
        }

        if(!taskName) {
            target.parentElement.parentElement.children[0].focus();
        }

        if(taskName && this.dueDateIsValid(dueDate)) {
            const taskIsNew = (target.parentElement.parentElement.parentElement.className === 'new-task-editor') ? true : false;
            const currentTime = Date.now(); //will use currentTime as a unique identifier for each task

            if(taskIsNew) {
                const task = _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.createNewTask(taskName, dueDate, details, currentTime);
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.addTaskToCurrentList(task); //here?
                this.renderTasks();
            }
            if(!taskIsNew) {
                const taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyTask(taskName, dueDate, details, taskId);
                this.renderTasks();
            }
            const taskEditor = target.parentElement.parentElement.parentElement;
            if(taskEditor.className === 'new-task-editor') {
                    taskEditor.firstElementChild.firstElementChild.value = '';
                    taskEditor.firstElementChild.children[1].value = '';
                    taskEditor.firstElementChild.children[2].firstElementChild.value = '';
                taskEditor.classList.toggle('hidden');
            }
        }
    }

    dueDateIsValid(dueDateValueAsNumber) {
        if(isNaN(dueDateValueAsNumber)) return false;
        return true;
    }

    cancelNewTaskBtnHandler(newTaskEditor) {
        newTaskEditor.classList.add('hidden');
    }

    newTaskBtnHandler(newTaskEditor) {
        newTaskEditor.classList.remove('hidden');
    }

    renderTasks() {
        const ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        if(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList === null) ulForTasks.innerHTML = '';
        for (const task of Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks)) {
            const html = this.createTaskHTML(task.taskId, task.name, task.dueDate); //here
            ulForTasks.innerHTML += html;
        }
    }

    createReadableDate(dateValueAsNumber) {
        const date = new Date(dateValueAsNumber);
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`;
    }
}

const domController = new DomController();



//issues.  can't get task name to wrap at 50%;

/***/ }),

/***/ "./src/modules/List.js":
/*!*****************************!*\
  !*** ./src/modules/List.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "List": () => (/* binding */ List)
/* harmony export */ });
class List {
    constructor(name, id) {
        this.name = name;
        this.tasks = {};
        this.id = id;
    }
}



/***/ }),

/***/ "./src/modules/Logic.js":
/*!******************************!*\
  !*** ./src/modules/Logic.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentList": () => (/* binding */ currentList),
/* harmony export */   "lists": () => (/* binding */ lists),
/* harmony export */   "logic": () => (/* binding */ logic),
/* harmony export */   "nextListId": () => (/* binding */ nextListId)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List */ "./src/modules/List.js");
/* harmony import */ var _DomController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DomController */ "./src/modules/DomController.js");




let currentList;
let nextListId = 0;

let lists = {};


class Logic {
    constructor() {}

    createNewTask(name, dueDate, details = "", taskId) {
        return new _Task__WEBPACK_IMPORTED_MODULE_0__.Task(name, dueDate, details, taskId);
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
        const newList = new _List__WEBPACK_IMPORTED_MODULE_1__.List(name, nextListId++);
        lists[name] = newList;
    }

    modifyListName(oldName, newName) {
        lists[newName] = lists[oldName];
        delete lists[oldName];
        lists[newName].name = newName;
    }

    
    setDefaultList() {
        if (Object.keys(lists).length === 0) {
            const chores = new _List__WEBPACK_IMPORTED_MODULE_1__.List('Chores', nextListId++);
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

    


window.addEventListener('beforeunload', function() {
    localStorage.setItem('currentList', JSON.stringify(currentList));
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('nextListId', JSON.stringify(nextListId));
})

document.addEventListener('DOMContentLoaded', function() {
    if(Object.keys(localStorage).length > 0) {
            console.log('theres stuff in local storage');
            logic.writeOverCurrentList(JSON.parse(localStorage.getItem('currentList')));
            lists = JSON.parse(localStorage.getItem('lists'));
            nextListId = JSON.parse(localStorage.getItem('nextListId'));
            _DomController__WEBPACK_IMPORTED_MODULE_2__.domController.renderLists();
            _DomController__WEBPACK_IMPORTED_MODULE_2__.domController.renderTasks();
            _DomController__WEBPACK_IMPORTED_MODULE_2__.domController.updateColumnName();
    } else {
        console.log('nothing in local storage');
        logic.setDefaultList();
    }
})





/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
class Task {

    constructor(name, dueDate, details = "", taskId) {
        this.name = name;
        this.dueDate = dueDate;
        this.details = details;
        this.taskId = taskId;
    }



}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_DomController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DomController */ "./src/modules/DomController.js");







_modules_DomController__WEBPACK_IMPORTED_MODULE_0__.domController.initializeClickEventListeners();













})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EOztBQUVuRDs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05zRDs7Ozs7OztBQU90RCwrRkFBMkMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvZ2ljLCBjdXJyZW50TGlzdCwgbGlzdHN9IGZyb20gJy4vTG9naWMnO1xuXG5sZXQgb2xkTmFtZTtcblxuXG5jbGFzcyBEb21Db250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkgIHt9XG5cbiAgICBpbml0aWFsaXplQ2xpY2tFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgIGxldCB0YXJnZXQ7XG5cbiAgICAgICAgaWYoZS50YXJnZXQuY2xvc2VzdCgnaScpKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdpJyk7XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctbGlzdC1jYW5jZWwtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctbGlzdC1zdWJtaXQtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFRleHRJbnB1dCA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3TGlzdFN1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0LCBsaXN0TmFtZSwgbGlzdFRleHRJbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWxpc3QtaWNvbicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0TmFtZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0TGlzdEljb25IYW5kbGVyKGxpc3ROYW1lLCBsaXN0SXRlbSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1saXN0LXN1Ym1pdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZihuZXdOYW1lID09PSBvbGROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICB0ZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0TGlzdFN1Ym1pdEJ0bkhhbmRsZXIobmV3TmFtZSwgdGV4dElucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1jYW5jZWwtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2ZhciBmYS10cmFzaC1hbHQgbGlzdCcpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVMaXN0SGFuZGxlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihlLnRhcmdldC5jbG9zZXN0KCdkaXZbY2xhc3M9XCJ0YXNrLWRhdGUtYnRuc1wiXScpICYmIGUudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ2ZhcyBmYS1lZGl0Jykge1xuICAgICAgICAgICAgY29uc3QgdGFza1RhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2RpdltjbGFzcz1cInRhc2stZGF0ZS1idG5zXCJdJykuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICBjb25zdCBkYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnZGl2W2NsYXNzPVwidGFzay1kYXRlLWJ0bnNcIl0nKS5jaGlsZHJlblsxXS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RyaWtldGhydVRhc2sodGFza1RhcmdldCwgZGF0ZVRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdidXR0b24sIGxpJyk7XG5cbiAgICAgICAgaWYodGFyZ2V0KSB7XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51QnRuSGFuZGxlcihtZW51KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0lkID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7ICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrRWRpdG9ySGFuZGxlcih0YXNrRWRpdG9yLCB0YXNrSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzay1zdWJtaXQtYnRuJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRUYXNrU3VibWl0QnRuSGFuZGxlcih0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICd0YXNrLWRlbGV0ZS1idG4nKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFza0RlbGV0ZUJ0bkhhbmRsZXIodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdjYW5jZWwtbmV3LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsTmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtbGlzdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExpc3RCdG5IYW5kbGVyKCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2xpc3QgbWVudS1idG4nICYmICF0YXJnZXQuY2hpbGRyZW5bMV0ubWF0Y2hlcygnaW5wdXQnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VMaXN0SGFuZGxlcihsaXN0TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4gYWxsJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4gdG9kYXknKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld09ubHlUb2RheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuIHdlZWsnKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld09ubHlXZWVrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTdHJpa2V0aHJ1VGFzayh0YXNrVGFyZ2V0LCBkYXRlVGFyZ2V0KSB7XG4gICAgICAgIHRhc2tUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnc3RyaWtldGhydScpO1xuICAgICAgICBkYXRlVGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3N0cmlrZXRocnUnKTtcbiAgICB9XG5cbiAgICB2aWV3T25seVdlZWsoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpLmZpbHRlcih0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVPYmogPSBuZXcgRGF0ZSh0YXNrLmR1ZURhdGUpO1xuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoRGF0ZS5ub3coKSAtIGR1ZURhdGVPYmopIDw9IDYuMDQ4ZTgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLnRhc2tJZCwgdGFzay5uYW1lLCB0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVRhc2tIVE1MKHRhc2tJZCwgbmFtZSwgZHVlRGF0ZSkge1xuICAgICAgICBjb25zdCBodG1sID0gYDxsaSBjbGFzcz1cInRvZG8taXRlbVwiIGRhdGEtaWQ9XCIke3Rhc2tJZH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZGF0ZS1idG5zXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhc2tcIj4ke25hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGUtYW5kLWJ0bnNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImR1ZS1kYXRlXCI+JHt0aGlzLmNyZWF0ZVJlYWRhYmxlRGF0ZShkdWVEYXRlKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPjwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRhc2stZWRpdG9yIGhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIiBtZXRob2Q9XCJnZXRcIiBjbGFzcz1cInRhc2stZWRpdG9yLWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRhc2stZmllbGRcIiBuYW1lPVwidGFza1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUYXNrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImRlc2NyaXB0aW9uLWZpZWxkXCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXRhaWxzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWFkZGJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImRhdGUtcGlja2VyXCIgbmFtZT1cImR1ZS1kYXRlXCIgdHlwZT1cImRhdGVcIiByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrLWRlbGV0ZS1idG5cIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1zdWJtaXQtYnRuXCI+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+YDtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuXG4gICAgdmlld09ubHlUb2RheSgpIHtcbiAgICAgICAgY29uc3QgdWxGb3JUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGUtdGFzay1pdGVtcycpO1xuICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZU9iaiA9IG5ldyBEYXRlKHRhc2suZHVlRGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlRGF5ID0gZHVlRGF0ZU9iai5nZXRVVENEYXRlKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlTW9udGggPSBkdWVEYXRlT2JqLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlWWVhciA9IGR1ZURhdGVPYmouZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBuZXcgRGF0ZSgpLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IG5ldyBEYXRlKCkuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRVVENGdWxsWWVhcigpO1xuXG4gICAgICAgICAgICBpZiAoZHVlRGF0ZURheSA9PT0gY3VycmVudERheSAmJiBkdWVEYXRlTW9udGggPT09IGN1cnJlbnRNb250aCAmJiBkdWVEYXRlWWVhciA9PT0gY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLnRhc2tJZCwgdGFzay5uYW1lLCB0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUNvbHVtbk5hbWUoKSB7XG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1jb2x1bW4tbmFtZScpO1xuICAgICAgICBjb2x1bW5OYW1lLnRleHRDb250ZW50ID0gY3VycmVudExpc3QubmFtZTtcbiAgICB9XG5cbiBcblxuICAgIGRlbGV0ZUxpc3RIYW5kbGVyKCkge1xuICAgICAgICBjb25zdCByZWFsbHlEZWxldGUgPSBjb25maXJtKGBBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgdGhlICR7b2xkTmFtZX0gbGlzdCBhbmQgYWxsIGFzc29jaWF0ZWQgdGFza3M/YCk7XG4gICAgICAgIGlmKHJlYWxseURlbGV0ZSkge1xuICAgICAgICAgICAgaWYoT2JqZWN0LmtleXMobGlzdHMpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsb2dpYy5kZWxldGVMaXN0KG9sZE5hbWUpO1xuICAgICAgICAgICAgICAgIGxvZ2ljLnNldEN1cnJlbnRMaXN0VG9BUmVtYWluaW5nTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb2x1bW5OYW1lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gZGVsZXRlIHlvdXIgb25seSBsaXN0IScpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZUxpc3RCdG5IYW5kbGVyKCkge1xuICAgICAgICBjb25zdCByZWFsbHlEZWxldGUgPSBjb25maXJtKGBBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgdGhlICR7b2xkTmFtZX0gbGlzdCBhbmQgYWxsIG9mIGl0J3MgYXNzb2NpYXRlZCB0YXNrcz9gKTtcbiAgICAgICAgaWYocmVhbGx5RGVsZXRlKSB7XG4gICAgICAgICAgICBkZWxldGUgbGlzdHNbb2xkTmFtZV07XG4gICAgICAgICAgICBpZihPYmplY3Qua2V5cyhsaXN0cykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9naWMuc2V0Q3VycmVudHlMaXN0ID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7IGxvZ2ljLnNldE5leHRMaXN0QXNDdXJyZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7ICAgXG4gICAgICAgIH0gZWxzZSB0aGlzLnJlbmRlckxpc3RzKCk7XG5cbiAgICB9XG5cbiAgICBlZGl0TGlzdFN1Ym1pdEJ0bkhhbmRsZXIobmV3TmFtZSwgdGV4dElucHV0KSB7XG4gICAgICAgIGlmKG5ld05hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0ZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2dpYy5tb2RpZnlMaXN0TmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICB0aGlzLmNoYW5nZUxpc3RIYW5kbGVyKG5ld05hbWUpO1xuICAgIH1cblxuICAgIGVkaXRMaXN0SWNvbkhhbmRsZXIobGlzdE5hbWUsIGxpc3RJdGVtKSB7XG4gICAgICAgIG9sZE5hbWUgPSBsaXN0TmFtZTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGA8aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdFwiPjwvaT48aW5wdXQgY2xhc3M9XCJuZXctbGlzdC10ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7bGlzdE5hbWV9XCIgLz48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgbGlzdFwiPjwvaT48aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgZWRpdC1saXN0LWNhbmNlbC1idG5cIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlIGVkaXQtbGlzdC1zdWJtaXQtYnRuXCI+PC9pPmA7XG4gICAgICAgIGxpc3RJdGVtLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuXG4gICAgY2hhbmdlTGlzdEhhbmRsZXIobGlzdE5hbWUpIHtcbiAgICAgICAgbG9naWMubWFrZUN1cnJlbnRMaXN0KGxpc3ROYW1lKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICBjb25zdCBjb2x1bW5OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtY29sdW1uLW5hbWUnKTtcbiAgICAgICAgY29sdW1uTmFtZS50ZXh0Q29udGVudCA9IGxpc3ROYW1lO1xuICAgIH1cblxuXG4gICAgbmV3TGlzdFN1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0LCBsaXN0TmFtZSwgbGlzdFRleHRJbnB1dCkge1xuICAgICAgICBpZihsaXN0TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGxpc3RUZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2dpYy5jcmVhdGVOZXdMaXN0KGxpc3ROYW1lKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VMaXN0SGFuZGxlcihsaXN0TmFtZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGlzdHMoKSB7XG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVsLWxpc3Qtb2YtbGlzdHMnKTtcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcbiAgICAgICAgY29uc3Qgc29ydGVkTGlzdHMgPSBPYmplY3QudmFsdWVzKGxpc3RzKS5zb3J0KChsaXN0MSwgbGlzdDIpID0+IHtcbiAgICAgICAgICAgIGlmKGxpc3QxLmlkID4gbGlzdDIuaWQpIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKGxpc3QxLmlkID09PSBsaXN0Mi5pZCkgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAobGlzdDEuaWQgPCBsaXN0Mi5pZCkgcmV0dXJuIC0xO1xuICAgICAgICB9KTsgXG4gICAgICAgIGZvciAoY29uc3QgbGlzdCBvZiBzb3J0ZWRMaXN0cykge1xuICAgICAgICAgICAgaHRtbCArPSBgPGxpIGNsYXNzPVwibGlzdCBtZW51LWJ0blwiPjxpIGNsYXNzPVwiZmFzIGZhLWxpc3QtYWx0IGVkaXQtbGlzdC1pY29uXCI+PC9pPiR7bGlzdC5uYW1lfTxzcGFuIGNsYXNzPVwiZWRpdC1saXN0LWljb25cIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0IGVkaXQtbGlzdC1pY29uXCI+PC9pPjwvc3Bhbj48L2xpPmA7XG4gICAgICAgIH1cbiAgICAgICAgdWwuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9XG5cbiAgICBtZW51QnRuSGFuZGxlcihtZW51KSB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtZW51KS5kaXNwbGF5O1xuICAgICAgICBpZihkaXNwbGF5ID09PSAnbm9uZScpe1xuICAgICAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBhZGRMaXN0QnRuSGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWwtbGlzdC1vZi1saXN0cycpO1xuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2xpc3QnLCAnbWVudS1idG4nKTtcbiAgICAgICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgaS5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtbGlzdC1hbHQnKTtcbiAgICAgICAgbGkuYXBwZW5kKGkpO1xuICAgICAgICBjb25zdCB0ZXh0SW5wdXQgPSBgPGlucHV0IGNsYXNzPVwibmV3LWxpc3QtdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgLz48aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgbmV3LWxpc3QtY2FuY2VsLWJ0blwiPjwvaT48aSBjbGFzcz1cImZhciBmYS1jaGVjay1jaXJjbGUgbmV3LWxpc3Qtc3VibWl0LWJ0blwiPjwvaT5gO1xuICAgICAgICBsaS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRleHRJbnB1dCk7XG4gICAgICAgIHVsLmFwcGVuZChsaSk7XG4gICAgfVxuXG4gICAgdGFza0RlbGV0ZUJ0bkhhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7XG4gICAgICAgIGxvZ2ljLmRlbGV0ZVRhc2sodGFza0lkKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgIH1cblxuICAgIHRhc2tFZGl0b3JIYW5kbGVyKHRhc2tFZGl0b3IsIHRhc2tJZCkge1xuICAgICAgICB0YXNrRWRpdG9yLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBjb25zdCB0YXNrVGV4dElucHV0ID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgY29uc3QgZGV0YWlsc1RleHRhcmVhID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgXG4gICAgICAgIHRhc2tUZXh0SW5wdXQudmFsdWUgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLm5hbWU7XG4gICAgIFxuICAgICAgICBkZXRhaWxzVGV4dGFyZWEudmFsdWUgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLmRldGFpbHM7XG4gICAgICAgIGRhdGVwaWNrZXIudmFsdWVBc051bWJlciA9IGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tJZF0uZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBlZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXNrTmFtZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0udmFsdWU7XG4gICAgICAgIGNvbnN0IGRldGFpbHMgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzFdLnZhbHVlO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZUFzRGF0ZTtcblxuICAgICAgICBpZighdGhpcy5kdWVEYXRlSXNWYWxpZChkdWVEYXRlKSl7XG4gICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzJdLmZpcnN0RWxlbWVudENoaWxkLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGFza05hbWUpIHtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRhc2tOYW1lICYmIHRoaXMuZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJc05ldyA9ICh0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stZWRpdG9yJykgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7IC8vd2lsbCB1c2UgY3VycmVudFRpbWUgYXMgYSB1bmlxdWUgaWRlbnRpZmllciBmb3IgZWFjaCB0YXNrXG5cbiAgICAgICAgICAgIGlmKHRhc2tJc05ldykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBsb2dpYy5jcmVhdGVOZXdUYXNrKHRhc2tOYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCBjdXJyZW50VGltZSk7XG4gICAgICAgICAgICAgICAgbG9naWMuYWRkVGFza1RvQ3VycmVudExpc3QodGFzayk7IC8vaGVyZT9cbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighdGFza0lzTmV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0lkID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDtcbiAgICAgICAgICAgICAgICBsb2dpYy5tb2RpZnlUYXNrKHRhc2tOYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCB0YXNrSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBpZih0YXNrRWRpdG9yLmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWVkaXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkcmVuWzFdLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZVZhbHVlQXNOdW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4oZHVlRGF0ZVZhbHVlQXNOdW1iZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpIHtcbiAgICAgICAgbmV3VGFza0VkaXRvci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBuZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKSB7XG4gICAgICAgIG5ld1Rhc2tFZGl0b3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyVGFza3MoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYoY3VycmVudExpc3QgPT09IG51bGwpIHVsRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKSkge1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMuY3JlYXRlVGFza0hUTUwodGFzay50YXNrSWQsIHRhc2submFtZSwgdGFzay5kdWVEYXRlKTsgLy9oZXJlXG4gICAgICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCArPSBodG1sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUmVhZGFibGVEYXRlKGRhdGVWYWx1ZUFzTnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlVmFsdWVBc051bWJlcik7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpICsgMTtcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAgIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRvbUNvbnRyb2xsZXIgPSBuZXcgRG9tQ29udHJvbGxlcigpO1xuXG5cblxuLy9pc3N1ZXMuICBjYW4ndCBnZXQgdGFzayBuYW1lIHRvIHdyYXAgYXQgNTAlOyIsImNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSB7fTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgTGlzdCB9OyIsImltcG9ydCB7VGFza30gZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7TGlzdH0gZnJvbSAnLi9MaXN0JztcbmltcG9ydCB7IGRvbUNvbnRyb2xsZXIgfSBmcm9tICcuL0RvbUNvbnRyb2xsZXInO1xuXG5sZXQgY3VycmVudExpc3Q7XG5sZXQgbmV4dExpc3RJZCA9IDA7XG5cbmxldCBsaXN0cyA9IHt9O1xuXG5cbmNsYXNzIExvZ2ljIHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBjcmVhdGVOZXdUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSBcIlwiLCB0YXNrSWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMsIHRhc2tJZCk7XG4gICAgfVxuXG4gICAgYWRkVGFza1RvQ3VycmVudExpc3QodGFzaykge1xuICAgICAgICBjdXJyZW50TGlzdC50YXNrc1t0YXNrLnRhc2tJZF0gPSB0YXNrO1xuICAgIH1cblxuICAgIG1vZGlmeVRhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9ICcnLCB0YXNrSWQpIHtcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpKSB7XG4gICAgICAgICAgICBpZih0YXNrLnRhc2tJZCA9PSB0YXNrSWQpIHtcbiAgICAgICAgICAgICAgICB0YXNrLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgIHRhc2suZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgICAgICAgICAgdGFzay5kZXRhaWxzID0gZGV0YWlscztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZVRhc2sodGFzaykge1xuICAgICAgICBkZWxldGUgY3VycmVudExpc3QudGFza3NbdGFza107XG4gICAgfVxuXG4gICAgY3JlYXRlTmV3TGlzdChuYW1lKSB7XG4gICAgICAgIGNvbnN0IG5ld0xpc3QgPSBuZXcgTGlzdChuYW1lLCBuZXh0TGlzdElkKyspO1xuICAgICAgICBsaXN0c1tuYW1lXSA9IG5ld0xpc3Q7XG4gICAgfVxuXG4gICAgbW9kaWZ5TGlzdE5hbWUob2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgICBsaXN0c1tuZXdOYW1lXSA9IGxpc3RzW29sZE5hbWVdO1xuICAgICAgICBkZWxldGUgbGlzdHNbb2xkTmFtZV07XG4gICAgICAgIGxpc3RzW25ld05hbWVdLm5hbWUgPSBuZXdOYW1lO1xuICAgIH1cblxuICAgIFxuICAgIHNldERlZmF1bHRMaXN0KCkge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMobGlzdHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgY2hvcmVzID0gbmV3IExpc3QoJ0Nob3JlcycsIG5leHRMaXN0SWQrKyk7XG4gICAgICAgICAgICBsaXN0cy5DaG9yZXMgPSBjaG9yZXM7XG4gICAgICAgICAgICB0aGlzLm1ha2VDdXJyZW50TGlzdCgnQ2hvcmVzJyk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgbWFrZUN1cnJlbnRMaXN0KGxpc3ROYW1lKSB7XG4gICAgICAgIGN1cnJlbnRMaXN0ID0gbGlzdHNbbGlzdE5hbWVdO1xuICAgIH1cblxuICAgIHdyaXRlT3ZlckN1cnJlbnRMaXN0KGRhdGFGcm9tU3RvcmFnZSkge1xuICAgICAgICBjdXJyZW50TGlzdCA9IGRhdGFGcm9tU3RvcmFnZTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TGlzdFRvQVJlbWFpbmluZ0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0TGlzdCA9IE9iamVjdC5rZXlzKGxpc3RzKVswXTtcbiAgICAgICAgdGhpcy5tYWtlQ3VycmVudExpc3QoZmlyc3RMaXN0KTtcbiAgICB9XG5cbiAgICBkZWxldGVMaXN0KGxpc3ROYW1lKSB7XG4gICAgICAgIGRlbGV0ZSBsaXN0c1tsaXN0TmFtZV07XG4gICAgfVxuXG5cbiAgIFxufVxuXG5jb25zdCBsb2dpYyA9IG5ldyBMb2dpYygpO1xuXG4gICAgXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50TGlzdCcsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRMaXN0KSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RzJywgSlNPTi5zdHJpbmdpZnkobGlzdHMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmV4dExpc3RJZCcsIEpTT04uc3RyaW5naWZ5KG5leHRMaXN0SWQpKTtcbn0pXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZihPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZXMgc3R1ZmYgaW4gbG9jYWwgc3RvcmFnZScpO1xuICAgICAgICAgICAgbG9naWMud3JpdGVPdmVyQ3VycmVudExpc3QoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudExpc3QnKSkpO1xuICAgICAgICAgICAgbGlzdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaXN0cycpKTtcbiAgICAgICAgICAgIG5leHRMaXN0SWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduZXh0TGlzdElkJykpO1xuICAgICAgICAgICAgZG9tQ29udHJvbGxlci5yZW5kZXJMaXN0cygpO1xuICAgICAgICAgICAgZG9tQ29udHJvbGxlci5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgZG9tQ29udHJvbGxlci51cGRhdGVDb2x1bW5OYW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vdGhpbmcgaW4gbG9jYWwgc3RvcmFnZScpO1xuICAgICAgICBsb2dpYy5zZXREZWZhdWx0TGlzdCgpO1xuICAgIH1cbn0pXG5cblxuZXhwb3J0IHtjdXJyZW50TGlzdCwgbGlzdHMsIGxvZ2ljLCBuZXh0TGlzdElkfTtcbiIsImNsYXNzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9IFwiXCIsIHRhc2tJZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgICAgICB0aGlzLnRhc2tJZCA9IHRhc2tJZDtcbiAgICB9XG5cblxuXG59XG5cbmV4cG9ydCB7IFRhc2sgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7ZG9tQ29udHJvbGxlcn0gZnJvbSAnLi9tb2R1bGVzL0RvbUNvbnRyb2xsZXInO1xuXG5cblxuXG5cblxuZG9tQ29udHJvbGxlci5pbml0aWFsaXplQ2xpY2tFdmVudExpc3RlbmVycygpO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
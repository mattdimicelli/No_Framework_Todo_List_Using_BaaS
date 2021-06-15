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

 

    deleteListHandler() {
        const reallyDelete = confirm(`Are you sure that you want to delete the ${oldName} list and all associated tasks?`);
        if(reallyDelete) {
            if(Object.keys(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).length > 1) {
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.deleteList(oldName);
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setCurrentListToARemainingList();
                this.renderLists();
                this.renderTasks();
                const columnName = document.querySelector('.list-column-name');
                columnName.textContent = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.name;
            } else {
                alert('Unable to delete your only list!');
                this.renderLists();
            }
        } else {
            this.renderLists();
        }
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
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.addTaskToCurrentList(task);
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
        for (const task of Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks)) {
            const html = this.createTaskHTML(task.id, task.name, task.dueDate);
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
/* harmony import */ var _modules_Logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Logic */ "./src/modules/Logic.js");





document.addEventListener('DOMContentLoaded', function() {
    console.log('fire1');
    if(Object.keys(localStorage).length > 0) {
        console.log('fire2');
        _modules_Logic__WEBPACK_IMPORTED_MODULE_1__.logic.writeOverCurrentList(JSON.parse(localStorage.getItem('currentList')));
        _modules_Logic__WEBPACK_IMPORTED_MODULE_1__.lists = JSON.parse(localStorage.getItem('lists'));
        _modules_Logic__WEBPACK_IMPORTED_MODULE_1__.nextListId = JSON.parse(localStorage.getItem('nextListId'));
    }
});

_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.logic.setDefaultList();
_modules_DomController__WEBPACK_IMPORTED_MODULE_0__.domController.initializeClickEventListeners();

document.addEventListener('beforeunload', function() {
    localStorage.setItem('currentList', JSON.stringify(_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.currentList));
    localStorage.setItem('lists', JSON.stringify(_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.lists));
    localStorage.setItem('nextListId', JSON.stringify(_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.nextListId));
})

const copy = document.querySelector('.copyright');
copy.addEventListener('click', function() {
    console.log('fire');
    localStorage.setItem('currentList', JSON.stringify(_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.currentList));
    localStorage.setItem('lists', JSON.stringify(_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.lists));
    localStorage.setItem('nextListId', JSON.stringify(_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.nextListId));
}) 









})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQW9EOztBQUVwRDs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsdUNBQUk7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsK0JBQStCLHVDQUFJO0FBQ25DO0FBQ0E7QUFDQSxTO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7Ozs7Ozs7VUNYQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOc0Q7QUFDZ0I7Ozs7QUFJdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNFQUEwQjtBQUNsQyxRQUFRLGlEQUFLO0FBQ2IsUUFBUSxzREFBVTtBQUNsQjtBQUNBLENBQUM7O0FBRUQsZ0VBQW9CO0FBQ3BCLCtGQUEyQzs7QUFFM0M7QUFDQSx1REFBdUQsdURBQVc7QUFDbEUsaURBQWlELGlEQUFLO0FBQ3RELHNEQUFzRCxzREFBVTtBQUNoRSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCx1REFBVztBQUNsRSxpREFBaUQsaURBQUs7QUFDdEQsc0RBQXNELHNEQUFVO0FBQ2hFLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvZ2ljLCBjdXJyZW50TGlzdCwgbGlzdHMgfSBmcm9tICcuL0xvZ2ljJztcblxubGV0IG9sZE5hbWU7XG5cblxuY2xhc3MgRG9tQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpICB7fVxuXG4gICAgaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICBsZXQgdGFyZ2V0O1xuXG4gICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJ2knKSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnaScpO1xuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWxpc3QtY2FuY2VsLWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWxpc3Qtc3VibWl0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RUZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1saXN0LWljb24nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RJY29uSGFuZGxlcihsaXN0TmFtZSwgbGlzdEl0ZW0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1zdWJtaXQtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dElucHV0ID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYobmV3TmFtZSA9PT0gb2xkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyKG5ld05hbWUsIHRleHRJbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWxpc3QtY2FuY2VsLWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdmYXIgZmEtdHJhc2gtYWx0IGxpc3QnKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlTGlzdEhhbmRsZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbiwgbGknKTtcblxuICAgICAgICBpZih0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdtZW51LWJ0bicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVCdG5IYW5kbGVyKG1lbnUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0VkaXRvciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tFZGl0b3JIYW5kbGVyKHRhc2tFZGl0b3IsIHRhc2tJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnZWRpdC10YXNrLXN1Ym1pdC1idG4nKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdFRhc2tTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFZGl0b3IgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3Rhc2stZGVsZXRlLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrRGVsZXRlQnRuSGFuZGxlcih0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NhbmNlbC1uZXctdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxOZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1saXN0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTGlzdEJ0bkhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbGlzdCBtZW51LWJ0bicgJiYgIXRhcmdldC5jaGlsZHJlblsxXS5tYXRjaGVzKCdpbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUxpc3RIYW5kbGVyKGxpc3ROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdtZW51LWJ0biBhbGwnKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdtZW51LWJ0biB0b2RheScpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3T25seVRvZGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4gd2VlaycpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3T25seVdlZWsoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZpZXdPbmx5V2VlaygpIHtcbiAgICAgICAgY29uc3QgdWxGb3JUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGUtdGFzay1pdGVtcycpO1xuICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZU9iaiA9IG5ldyBEYXRlKHRhc2suZHVlRGF0ZSk7XG5cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhEYXRlLm5vdygpIC0gZHVlRGF0ZU9iaikgPD0gNi4wNDhlOCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLmNyZWF0ZVRhc2tIVE1MKHRhc2sudGFza0lkLCB0YXNrLm5hbWUsIHRhc2suZHVlRGF0ZSk7XG4gICAgICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCArPSBodG1sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlVGFza0hUTUwodGFza0lkLCBuYW1lLCBkdWVEYXRlKSB7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBgPGxpIGNsYXNzPVwidG9kby1pdGVtXCIgZGF0YS1pZD1cIiR7dGFza0lkfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1kYXRlLWJ0bnNcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFza1wiPiR7bmFtZX08L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1hbmQtYnRuc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZHVlLWRhdGVcIj4ke3RoaXMuY3JlYXRlUmVhZGFibGVEYXRlKGR1ZURhdGUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC10YXNrLWJ0blwiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXRcIj48L2k+PC9idXR0b24+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidGFzay1lZGl0b3IgaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIGFjdGlvbj1cIlwiIG1ldGhvZD1cImdldFwiIGNsYXNzPVwidGFzay1lZGl0b3ItZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidGFzay1maWVsZFwiIG5hbWU9XCJ0YXNrXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlRhc2tcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZGVzY3JpcHRpb24tZmllbGRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBwbGFjZWhvbGRlcj1cIkRldGFpbHNcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItYWRkYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZGF0ZS1waWNrZXJcIiBuYW1lPVwiZHVlLWRhdGVcIiB0eXBlPVwiZGF0ZVwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRhc2stZGVsZXRlLWJ0blwiPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC10YXNrLXN1Ym1pdC1idG5cIj48aSBjbGFzcz1cImZhciBmYS1jaGVjay1jaXJjbGVcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5gO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG5cbiAgICB2aWV3T25seVRvZGF5KCkge1xuICAgICAgICBjb25zdCB1bEZvclRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZS10YXNrLWl0ZW1zJyk7XG4gICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKS5maWx0ZXIodGFzayA9PiB7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlT2JqID0gbmV3IERhdGUodGFzay5kdWVEYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVEYXkgPSBkdWVEYXRlT2JqLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVNb250aCA9IGR1ZURhdGVPYmouZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVZZWFyID0gZHVlRGF0ZU9iai5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERheSA9IG5ldyBEYXRlKCkuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudE1vbnRoID0gbmV3IERhdGUoKS5nZXRVVENNb250aCgpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFllYXIgPSBuZXcgRGF0ZSgpLmdldFVUQ0Z1bGxZZWFyKCk7XG5cbiAgICAgICAgICAgIGlmIChkdWVEYXRlRGF5ID09PSBjdXJyZW50RGF5ICYmIGR1ZURhdGVNb250aCA9PT0gY3VycmVudE1vbnRoICYmIGR1ZURhdGVZZWFyID09PSBjdXJyZW50WWVhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLmNyZWF0ZVRhc2tIVE1MKHRhc2sudGFza0lkLCB0YXNrLm5hbWUsIHRhc2suZHVlRGF0ZSk7XG4gICAgICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCArPSBodG1sO1xuICAgICAgICB9XG4gICAgfVxuXG4gXG5cbiAgICBkZWxldGVMaXN0SGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgcmVhbGx5RGVsZXRlID0gY29uZmlybShgQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSAke29sZE5hbWV9IGxpc3QgYW5kIGFsbCBhc3NvY2lhdGVkIHRhc2tzP2ApO1xuICAgICAgICBpZihyZWFsbHlEZWxldGUpIHtcbiAgICAgICAgICAgIGlmKE9iamVjdC5rZXlzKGxpc3RzKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbG9naWMuZGVsZXRlTGlzdChvbGROYW1lKTtcbiAgICAgICAgICAgICAgICBsb2dpYy5zZXRDdXJyZW50TGlzdFRvQVJlbWFpbmluZ0xpc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1jb2x1bW4tbmFtZScpO1xuICAgICAgICAgICAgICAgIGNvbHVtbk5hbWUudGV4dENvbnRlbnQgPSBjdXJyZW50TGlzdC5uYW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGRlbGV0ZSB5b3VyIG9ubHkgbGlzdCEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGl0TGlzdFN1Ym1pdEJ0bkhhbmRsZXIobmV3TmFtZSwgdGV4dElucHV0KSB7XG4gICAgICAgIGlmKG5ld05hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0ZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2dpYy5tb2RpZnlMaXN0TmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICB0aGlzLmNoYW5nZUxpc3RIYW5kbGVyKG5ld05hbWUpO1xuICAgIH1cblxuICAgIGVkaXRMaXN0SWNvbkhhbmRsZXIobGlzdE5hbWUsIGxpc3RJdGVtKSB7XG4gICAgICAgIG9sZE5hbWUgPSBsaXN0TmFtZTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGA8aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdFwiPjwvaT48aW5wdXQgY2xhc3M9XCJuZXctbGlzdC10ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7bGlzdE5hbWV9XCIgLz48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgbGlzdFwiPjwvaT48aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgZWRpdC1saXN0LWNhbmNlbC1idG5cIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlIGVkaXQtbGlzdC1zdWJtaXQtYnRuXCI+PC9pPmA7XG4gICAgICAgIGxpc3RJdGVtLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuICAgIGNoYW5nZUxpc3RIYW5kbGVyKGxpc3ROYW1lKSB7XG4gICAgICAgIGxvZ2ljLm1ha2VDdXJyZW50TGlzdChsaXN0TmFtZSk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgY29uc3QgY29sdW1uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWNvbHVtbi1uYW1lJyk7XG4gICAgICAgIGNvbHVtbk5hbWUudGV4dENvbnRlbnQgPSBsaXN0TmFtZTtcbiAgICB9XG5cblxuICAgIG5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpIHtcbiAgICAgICAgaWYobGlzdE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICBsaXN0VGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbG9naWMuY3JlYXRlTmV3TGlzdChsaXN0TmFtZSk7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdEhhbmRsZXIobGlzdE5hbWUpO1xuICAgIH1cblxuICAgIHJlbmRlckxpc3RzKCkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bC1saXN0LW9mLWxpc3RzJyk7XG4gICAgICAgIGxldCBodG1sID0gJyc7XG4gICAgICAgIGNvbnN0IHNvcnRlZExpc3RzID0gT2JqZWN0LnZhbHVlcyhsaXN0cykuc29ydCgobGlzdDEsIGxpc3QyKSA9PiB7XG4gICAgICAgICAgICBpZihsaXN0MS5pZCA+IGxpc3QyLmlkKSByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmIChsaXN0MS5pZCA9PT0gbGlzdDIuaWQpIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKGxpc3QxLmlkIDwgbGlzdDIuaWQpIHJldHVybiAtMTtcbiAgICAgICAgfSk7IFxuICAgICAgICBmb3IgKGNvbnN0IGxpc3Qgb2Ygc29ydGVkTGlzdHMpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gYDxsaSBjbGFzcz1cImxpc3QgbWVudS1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdCBlZGl0LWxpc3QtaWNvblwiPjwvaT4ke2xpc3QubmFtZX08c3BhbiBjbGFzcz1cImVkaXQtbGlzdC1pY29uXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdCBlZGl0LWxpc3QtaWNvblwiPjwvaT48L3NwYW4+PC9saT5gO1xuICAgICAgICB9XG4gICAgICAgIHVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuXG4gICAgbWVudUJ0bkhhbmRsZXIobWVudSkge1xuICAgICAgICBjb25zdCBkaXNwbGF5ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobWVudSkuZGlzcGxheTtcbiAgICAgICAgaWYoZGlzcGxheSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBtZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgYWRkTGlzdEJ0bkhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVsLWxpc3Qtb2YtbGlzdHMnKTtcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdsaXN0JywgJ21lbnUtYnRuJyk7XG4gICAgICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLWxpc3QtYWx0Jyk7XG4gICAgICAgIGxpLmFwcGVuZChpKTtcbiAgICAgICAgY29uc3QgdGV4dElucHV0ID0gYDxpbnB1dCBjbGFzcz1cIm5ldy1saXN0LXRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+PGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIG5ldy1saXN0LWNhbmNlbC1idG5cIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlIG5ldy1saXN0LXN1Ym1pdC1idG5cIj48L2k+YDtcbiAgICAgICAgbGkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZXh0SW5wdXQpO1xuICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgIH1cblxuICAgIHRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xuICAgICAgICBsb2dpYy5kZWxldGVUYXNrKHRhc2tJZCk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICB0YXNrRWRpdG9ySGFuZGxlcih0YXNrRWRpdG9yLCB0YXNrSWQpIHtcbiAgICAgICAgdGFza0VkaXRvci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgY29uc3QgdGFza1RleHRJbnB1dCA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGNvbnN0IGRldGFpbHNUZXh0YXJlYSA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb25zdCBkYXRlcGlja2VyID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgICAgIHRhc2tUZXh0SW5wdXQudmFsdWUgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLm5hbWU7XG4gICAgICAgIGRldGFpbHNUZXh0YXJlYS52YWx1ZSA9IGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tJZF0uZGV0YWlscztcbiAgICAgICAgZGF0ZXBpY2tlci52YWx1ZUFzTnVtYmVyID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5kdWVEYXRlO1xuICAgIH1cblxuICAgIGVkaXRUYXNrU3VibWl0QnRuSGFuZGxlcih0YXJnZXQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblswXS52YWx1ZTtcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMV0udmFsdWU7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzJdLmZpcnN0RWxlbWVudENoaWxkLnZhbHVlQXNEYXRlO1xuXG4gICAgICAgIGlmKCF0aGlzLmR1ZURhdGVJc1ZhbGlkKGR1ZURhdGUpKXtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0YXNrTmFtZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGFza05hbWUgJiYgdGhpcy5kdWVEYXRlSXNWYWxpZChkdWVEYXRlKSkge1xuICAgICAgICAgICAgY29uc3QgdGFza0lzTmV3ID0gKHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc05hbWUgPT09ICduZXctdGFzay1lZGl0b3InKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTsgLy93aWxsIHVzZSBjdXJyZW50VGltZSBhcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGZvciBlYWNoIHRhc2tcblxuICAgICAgICAgICAgaWYodGFza0lzTmV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IGxvZ2ljLmNyZWF0ZU5ld1Rhc2sodGFza05hbWUsIGR1ZURhdGUsIGRldGFpbHMsIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgICAgICBsb2dpYy5hZGRUYXNrVG9DdXJyZW50TGlzdCh0YXNrKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighdGFza0lzTmV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0lkID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDtcbiAgICAgICAgICAgICAgICBsb2dpYy5tb2RpZnlUYXNrKHRhc2tOYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCB0YXNrSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBpZih0YXNrRWRpdG9yLmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWVkaXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkcmVuWzFdLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZVZhbHVlQXNOdW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4oZHVlRGF0ZVZhbHVlQXNOdW1iZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpIHtcbiAgICAgICAgbmV3VGFza0VkaXRvci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBuZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKSB7XG4gICAgICAgIG5ld1Rhc2tFZGl0b3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyVGFza3MoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLmlkLCB0YXNrLm5hbWUsIHRhc2suZHVlRGF0ZSk7XG4gICAgICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCArPSBodG1sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUmVhZGFibGVEYXRlKGRhdGVWYWx1ZUFzTnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlVmFsdWVBc051bWJlcik7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpICsgMTtcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAgIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRvbUNvbnRyb2xsZXIgPSBuZXcgRG9tQ29udHJvbGxlcigpO1xuXG5cblxuLy9pc3N1ZXMuICBjYW4ndCBnZXQgdGFzayBuYW1lIHRvIHdyYXAgYXQgNTAlOyIsImNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSB7fTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgTGlzdCB9OyIsImltcG9ydCB7VGFza30gZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7TGlzdH0gZnJvbSAnLi9MaXN0JztcblxubGV0IGN1cnJlbnRMaXN0O1xubGV0IG5leHRMaXN0SWQgPSAwO1xuXG5sZXQgbGlzdHMgPSB7fTtcblxuY2xhc3MgTG9naWMge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGNyZWF0ZU5ld1Rhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9IFwiXCIsIHRhc2tJZCkge1xuICAgICAgICByZXR1cm4gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgdGFza0lkKTtcbiAgICB9XG5cbiAgICBhZGRUYXNrVG9DdXJyZW50TGlzdCh0YXNrKSB7XG4gICAgICAgIGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2sudGFza0lkXSA9IHRhc2s7XG4gICAgfVxuXG4gICAgbW9kaWZ5VGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gJycsIHRhc2tJZCkge1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykpIHtcbiAgICAgICAgICAgIGlmKHRhc2sudGFza0lkID09IHRhc2tJZCkge1xuICAgICAgICAgICAgICAgIHRhc2submFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgdGFzay5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICB0YXNrLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVsZXRlVGFzayh0YXNrKSB7XG4gICAgICAgIGRlbGV0ZSBjdXJyZW50TGlzdC50YXNrc1t0YXNrXTtcbiAgICB9XG5cbiAgICBjcmVhdGVOZXdMaXN0KG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV3TGlzdCA9IG5ldyBMaXN0KG5hbWUsIG5leHRMaXN0SWQrKyk7XG4gICAgICAgIGxpc3RzW25hbWVdID0gbmV3TGlzdDtcbiAgICB9XG5cbiAgICBtb2RpZnlMaXN0TmFtZShvbGROYW1lLCBuZXdOYW1lKSB7XG4gICAgICAgIGxpc3RzW25ld05hbWVdID0gbGlzdHNbb2xkTmFtZV07XG4gICAgICAgIGRlbGV0ZSBsaXN0c1tvbGROYW1lXTtcbiAgICAgICAgbGlzdHNbbmV3TmFtZV0ubmFtZSA9IG5ld05hbWU7XG4gICAgfVxuXG4gICAgXG4gICAgc2V0RGVmYXVsdExpc3QoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhsaXN0cykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBjaG9yZXMgPSBuZXcgTGlzdCgnQ2hvcmVzJywgbmV4dExpc3RJZCsrKTtcbiAgICAgICAgICAgIGxpc3RzLkNob3JlcyA9IGNob3JlcztcbiAgICAgICAgICAgIHRoaXMubWFrZUN1cnJlbnRMaXN0KCdDaG9yZXMnKTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBtYWtlQ3VycmVudExpc3QobGlzdE5hbWUpIHtcbiAgICAgICAgY3VycmVudExpc3QgPSBsaXN0c1tsaXN0TmFtZV07XG4gICAgfVxuXG4gICAgd3JpdGVPdmVyQ3VycmVudExpc3QoZGF0YUZyb21TdG9yYWdlKSB7XG4gICAgICAgIGN1cnJlbnRMaXN0ID0gZGF0YUZyb21TdG9yYWdlO1xuICAgIH1cblxuICAgIHNldEN1cnJlbnRMaXN0VG9BUmVtYWluaW5nTGlzdCgpIHtcbiAgICAgICAgY29uc3QgZmlyc3RMaXN0ID0gT2JqZWN0LmtleXMobGlzdHMpWzBdO1xuICAgICAgICB0aGlzLm1ha2VDdXJyZW50TGlzdChmaXJzdExpc3QpO1xuICAgIH1cblxuICAgIGRlbGV0ZUxpc3QobGlzdE5hbWUpIHtcbiAgICAgICAgZGVsZXRlIGxpc3RzW2xpc3ROYW1lXTtcbiAgICB9XG5cblxuICAgXG59XG5cbmNvbnN0IGxvZ2ljID0gbmV3IExvZ2ljKCk7XG5cbmV4cG9ydCB7Y3VycmVudExpc3QsIGxpc3RzLCBsb2dpYywgbmV4dExpc3RJZH07IiwiY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gXCJcIiwgdGFza0lkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgICAgIHRoaXMudGFza0lkID0gdGFza0lkO1xuICAgIH1cblxuXG5cbn1cblxuZXhwb3J0IHsgVGFzayB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtkb21Db250cm9sbGVyfSBmcm9tICcuL21vZHVsZXMvRG9tQ29udHJvbGxlcic7XG5pbXBvcnQge2N1cnJlbnRMaXN0LCBsaXN0cywgbG9naWMsIG5leHRMaXN0SWR9IGZyb20gJy4vbW9kdWxlcy9Mb2dpYyc7XG5cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ2ZpcmUxJyk7XG4gICAgaWYoT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmaXJlMicpO1xuICAgICAgICBsb2dpYy53cml0ZU92ZXJDdXJyZW50TGlzdChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50TGlzdCcpKSk7XG4gICAgICAgIGxpc3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdHMnKSk7XG4gICAgICAgIG5leHRMaXN0SWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduZXh0TGlzdElkJykpO1xuICAgIH1cbn0pO1xuXG5sb2dpYy5zZXREZWZhdWx0TGlzdCgpO1xuZG9tQ29udHJvbGxlci5pbml0aWFsaXplQ2xpY2tFdmVudExpc3RlbmVycygpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudExpc3QnLCBKU09OLnN0cmluZ2lmeShjdXJyZW50TGlzdCkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0cycsIEpTT04uc3RyaW5naWZ5KGxpc3RzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25leHRMaXN0SWQnLCBKU09OLnN0cmluZ2lmeShuZXh0TGlzdElkKSk7XG59KVxuXG5jb25zdCBjb3B5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvcHlyaWdodCcpO1xuY29weS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdmaXJlJyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRMaXN0JywgSlNPTi5zdHJpbmdpZnkoY3VycmVudExpc3QpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdHMnLCBKU09OLnN0cmluZ2lmeShsaXN0cykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduZXh0TGlzdElkJywgSlNPTi5zdHJpbmdpZnkobmV4dExpc3RJZCkpO1xufSkgXG5cblxuXG5cblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
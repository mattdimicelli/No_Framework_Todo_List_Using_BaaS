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
                const newName = target.previousElementSibling.previousElementSibling.previousElementSibling.value;
                this.editListSubmitBtnHandler(newName);
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
            if(target.className === 'list menu-btn' && !target.children[1]) {
                const listName = target.childNodes[1].textContent;
                this.changeListHandler(listName);
            }
        }
    }

    editListSubmitBtnHandler(newName) {
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyListName(oldName, newName);
        this.renderLists();
    }

    editListIconHandler(listName, listItem) {
        oldName = listName;
        const html = `<i class="fas fa-list-alt"></i><input class="new-list-text-input" type="text" value="${listName}" /><i class="far fa-trash-alt"></i><i class="far fa-times-circle new-list-cancel-btn"></i><i class="far fa-check-circle edit-list-submit-btn"></i>`;
        listItem.innerHTML = html;
    }
    changeListHandler(listName) {
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setCurrentList(listName);
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
    }

    renderLists() {
        const ul = document.querySelector('.ul-list-of-lists');
        let html = '';
        for (const key in _Logic__WEBPACK_IMPORTED_MODULE_0__.lists) {
            html += `<li class="list menu-btn"><i class="fas fa-list-alt edit-list-icon"></i>${key}<span class="edit-list-icon"><i class="fas fa-edit edit-list-icon"></i></span></li>`;
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
        const dueDate = target.parentElement.parentElement.children[2].firstElementChild.valueAsNumber;

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
            const html = `<li class="todo-item" data-id="${task.taskId}">
            <div class="task-date-btns">
                <span class="task">${task.name}</span>
                <div class="date-and-btns">
                    <span class="due-date">${this.createReadableDate(task.dueDate)}</span>
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
    constructor(name) {
        this.name = name;
        this.tasks = {};
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
/* harmony export */   "logic": () => (/* binding */ logic)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List */ "./src/modules/List.js");



let currentList;

const lists = {};

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

     // getCurrentTask() {
    //     return currentTask;
    // }

    createNewList(name) {
        const newList = new _List__WEBPACK_IMPORTED_MODULE_1__.List(name);
        lists[name] = newList;
    }

    modifyListName(oldName, newName) {
        lists[newName] = lists[oldName];
        delete lists[oldName];
    }

    
    setDefaultList() {
        if (Object.keys(lists).length === 0) {
            const chores = new _List__WEBPACK_IMPORTED_MODULE_1__.List('Chores');
            lists.Chores = chores;
            this.setCurrentList('Chores');
        } 
    }

    setCurrentList(listName) {
        currentList = lists[listName];
    }

    // getCurrentList() {
    //     return currentList;
    // }

   
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
/* harmony import */ var _modules_List__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/List */ "./src/modules/List.js");






_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.logic.setDefaultList();
_modules_DomController__WEBPACK_IMPORTED_MODULE_0__.domController.initializeClickEventListeners();






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQW9EOztBQUVwRDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsd0RB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IHsgbG9naWMsIGN1cnJlbnRMaXN0LCBsaXN0cyB9IGZyb20gJy4vTG9naWMnO1xuXG5sZXQgb2xkTmFtZTtcblxuY2xhc3MgRG9tQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpICB7fVxuXG4gICAgaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICBsZXQgdGFyZ2V0O1xuXG4gICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJ2knKSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnaScpO1xuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWxpc3QtY2FuY2VsLWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWxpc3Qtc3VibWl0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RUZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1saXN0LWljb24nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RJY29uSGFuZGxlcihsaXN0TmFtZSwgbGlzdEl0ZW0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1zdWJtaXQtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRMaXN0U3VibWl0QnRuSGFuZGxlcihuZXdOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbiwgbGknKTtcblxuICAgICAgICBpZih0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdtZW51LWJ0bicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVCdG5IYW5kbGVyKG1lbnUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0VkaXRvciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tFZGl0b3JIYW5kbGVyKHRhc2tFZGl0b3IsIHRhc2tJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnZWRpdC10YXNrLXN1Ym1pdC1idG4nKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdFRhc2tTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFZGl0b3IgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3Rhc2stZGVsZXRlLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrRGVsZXRlQnRuSGFuZGxlcih0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NhbmNlbC1uZXctdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxOZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1saXN0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTGlzdEJ0bkhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbGlzdCBtZW51LWJ0bicgJiYgIXRhcmdldC5jaGlsZHJlblsxXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VMaXN0SGFuZGxlcihsaXN0TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGl0TGlzdFN1Ym1pdEJ0bkhhbmRsZXIobmV3TmFtZSkge1xuICAgICAgICBsb2dpYy5tb2RpZnlMaXN0TmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgIH1cblxuICAgIGVkaXRMaXN0SWNvbkhhbmRsZXIobGlzdE5hbWUsIGxpc3RJdGVtKSB7XG4gICAgICAgIG9sZE5hbWUgPSBsaXN0TmFtZTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGA8aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdFwiPjwvaT48aW5wdXQgY2xhc3M9XCJuZXctbGlzdC10ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7bGlzdE5hbWV9XCIgLz48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHRcIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIG5ldy1saXN0LWNhbmNlbC1idG5cIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlIGVkaXQtbGlzdC1zdWJtaXQtYnRuXCI+PC9pPmA7XG4gICAgICAgIGxpc3RJdGVtLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuICAgIGNoYW5nZUxpc3RIYW5kbGVyKGxpc3ROYW1lKSB7XG4gICAgICAgIGxvZ2ljLnNldEN1cnJlbnRMaXN0KGxpc3ROYW1lKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICBjb25zdCBjb2x1bW5OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtY29sdW1uLW5hbWUnKTtcbiAgICAgICAgY29sdW1uTmFtZS50ZXh0Q29udGVudCA9IGxpc3ROYW1lO1xuICAgIH1cblxuXG4gICAgbmV3TGlzdFN1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0LCBsaXN0TmFtZSwgbGlzdFRleHRJbnB1dCkge1xuICAgICAgICBpZihsaXN0TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGxpc3RUZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2dpYy5jcmVhdGVOZXdMaXN0KGxpc3ROYW1lKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICB9XG5cbiAgICByZW5kZXJMaXN0cygpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWwtbGlzdC1vZi1saXN0cycpO1xuICAgICAgICBsZXQgaHRtbCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBsaXN0cykge1xuICAgICAgICAgICAgaHRtbCArPSBgPGxpIGNsYXNzPVwibGlzdCBtZW51LWJ0blwiPjxpIGNsYXNzPVwiZmFzIGZhLWxpc3QtYWx0IGVkaXQtbGlzdC1pY29uXCI+PC9pPiR7a2V5fTxzcGFuIGNsYXNzPVwiZWRpdC1saXN0LWljb25cIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0IGVkaXQtbGlzdC1pY29uXCI+PC9pPjwvc3Bhbj48L2xpPmA7XG4gICAgICAgIH1cbiAgICAgICAgdWwuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9XG5cbiAgICBtZW51QnRuSGFuZGxlcihtZW51KSB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtZW51KS5kaXNwbGF5O1xuICAgICAgICBpZihkaXNwbGF5ID09PSAnbm9uZScpe1xuICAgICAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBhZGRMaXN0QnRuSGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWwtbGlzdC1vZi1saXN0cycpO1xuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2xpc3QnLCAnbWVudS1idG4nKTtcbiAgICAgICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgaS5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtbGlzdC1hbHQnKTtcbiAgICAgICAgbGkuYXBwZW5kKGkpO1xuICAgICAgICBjb25zdCB0ZXh0SW5wdXQgPSBgPGlucHV0IGNsYXNzPVwibmV3LWxpc3QtdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgLz48aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgbmV3LWxpc3QtY2FuY2VsLWJ0blwiPjwvaT48aSBjbGFzcz1cImZhciBmYS1jaGVjay1jaXJjbGUgbmV3LWxpc3Qtc3VibWl0LWJ0blwiPjwvaT5gO1xuICAgICAgICBsaS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRleHRJbnB1dCk7XG4gICAgICAgIHVsLmFwcGVuZChsaSk7XG4gICAgfVxuXG4gICAgdGFza0RlbGV0ZUJ0bkhhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7XG4gICAgICAgIGxvZ2ljLmRlbGV0ZVRhc2sodGFza0lkKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgIH1cblxuICAgIHRhc2tFZGl0b3JIYW5kbGVyKHRhc2tFZGl0b3IsIHRhc2tJZCkge1xuICAgICAgICB0YXNrRWRpdG9yLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBjb25zdCB0YXNrVGV4dElucHV0ID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgY29uc3QgZGV0YWlsc1RleHRhcmVhID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICAgICAgdGFza1RleHRJbnB1dC52YWx1ZSA9IGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tJZF0ubmFtZTtcbiAgICAgICAgZGV0YWlsc1RleHRhcmVhLnZhbHVlID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5kZXRhaWxzO1xuICAgICAgICBkYXRlcGlja2VyLnZhbHVlQXNOdW1iZXIgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLmR1ZURhdGU7XG4gICAgfVxuXG4gICAgZWRpdFRhc2tTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGFza05hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLnZhbHVlO1xuICAgICAgICBjb25zdCBkZXRhaWxzID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsxXS52YWx1ZTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQudmFsdWVBc051bWJlcjtcblxuICAgICAgICBpZighdGhpcy5kdWVEYXRlSXNWYWxpZChkdWVEYXRlKSl7XG4gICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzJdLmZpcnN0RWxlbWVudENoaWxkLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGFza05hbWUpIHtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRhc2tOYW1lICYmIHRoaXMuZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJc05ldyA9ICh0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stZWRpdG9yJykgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7IC8vd2lsbCB1c2UgY3VycmVudFRpbWUgYXMgYSB1bmlxdWUgaWRlbnRpZmllciBmb3IgZWFjaCB0YXNrXG5cbiAgICAgICAgICAgIGlmKHRhc2tJc05ldykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBsb2dpYy5jcmVhdGVOZXdUYXNrKHRhc2tOYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCBjdXJyZW50VGltZSk7XG4gICAgICAgICAgICAgICAgbG9naWMuYWRkVGFza1RvQ3VycmVudExpc3QodGFzayk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXRhc2tJc05ldykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7XG4gICAgICAgICAgICAgICAgbG9naWMubW9kaWZ5VGFzayh0YXNrTmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgdGFza0lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0YXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgaWYodGFza0VkaXRvci5jbGFzc05hbWUgPT09ICduZXctdGFzay1lZGl0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlblsxXS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkcmVuWzJdLmZpcnN0RWxlbWVudENoaWxkLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGFza0VkaXRvci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGR1ZURhdGVJc1ZhbGlkKGR1ZURhdGVWYWx1ZUFzTnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKGR1ZURhdGVWYWx1ZUFzTnVtYmVyKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjYW5jZWxOZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKSB7XG4gICAgICAgIG5ld1Rhc2tFZGl0b3IuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgbmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcikge1xuICAgICAgICBuZXdUYXNrRWRpdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIHJlbmRlclRhc2tzKCkge1xuICAgICAgICBjb25zdCB1bEZvclRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZS10YXNrLWl0ZW1zJyk7XG4gICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKSkge1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IGA8bGkgY2xhc3M9XCJ0b2RvLWl0ZW1cIiBkYXRhLWlkPVwiJHt0YXNrLnRhc2tJZH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWRhdGUtYnRuc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFza1wiPiR7dGFzay5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1hbmQtYnRuc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImR1ZS1kYXRlXCI+JHt0aGlzLmNyZWF0ZVJlYWRhYmxlRGF0ZSh0YXNrLmR1ZURhdGUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPjwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZWRpdG9yIGhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gYWN0aW9uPVwiXCIgbWV0aG9kPVwiZ2V0XCIgY2xhc3M9XCJ0YXNrLWVkaXRvci1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidGFzay1maWVsZFwiIG5hbWU9XCJ0YXNrXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlRhc2tcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImRlc2NyaXB0aW9uLWZpZWxkXCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXRhaWxzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1hZGRidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZGF0ZS1waWNrZXJcIiBuYW1lPVwiZHVlLWRhdGVcIiB0eXBlPVwiZGF0ZVwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrLWRlbGV0ZS1idG5cIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LXRhc2stc3VibWl0LWJ0blwiPjxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLWNpcmNsZVwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9saT5gO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVJlYWRhYmxlRGF0ZShkYXRlVmFsdWVBc051bWJlcikge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVZhbHVlQXNOdW1iZXIpO1xuICAgICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0VVRDTW9udGgoKSArIDE7XG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkb21Db250cm9sbGVyID0gbmV3IERvbUNvbnRyb2xsZXIoKTtcblxuXG5cbi8vaXNzdWVzLiAgY2FuJ3QgZ2V0IHRhc2sgbmFtZSB0byB3cmFwIGF0IDUwJTsiLCJjbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSB7fTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IExpc3QgfTsiLCJpbXBvcnQge1Rhc2t9IGZyb20gJy4vVGFzayc7XG5pbXBvcnQge0xpc3R9IGZyb20gJy4vTGlzdCc7XG5cbmxldCBjdXJyZW50TGlzdDtcblxuY29uc3QgbGlzdHMgPSB7fTtcblxuY2xhc3MgTG9naWMge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGNyZWF0ZU5ld1Rhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9IFwiXCIsIHRhc2tJZCkge1xuICAgICAgICByZXR1cm4gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgdGFza0lkKTtcbiAgICB9XG5cbiAgICBhZGRUYXNrVG9DdXJyZW50TGlzdCh0YXNrKSB7XG4gICAgICAgIGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2sudGFza0lkXSA9IHRhc2s7XG4gICAgfVxuXG4gICAgbW9kaWZ5VGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gJycsIHRhc2tJZCkge1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykpIHtcbiAgICAgICAgICAgIGlmKHRhc2sudGFza0lkID09IHRhc2tJZCkge1xuICAgICAgICAgICAgICAgIHRhc2submFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgdGFzay5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICB0YXNrLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVsZXRlVGFzayh0YXNrKSB7XG4gICAgICAgIGRlbGV0ZSBjdXJyZW50TGlzdC50YXNrc1t0YXNrXTtcbiAgICB9XG5cbiAgICAgLy8gZ2V0Q3VycmVudFRhc2soKSB7XG4gICAgLy8gICAgIHJldHVybiBjdXJyZW50VGFzaztcbiAgICAvLyB9XG5cbiAgICBjcmVhdGVOZXdMaXN0KG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV3TGlzdCA9IG5ldyBMaXN0KG5hbWUpO1xuICAgICAgICBsaXN0c1tuYW1lXSA9IG5ld0xpc3Q7XG4gICAgfVxuXG4gICAgbW9kaWZ5TGlzdE5hbWUob2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgICBsaXN0c1tuZXdOYW1lXSA9IGxpc3RzW29sZE5hbWVdO1xuICAgICAgICBkZWxldGUgbGlzdHNbb2xkTmFtZV07XG4gICAgfVxuXG4gICAgXG4gICAgc2V0RGVmYXVsdExpc3QoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhsaXN0cykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBjaG9yZXMgPSBuZXcgTGlzdCgnQ2hvcmVzJyk7XG4gICAgICAgICAgICBsaXN0cy5DaG9yZXMgPSBjaG9yZXM7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRMaXN0KCdDaG9yZXMnKTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TGlzdChsaXN0TmFtZSkge1xuICAgICAgICBjdXJyZW50TGlzdCA9IGxpc3RzW2xpc3ROYW1lXTtcbiAgICB9XG5cbiAgICAvLyBnZXRDdXJyZW50TGlzdCgpIHtcbiAgICAvLyAgICAgcmV0dXJuIGN1cnJlbnRMaXN0O1xuICAgIC8vIH1cblxuICAgXG59XG5cbmNvbnN0IGxvZ2ljID0gbmV3IExvZ2ljKCk7XG5cbmV4cG9ydCB7Y3VycmVudExpc3QsIGxpc3RzLCBsb2dpY307IiwiY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gXCJcIiwgdGFza0lkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgICAgIHRoaXMudGFza0lkID0gdGFza0lkO1xuICAgIH1cblxuXG5cbn1cblxuZXhwb3J0IHsgVGFzayB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtkb21Db250cm9sbGVyfSBmcm9tICcuL21vZHVsZXMvRG9tQ29udHJvbGxlcic7XG5pbXBvcnQge2N1cnJlbnRMaXN0LCBsaXN0cywgbG9naWN9IGZyb20gJy4vbW9kdWxlcy9Mb2dpYyc7XG5pbXBvcnQge0xpc3R9IGZyb20gJy4vbW9kdWxlcy9MaXN0JztcblxuXG5cbmxvZ2ljLnNldERlZmF1bHRMaXN0KCk7XG5kb21Db250cm9sbGVyLmluaXRpYWxpemVDbGlja0V2ZW50TGlzdGVuZXJzKCk7XG5cblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
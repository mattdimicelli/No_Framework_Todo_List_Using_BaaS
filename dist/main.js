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
            if(target.className === 'far fa-trash-alt') {
                e.preventDefault();
                this.deleteListBtnHandler();
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
        const html = `<i class="fas fa-list-alt"></i><input class="new-list-text-input" type="text" value="${listName}" /><i class="far fa-trash-alt"></i><i class="far fa-times-circle edit-list-cancel-btn"></i><i class="far fa-check-circle edit-list-submit-btn"></i>`;
        listItem.innerHTML = html;
    }

    changeListHandler(listName) {
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setCurrentyList(listName);
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
        console.log(sortedLists);
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
        if(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList === null) ulForTasks.innerHTML = '';
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
/* harmony export */   "logic": () => (/* binding */ logic)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List */ "./src/modules/List.js");



let currentList;
let nextListId = 0;

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


    createNewList(name) {
        const newList = new _List__WEBPACK_IMPORTED_MODULE_1__.List(name, nextListId++);
        lists[name] = newList;
    }

    modifyListName(oldName, newName) {
        lists[newName] = lists[oldName];
        delete lists[oldName];
        lists[newName].name = newName;
        console.log(lists);
    }

    
    setDefaultList() {
        if (Object.keys(lists).length === 0) {
            const chores = new _List__WEBPACK_IMPORTED_MODULE_1__.List('Chores', nextListId++);
            lists.Chores = chores;
            this.setCurrentyList('Chores');
        } 
    }

    setCurrentyList(listName) {
        if (listName === null) { 
            currentList = null;   
        } else {
            currentList = lists[listName];
        }
    }

    setNextListAsCurrent() {
        const firstList = Object.keys(lists)[0];
        currentList = lists[firstList];
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
/* harmony import */ var _modules_List__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/List */ "./src/modules/List.js");






_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.logic.setDefaultList();
_modules_DomController__WEBPACK_IMPORTED_MODULE_0__.domController.initializeClickEventListeners();






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EOztBQUVuRDs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOc0Q7QUFDSTtBQUN0Qjs7OztBQUlwQyxnRUFBb0I7QUFDcEIsK0ZBQTJDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2dpYywgY3VycmVudExpc3QsIGxpc3RzfSBmcm9tICcuL0xvZ2ljJztcblxubGV0IG9sZE5hbWU7XG5cblxuY2xhc3MgRG9tQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpICB7fVxuXG4gICAgaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICBsZXQgdGFyZ2V0O1xuXG4gICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJ2knKSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnaScpO1xuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWxpc3QtY2FuY2VsLWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWxpc3Qtc3VibWl0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RUZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1saXN0LWljb24nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RJY29uSGFuZGxlcihsaXN0TmFtZSwgbGlzdEl0ZW0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1zdWJtaXQtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dElucHV0ID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYobmV3TmFtZSA9PT0gb2xkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyKG5ld05hbWUsIHRleHRJbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWxpc3QtY2FuY2VsLWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdmYXIgZmEtdHJhc2gtYWx0Jykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUxpc3RCdG5IYW5kbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdidXR0b24sIGxpJyk7XG5cbiAgICAgICAgaWYodGFyZ2V0KSB7XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51QnRuSGFuZGxlcihtZW51KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0lkID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrRWRpdG9ySGFuZGxlcih0YXNrRWRpdG9yLCB0YXNrSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzay1zdWJtaXQtYnRuJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRUYXNrU3VibWl0QnRuSGFuZGxlcih0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICd0YXNrLWRlbGV0ZS1idG4nKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFza0RlbGV0ZUJ0bkhhbmRsZXIodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdjYW5jZWwtbmV3LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsTmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtbGlzdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExpc3RCdG5IYW5kbGVyKCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2xpc3QgbWVudS1idG4nICYmICF0YXJnZXQuY2hpbGRyZW5bMV0ubWF0Y2hlcygnaW5wdXQnKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VMaXN0SGFuZGxlcihsaXN0TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVMaXN0QnRuSGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgcmVhbGx5RGVsZXRlID0gY29uZmlybShgQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSAke29sZE5hbWV9IGxpc3QgYW5kIGFsbCBvZiBpdCdzIGFzc29jaWF0ZWQgdGFza3M/YCk7XG4gICAgICAgIGlmKHJlYWxseURlbGV0ZSkge1xuICAgICAgICAgICAgZGVsZXRlIGxpc3RzW29sZE5hbWVdO1xuICAgICAgICAgICAgaWYoT2JqZWN0LmtleXMobGlzdHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxvZ2ljLnNldEN1cnJlbnR5TGlzdCA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgeyBsb2dpYy5zZXROZXh0TGlzdEFzQ3VycmVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpOyAgIFxuICAgICAgICB9IGVsc2UgdGhpcy5yZW5kZXJMaXN0cygpO1xuXG4gICAgfVxuXG4gICAgZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyKG5ld05hbWUsIHRleHRJbnB1dCkge1xuICAgICAgICBpZihuZXdOYW1lID09PSAnJykge1xuICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbG9naWMubW9kaWZ5TGlzdE5hbWUob2xkTmFtZSwgbmV3TmFtZSk7XG4gICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VMaXN0SGFuZGxlcihuZXdOYW1lKTtcbiAgICB9XG5cbiAgICBlZGl0TGlzdEljb25IYW5kbGVyKGxpc3ROYW1lLCBsaXN0SXRlbSkge1xuICAgICAgICBvbGROYW1lID0gbGlzdE5hbWU7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtbGlzdC1hbHRcIj48L2k+PGlucHV0IGNsYXNzPVwibmV3LWxpc3QtdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke2xpc3ROYW1lfVwiIC8+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0XCI+PC9pPjxpIGNsYXNzPVwiZmFyIGZhLXRpbWVzLWNpcmNsZSBlZGl0LWxpc3QtY2FuY2VsLWJ0blwiPjwvaT48aSBjbGFzcz1cImZhciBmYS1jaGVjay1jaXJjbGUgZWRpdC1saXN0LXN1Ym1pdC1idG5cIj48L2k+YDtcbiAgICAgICAgbGlzdEl0ZW0uaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9XG5cbiAgICBjaGFuZ2VMaXN0SGFuZGxlcihsaXN0TmFtZSkge1xuICAgICAgICBsb2dpYy5zZXRDdXJyZW50eUxpc3QobGlzdE5hbWUpO1xuICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1jb2x1bW4tbmFtZScpO1xuICAgICAgICBjb2x1bW5OYW1lLnRleHRDb250ZW50ID0gbGlzdE5hbWU7XG4gICAgfVxuXG5cbiAgICBuZXdMaXN0U3VibWl0QnRuSGFuZGxlcih0YXJnZXQsIGxpc3ROYW1lLCBsaXN0VGV4dElucHV0KSB7XG4gICAgICAgIGlmKGxpc3ROYW1lID09PSAnJykge1xuICAgICAgICAgICAgbGlzdFRleHRJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2ljLmNyZWF0ZU5ld0xpc3QobGlzdE5hbWUpO1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICB0aGlzLmNoYW5nZUxpc3RIYW5kbGVyKGxpc3ROYW1lKTtcbiAgICB9XG5cbiAgICByZW5kZXJMaXN0cygpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWwtbGlzdC1vZi1saXN0cycpO1xuICAgICAgICBsZXQgaHRtbCA9ICcnO1xuICAgICAgICBjb25zdCBzb3J0ZWRMaXN0cyA9IE9iamVjdC52YWx1ZXMobGlzdHMpLnNvcnQoKGxpc3QxLCBsaXN0MikgPT4ge1xuICAgICAgICAgICAgaWYobGlzdDEuaWQgPiBsaXN0Mi5pZCkgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAobGlzdDEuaWQgPT09IGxpc3QyLmlkKSByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmIChsaXN0MS5pZCA8IGxpc3QyLmlkKSByZXR1cm4gLTE7XG4gICAgICAgIH0pOyBcbiAgICAgICAgY29uc29sZS5sb2coc29ydGVkTGlzdHMpO1xuICAgICAgICBmb3IgKGNvbnN0IGxpc3Qgb2Ygc29ydGVkTGlzdHMpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gYDxsaSBjbGFzcz1cImxpc3QgbWVudS1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdCBlZGl0LWxpc3QtaWNvblwiPjwvaT4ke2xpc3QubmFtZX08c3BhbiBjbGFzcz1cImVkaXQtbGlzdC1pY29uXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdCBlZGl0LWxpc3QtaWNvblwiPjwvaT48L3NwYW4+PC9saT5gO1xuICAgICAgICB9XG4gICAgICAgIHVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuXG4gICAgbWVudUJ0bkhhbmRsZXIobWVudSkge1xuICAgICAgICBjb25zdCBkaXNwbGF5ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobWVudSkuZGlzcGxheTtcbiAgICAgICAgaWYoZGlzcGxheSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBtZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgYWRkTGlzdEJ0bkhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVsLWxpc3Qtb2YtbGlzdHMnKTtcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdsaXN0JywgJ21lbnUtYnRuJyk7XG4gICAgICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLWxpc3QtYWx0Jyk7XG4gICAgICAgIGxpLmFwcGVuZChpKTtcbiAgICAgICAgY29uc3QgdGV4dElucHV0ID0gYDxpbnB1dCBjbGFzcz1cIm5ldy1saXN0LXRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+PGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIG5ldy1saXN0LWNhbmNlbC1idG5cIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlIG5ldy1saXN0LXN1Ym1pdC1idG5cIj48L2k+YDtcbiAgICAgICAgbGkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZXh0SW5wdXQpO1xuICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgIH1cblxuICAgIHRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xuICAgICAgICBsb2dpYy5kZWxldGVUYXNrKHRhc2tJZCk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICB0YXNrRWRpdG9ySGFuZGxlcih0YXNrRWRpdG9yLCB0YXNrSWQpIHtcbiAgICAgICAgdGFza0VkaXRvci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgY29uc3QgdGFza1RleHRJbnB1dCA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGNvbnN0IGRldGFpbHNUZXh0YXJlYSA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb25zdCBkYXRlcGlja2VyID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgICAgIHRhc2tUZXh0SW5wdXQudmFsdWUgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLm5hbWU7XG4gICAgICAgIGRldGFpbHNUZXh0YXJlYS52YWx1ZSA9IGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tJZF0uZGV0YWlscztcbiAgICAgICAgZGF0ZXBpY2tlci52YWx1ZUFzTnVtYmVyID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5kdWVEYXRlO1xuICAgIH1cblxuICAgIGVkaXRUYXNrU3VibWl0QnRuSGFuZGxlcih0YXJnZXQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblswXS52YWx1ZTtcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMV0udmFsdWU7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzJdLmZpcnN0RWxlbWVudENoaWxkLnZhbHVlQXNOdW1iZXI7XG5cbiAgICAgICAgaWYoIXRoaXMuZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZSkpe1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXRhc2tOYW1lKSB7XG4gICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0YXNrTmFtZSAmJiB0aGlzLmR1ZURhdGVJc1ZhbGlkKGR1ZURhdGUpKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrSXNOZXcgPSAodGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWVkaXRvcicpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpOyAvL3dpbGwgdXNlIGN1cnJlbnRUaW1lIGFzIGEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIGVhY2ggdGFza1xuXG4gICAgICAgICAgICBpZih0YXNrSXNOZXcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrID0gbG9naWMuY3JlYXRlTmV3VGFzayh0YXNrTmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgY3VycmVudFRpbWUpO1xuICAgICAgICAgICAgICAgIGxvZ2ljLmFkZFRhc2tUb0N1cnJlbnRMaXN0KHRhc2spO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCF0YXNrSXNOZXcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xuICAgICAgICAgICAgICAgIGxvZ2ljLm1vZGlmeVRhc2sodGFza05hbWUsIGR1ZURhdGUsIGRldGFpbHMsIHRhc2tJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGFza0VkaXRvciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGlmKHRhc2tFZGl0b3IuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stZWRpdG9yJykge1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW5bMV0udmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkdWVEYXRlSXNWYWxpZChkdWVEYXRlVmFsdWVBc051bWJlcikge1xuICAgICAgICBpZihpc05hTihkdWVEYXRlVmFsdWVBc051bWJlcikpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY2FuY2VsTmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcikge1xuICAgICAgICBuZXdUYXNrRWRpdG9yLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIG5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpIHtcbiAgICAgICAgbmV3VGFza0VkaXRvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICByZW5kZXJUYXNrcygpIHtcbiAgICAgICAgY29uc3QgdWxGb3JUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGUtdGFzay1pdGVtcycpO1xuICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZihjdXJyZW50TGlzdCA9PT0gbnVsbCkgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gYDxsaSBjbGFzcz1cInRvZG8taXRlbVwiIGRhdGEtaWQ9XCIke3Rhc2sudGFza0lkfVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZGF0ZS1idG5zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YXNrXCI+JHt0YXNrLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlLWFuZC1idG5zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZHVlLWRhdGVcIj4ke3RoaXMuY3JlYXRlUmVhZGFibGVEYXRlKHRhc2suZHVlRGF0ZSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC10YXNrLWJ0blwiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXRcIj48L2k+PC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1lZGl0b3IgaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIiBtZXRob2Q9XCJnZXRcIiBjbGFzcz1cInRhc2stZWRpdG9yLWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0YXNrLWZpZWxkXCIgbmFtZT1cInRhc2tcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVGFza1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZGVzY3JpcHRpb24tZmllbGRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBwbGFjZWhvbGRlcj1cIkRldGFpbHNcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWFkZGJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkYXRlLXBpY2tlclwiIG5hbWU9XCJkdWUtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRhc2stZGVsZXRlLWJ0blwiPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1zdWJtaXQtYnRuXCI+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2xpPmA7XG4gICAgICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCArPSBodG1sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUmVhZGFibGVEYXRlKGRhdGVWYWx1ZUFzTnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlVmFsdWVBc051bWJlcik7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpICsgMTtcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAgIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRvbUNvbnRyb2xsZXIgPSBuZXcgRG9tQ29udHJvbGxlcigpO1xuXG5cblxuLy9pc3N1ZXMuICBjYW4ndCBnZXQgdGFzayBuYW1lIHRvIHdyYXAgYXQgNTAlOyIsImNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSB7fTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgTGlzdCB9OyIsImltcG9ydCB7VGFza30gZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7TGlzdH0gZnJvbSAnLi9MaXN0JztcblxubGV0IGN1cnJlbnRMaXN0O1xubGV0IG5leHRMaXN0SWQgPSAwO1xuXG5jb25zdCBsaXN0cyA9IHt9O1xuXG5jbGFzcyBMb2dpYyB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgY3JlYXRlTmV3VGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gXCJcIiwgdGFza0lkKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCB0YXNrSWQpO1xuICAgIH1cblxuICAgIGFkZFRhc2tUb0N1cnJlbnRMaXN0KHRhc2spIHtcbiAgICAgICAgY3VycmVudExpc3QudGFza3NbdGFzay50YXNrSWRdID0gdGFzaztcbiAgICB9XG5cbiAgICBtb2RpZnlUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSAnJywgdGFza0lkKSB7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKSkge1xuICAgICAgICAgICAgaWYodGFzay50YXNrSWQgPT0gdGFza0lkKSB7XG4gICAgICAgICAgICAgICAgdGFzay5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICB0YXNrLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICAgICAgICAgIHRhc2suZGV0YWlscyA9IGRldGFpbHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVUYXNrKHRhc2spIHtcbiAgICAgICAgZGVsZXRlIGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tdO1xuICAgIH1cblxuXG4gICAgY3JlYXRlTmV3TGlzdChuYW1lKSB7XG4gICAgICAgIGNvbnN0IG5ld0xpc3QgPSBuZXcgTGlzdChuYW1lLCBuZXh0TGlzdElkKyspO1xuICAgICAgICBsaXN0c1tuYW1lXSA9IG5ld0xpc3Q7XG4gICAgfVxuXG4gICAgbW9kaWZ5TGlzdE5hbWUob2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgICBsaXN0c1tuZXdOYW1lXSA9IGxpc3RzW29sZE5hbWVdO1xuICAgICAgICBkZWxldGUgbGlzdHNbb2xkTmFtZV07XG4gICAgICAgIGxpc3RzW25ld05hbWVdLm5hbWUgPSBuZXdOYW1lO1xuICAgICAgICBjb25zb2xlLmxvZyhsaXN0cyk7XG4gICAgfVxuXG4gICAgXG4gICAgc2V0RGVmYXVsdExpc3QoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhsaXN0cykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBjaG9yZXMgPSBuZXcgTGlzdCgnQ2hvcmVzJywgbmV4dExpc3RJZCsrKTtcbiAgICAgICAgICAgIGxpc3RzLkNob3JlcyA9IGNob3JlcztcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudHlMaXN0KCdDaG9yZXMnKTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50eUxpc3QobGlzdE5hbWUpIHtcbiAgICAgICAgaWYgKGxpc3ROYW1lID09PSBudWxsKSB7IFxuICAgICAgICAgICAgY3VycmVudExpc3QgPSBudWxsOyAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudExpc3QgPSBsaXN0c1tsaXN0TmFtZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXROZXh0TGlzdEFzQ3VycmVudCgpIHtcbiAgICAgICAgY29uc3QgZmlyc3RMaXN0ID0gT2JqZWN0LmtleXMobGlzdHMpWzBdO1xuICAgICAgICBjdXJyZW50TGlzdCA9IGxpc3RzW2ZpcnN0TGlzdF07XG4gICAgfVxuXG5cblxuICAgXG59XG5cbmNvbnN0IGxvZ2ljID0gbmV3IExvZ2ljKCk7XG5cblxuZXhwb3J0IHtjdXJyZW50TGlzdCwgbGlzdHMsIGxvZ2ljfTsiLCJjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSBcIlwiLCB0YXNrSWQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICAgICAgdGhpcy50YXNrSWQgPSB0YXNrSWQ7XG4gICAgfVxuXG5cblxufVxuXG5leHBvcnQgeyBUYXNrIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2RvbUNvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy9Eb21Db250cm9sbGVyJztcbmltcG9ydCB7Y3VycmVudExpc3QsIGxpc3RzLCBsb2dpY30gZnJvbSAnLi9tb2R1bGVzL0xvZ2ljJztcbmltcG9ydCB7TGlzdH0gZnJvbSAnLi9tb2R1bGVzL0xpc3QnO1xuXG5cblxubG9naWMuc2V0RGVmYXVsdExpc3QoKTtcbmRvbUNvbnRyb2xsZXIuaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9
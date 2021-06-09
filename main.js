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



class DomController {

    constructor()  {}

    initializeClickEventListeners() {
        document.addEventListener('click', this.handleClick.bind(this));
    }
    
    handleClick(e) {

        const target = e.target.closest('button');

        if(target) {
            if(target.className === 'menu-btn') {
                const menu = document.querySelector('.menu');
                this.menuBtnHandler(menu);
            }
            if(target.className === 'edit-task-btn') {
                const taskEditor = target.parentElement.parentElement.parentElement.children[1];
                this.taskEditorHandler(taskEditor);
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
            
        }
    }

    menuBtnHandler(menu) {
        const display = window.getComputedStyle(menu).display;
        if(display === 'none'){
            menu.style.display = 'block';
        }
        else menu.style.display = 'none';
    }

    taskDeleteBtnHandler(target) {
        const taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.deleteTask(taskId);
        this.renderTasks();
    }

    taskEditorHandler(taskEditor) {
        taskEditor.classList.toggle('hidden');
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
                    console.log('fire');
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
                            <input class="task-field" name="task" type="text" placeholder="task" />
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


const lists = new Map();

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

    // createNewList() {
    //     const newList = new List(name);
    //     lists.set(newList, newList);
    // }

    
    setDefaultList() {
        if (lists.size === 0) {
            const chores = new _List__WEBPACK_IMPORTED_MODULE_1__.List('Chores');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQTZDOzs7QUFHN0M7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLG9EQUFnQjtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQzs7OztBQUkzQztBQUNBLDZCQUE2Qix1REFBbUI7QUFDaEQsZ0JBQWdCLDhEQUEwQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixvREFBZ0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxxREFBaUI7QUFDMUQsMkRBQTJELFlBQVk7QUFDdkU7QUFDQSxxQ0FBcUMsVUFBVTtBQUMvQztBQUNBLDZDQUE2QyxzQ0FBc0M7QUFDbkY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN2Qzs7O0FBR0E7O0FBRU87Ozs7QUFJUCw4Qzs7Ozs7Ozs7Ozs7Ozs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0w0QjtBQUNBOztBQUU1Qjs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQix1Q0FBSTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLCtCQUErQix1Q0FBSTtBQUNuQztBQUNBO0FBQ0EsUztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0RBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOzs7Ozs7OztVQ1hBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOc0Q7QUFDSTtBQUN0Qjs7OztBQUlwQyxnRUFBb0I7QUFDcEIsK0ZBQTJDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2dpYywgY3VycmVudExpc3QgfSBmcm9tICcuL0xvZ2ljJztcblxuXG5jbGFzcyBEb21Db250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkgIHt9XG5cbiAgICBpbml0aWFsaXplQ2xpY2tFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVDbGljayhlKSB7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uJyk7XG5cbiAgICAgICAgaWYodGFyZ2V0KSB7XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51QnRuSGFuZGxlcihtZW51KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrRWRpdG9ySGFuZGxlcih0YXNrRWRpdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2stc3VibWl0LWJ0bicpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICduZXctdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0VkaXRvciA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAndGFzay1kZWxldGUtYnRuJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1lbnVCdG5IYW5kbGVyKG1lbnUpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1lbnUpLmRpc3BsYXk7XG4gICAgICAgIGlmKGRpc3BsYXkgPT09ICdub25lJyl7XG4gICAgICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIHRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xuICAgICAgICBsb2dpYy5kZWxldGVUYXNrKHRhc2tJZCk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICB0YXNrRWRpdG9ySGFuZGxlcih0YXNrRWRpdG9yKSB7XG4gICAgICAgIHRhc2tFZGl0b3IuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgZWRpdFRhc2tTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBcblxuICAgICAgICBjb25zdCB0YXNrTmFtZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0udmFsdWU7XG4gICAgICAgIGNvbnN0IGRldGFpbHMgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzFdLnZhbHVlO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZUFzTnVtYmVyO1xuXG4gICAgICAgIGlmKCF0aGlzLmR1ZURhdGVJc1ZhbGlkKGR1ZURhdGUpKXtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0YXNrTmFtZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGFza05hbWUgJiYgdGhpcy5kdWVEYXRlSXNWYWxpZChkdWVEYXRlKSkge1xuICAgICAgICAgICAgY29uc3QgdGFza0lzTmV3ID0gKHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc05hbWUgPT09ICduZXctdGFzay1lZGl0b3InKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTsgLy93aWxsIHVzZSBjdXJyZW50VGltZSBhcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGZvciBlYWNoIHRhc2tcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICBpZih0YXNrSXNOZXcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrID0gbG9naWMuY3JlYXRlTmV3VGFzayh0YXNrTmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgY3VycmVudFRpbWUpO1xuICAgICAgICAgICAgICAgIGxvZ2ljLmFkZFRhc2tUb0N1cnJlbnRMaXN0KHRhc2spO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCF0YXNrSXNOZXcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xuICAgICAgICAgICAgICAgIGxvZ2ljLm1vZGlmeVRhc2sodGFza05hbWUsIGR1ZURhdGUsIGRldGFpbHMsIHRhc2tJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGFza0VkaXRvciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGlmKHRhc2tFZGl0b3IuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stZWRpdG9yJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmlyZScpO1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW5bMV0udmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIFxuXG4gICAgfVxuXG4gICAgZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZVZhbHVlQXNOdW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4oZHVlRGF0ZVZhbHVlQXNOdW1iZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIFxuXG4gICAgbmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcikge1xuICAgICAgICBuZXdUYXNrRWRpdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIHJlbmRlclRhc2tzKCkge1xuICAgICAgICBjb25zdCB1bEZvclRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZS10YXNrLWl0ZW1zJyk7XG4gICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKSkge1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IGA8bGkgY2xhc3M9XCJ0b2RvLWl0ZW1cIiBkYXRhLWlkPVwiJHt0YXNrLnRhc2tJZH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWRhdGUtYnRuc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFza1wiPiR7dGFzay5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZS1hbmQtYnRuc1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImR1ZS1kYXRlXCI+JHt0aGlzLmNyZWF0ZVJlYWRhYmxlRGF0ZSh0YXNrLmR1ZURhdGUpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPjwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZWRpdG9yIGhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gYWN0aW9uPVwiXCIgbWV0aG9kPVwiZ2V0XCIgY2xhc3M9XCJ0YXNrLWVkaXRvci1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidGFzay1maWVsZFwiIG5hbWU9XCJ0YXNrXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInRhc2tcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImRlc2NyaXB0aW9uLWZpZWxkXCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXRhaWxzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1hZGRidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZGF0ZS1waWNrZXJcIiBuYW1lPVwiZHVlLWRhdGVcIiB0eXBlPVwiZGF0ZVwiIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrLWRlbGV0ZS1idG5cIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LXRhc2stc3VibWl0LWJ0blwiPjxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLWNpcmNsZVwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9saT5gO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVJlYWRhYmxlRGF0ZShkYXRlVmFsdWVBc051bWJlcikge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVZhbHVlQXNOdW1iZXIpO1xuICAgICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0VVRDTW9udGgoKSArIDE7XG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcbiAgICB9XG5cbiAgIFxufVxuXG5leHBvcnQgY29uc3QgZG9tQ29udHJvbGxlciA9IG5ldyBEb21Db250cm9sbGVyKCk7XG5cblxuXG4vL2lzc3Vlcy4gIGNhbid0IGdldCB0YXNrIG5hbWUgdG8gd3JhcCBhdCA1MCU7IiwiY2xhc3MgTGlzdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0ge307XG4gICAgfVxufVxuXG5leHBvcnQgeyBMaXN0IH07IiwiaW1wb3J0IHtUYXNrfSBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IHtMaXN0fSBmcm9tICcuL0xpc3QnO1xuXG5sZXQgY3VycmVudExpc3Q7XG5cblxuY29uc3QgbGlzdHMgPSBuZXcgTWFwKCk7XG5cbmNsYXNzIExvZ2ljIHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBjcmVhdGVOZXdUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSBcIlwiLCB0YXNrSWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMsIHRhc2tJZCk7XG4gICAgfVxuXG4gICAgYWRkVGFza1RvQ3VycmVudExpc3QodGFzaykge1xuICAgICAgICBjdXJyZW50TGlzdC50YXNrc1t0YXNrLnRhc2tJZF0gPSB0YXNrO1xuICAgIH1cblxuICAgIG1vZGlmeVRhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9ICcnLCB0YXNrSWQpIHtcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpKSB7XG4gICAgICAgICAgICBpZih0YXNrLnRhc2tJZCA9PSB0YXNrSWQpIHtcbiAgICAgICAgICAgICAgICB0YXNrLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgIHRhc2suZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgICAgICAgICAgdGFzay5kZXRhaWxzID0gZGV0YWlscztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZVRhc2sodGFzaykge1xuICAgICAgICBkZWxldGUgY3VycmVudExpc3QudGFza3NbdGFza107XG4gICAgfVxuXG4gICAgIC8vIGdldEN1cnJlbnRUYXNrKCkge1xuICAgIC8vICAgICByZXR1cm4gY3VycmVudFRhc2s7XG4gICAgLy8gfVxuXG4gICAgLy8gY3JlYXRlTmV3TGlzdCgpIHtcbiAgICAvLyAgICAgY29uc3QgbmV3TGlzdCA9IG5ldyBMaXN0KG5hbWUpO1xuICAgIC8vICAgICBsaXN0cy5zZXQobmV3TGlzdCwgbmV3TGlzdCk7XG4gICAgLy8gfVxuXG4gICAgXG4gICAgc2V0RGVmYXVsdExpc3QoKSB7XG4gICAgICAgIGlmIChsaXN0cy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBjaG9yZXMgPSBuZXcgTGlzdCgnQ2hvcmVzJyk7XG4gICAgICAgICAgICBsaXN0cy5zZXQoY2hvcmVzLCBjaG9yZXMpO1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50TGlzdChsaXN0cy5nZXQoY2hvcmVzKSk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgc2V0Q3VycmVudExpc3QobGlzdCkge1xuICAgICAgICBjdXJyZW50TGlzdCA9IGxpc3Q7XG4gICAgfVxuXG4gICAgLy8gZ2V0Q3VycmVudExpc3QoKSB7XG4gICAgLy8gICAgIHJldHVybiBjdXJyZW50TGlzdDtcbiAgICAvLyB9XG5cbiAgIFxufVxuXG5jb25zdCBsb2dpYyA9IG5ldyBMb2dpYygpO1xuXG5leHBvcnQge2N1cnJlbnRMaXN0LCBsaXN0cywgbG9naWN9OyIsImNsYXNzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9IFwiXCIsIHRhc2tJZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgICAgICB0aGlzLnRhc2tJZCA9IHRhc2tJZDtcbiAgICB9XG5cblxuXG59XG5cbmV4cG9ydCB7IFRhc2sgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7ZG9tQ29udHJvbGxlcn0gZnJvbSAnLi9tb2R1bGVzL0RvbUNvbnRyb2xsZXInO1xuaW1wb3J0IHtjdXJyZW50TGlzdCwgbGlzdHMsIGxvZ2ljfSBmcm9tICcuL21vZHVsZXMvTG9naWMnO1xuaW1wb3J0IHtMaXN0fSBmcm9tICcuL21vZHVsZXMvTGlzdCc7XG5cblxuXG5sb2dpYy5zZXREZWZhdWx0TGlzdCgpO1xuZG9tQ29udHJvbGxlci5pbml0aWFsaXplQ2xpY2tFdmVudExpc3RlbmVycygpO1xuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DomController = /*#__PURE__*/function () {
  function DomController() {
    _classCallCheck(this, DomController);

    this.oldName = null;
    this.listCurrentlyBeingEdited = false;
  }

  _createClass(DomController, [{
    key: "initializeClickEventListeners",
    value: function initializeClickEventListeners() {
      document.addEventListener('click', this.handleClick.bind(this));
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      /* writing this application was a learning process.  I attempted and
          succeeded in using one event listener with delegation for every
          click on the DOM.  doing so required a complex set of conditionals.*/
      // the following variable is declared for use in conditional statements
      var target;
      /*the taskEditorHandler() uses a date-picker element, so e.preventDefault()
      cannot be used with it*/

      if (e.target.closest('div[class="task-date-btns"]') && e.target.className !== 'fas fa-edit') {
        //strikes thru the name of the task and the due date if either one clicked on
        var taskTarget = e.target.closest('div[class="task-date-btns"]').firstElementChild;
        var dateTarget = e.target.closest('div[class="task-date-btns"]').children[1].firstElementChild;
        this.toggleStrikethruTask(taskTarget, dateTarget);
      } else if (e.target.closest('i')) {
        e.preventDefault();
        target = e.target.closest('i');

        if (target.classList.contains('new-list-cancel-btn')) {
          target.parentElement.remove();
        } else if (target.classList.contains('new-list-submit-btn')) {
          var listTextInput = target.previousElementSibling.previousElementSibling;
          var listName = target.previousElementSibling.previousElementSibling.value;
          this.newListSubmitBtnHandler(target, listName, listTextInput);
        } else if (target.classList.contains('edit-list-icon')) {
          var listItem = target.parentElement.parentElement;
          var _listName = target.parentElement.parentElement.textContent;
          this.editListIconHandler(_listName, listItem);
        } else if (target.classList.contains('edit-list-submit-btn')) {
          /* this btn is identical to the 'new-list-submit-btn', but 
          substitutes it when an existing list is currently being edited */
          var textInput = target.previousElementSibling.previousElementSibling.previousElementSibling;
          var newName = target.previousElementSibling.previousElementSibling.previousElementSibling.value;

          if (newName === this.oldName) {
            textInput.focus();
            return;
          }

          this.editListSubmitBtnHandler(newName, textInput);
        } else if (target.classList.contains('edit-list-cancel-btn')) {
          this.listCurrentlyBeingEdited = false;
          this.renderLists();
        } else if (target.className === 'far fa-trash-alt list') {
          this.deleteListHandler();
        } else if (e.target.closest('button, li')) {
          target = e.target.closest('button, li');

          if (target.className === 'menu-btn') {
            var menu = document.querySelector('.menu');
            this.menuBtnHandler(menu);
          } else if (target.className === 'edit-task-btn') {
            var taskEditor = target.parentElement.parentElement.parentElement.children[1];
            var taskId = target.parentElement.parentElement.parentElement.dataset.id;
            this.taskEditorHandler(taskEditor, taskId);
          } else if (target.className === 'edit-task-submit-btn') {
            this.editTaskSubmitBtnHandler(target);
          } else if (target.className === 'new-task-btn') {
            var newTaskEditor = target.previousElementSibling;
            this.newTaskBtnHandler(newTaskEditor);
          } else if (target.className === 'task-delete-btn') {
            this.taskDeleteBtnHandler(target);
          } else if (target.className === 'cancel-new-task-btn') {
            var _newTaskEditor = target.parentElement.parentElement.parentElement;
            this.cancelNewTaskBtnHandler(_newTaskEditor);
          } else if (target.classList.contains('add-list-btn')) {
            this.addListBtnHandler();
          }
        }
      } else {
        target = e.target.closest('button, li');

        if (target === null) {
          return;
        } else {
          if (target.className === 'new-task-btn') {
            e.preventDefault();
            var _newTaskEditor2 = target.previousElementSibling;
            this.newTaskBtnHandler(_newTaskEditor2);
          } else if (target.classList.contains('add-list-btn')) {
            this.addListBtnHandler();
          } else if (target.className === 'list menu-btn' && !target.children[1].matches('input')) {
            var _listName2 = target.childNodes[1].textContent;
            this.changeListHandler(_listName2);
          } else if (target.className === 'menu-btn all') {
            this.renderTasks();
          } else if (target.className === 'menu-btn today') {
            this.viewOnlyToday();
          } else if (target.className === 'menu-btn week') {
            this.viewOnlyWeek();
          }
        }
      }
    }
  }, {
    key: "toggleStrikethruTask",
    value: function toggleStrikethruTask(taskTarget, dateTarget) {
      taskTarget.classList.toggle('strikethru');
      dateTarget.classList.toggle('strikethru');
    }
  }, {
    key: "viewOnlyWeek",
    value: function viewOnlyWeek() {
      var ulForTasks = document.querySelector('.the-task-items');
      ulForTasks.innerHTML = '';

      var _iterator = _createForOfIteratorHelper(Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks).filter(function (task) {
        var dueDateObj = new Date(task.dueDate);

        if (Math.abs(Date.now() - dueDateObj) <= 6.048e8) {
          return true;
        } else return false;
      })),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var task = _step.value;
          var html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
          ulForTasks.innerHTML += html;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "createTaskHTML",
    value: function createTaskHTML(taskId, name, dueDate) {
      var html = "<li class=\"todo-item\" data-id=\"".concat(taskId, "\">\n        <div class=\"task-date-btns\">\n            <span class=\"task\">").concat(name, "</span>\n            <div class=\"date-and-btns\">\n                <span class=\"due-date\">").concat(this.createReadableDate(dueDate), "</span>\n                <button class=\"edit-task-btn\"><i class=\"fas fa-edit\"></i></button>\n\n            </div>\n        </div>\n    <div class=\"task-editor hidden\">\n                    <form action=\"\" method=\"get\" class=\"task-editor-form\">\n                        <input class=\"task-field\" name=\"task\" type=\"text\" placeholder=\"Task\" />\n                        <textarea class=\"description-field\" name=\"description\" placeholder=\"Details\"></textarea>\n                        <div class=\"datepicker-addbutton\">\n                            <input class=\"date-picker\" name=\"due-date\" type=\"date\" required />\n                            <button class=\"task-delete-btn\"><i class=\"far fa-trash-alt\"></i></button>\n                            <button class=\"edit-task-submit-btn\"><i class=\"far fa-check-circle\"></i></button>\n                        </div>\n                    </form>\n                </div>\n            </li>");
      return html;
    }
  }, {
    key: "viewOnlyToday",
    value: function viewOnlyToday() {
      var ulForTasks = document.querySelector('.the-task-items');
      ulForTasks.innerHTML = '';

      var _iterator2 = _createForOfIteratorHelper(Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks).filter(function (task) {
        var dueDateObj = new Date(task.dueDate);
        var dueDateDay = dueDateObj.getUTCDate();
        var dueDateMonth = dueDateObj.getUTCMonth();
        var dueDateYear = dueDateObj.getUTCFullYear();
        var currentDay = new Date().getUTCDate();
        var currentMonth = new Date().getUTCMonth();
        var currentYear = new Date().getUTCFullYear();

        if (dueDateDay === currentDay && dueDateMonth === currentMonth && dueDateYear === currentYear) {
          return true;
        } else return false;
      })),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var task = _step2.value;
          var html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
          ulForTasks.innerHTML += html;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "updateColumnName",
    value: function updateColumnName() {
      var columnName = document.querySelector('.list-column-name');
      columnName.textContent = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.name;
    }
  }, {
    key: "deleteListHandler",
    value: function deleteListHandler() {
      this.listCurrentlyBeingEdited = false;
      var reallyDelete = confirm("Are you sure that you want to delete the ".concat(this.oldName, " list and all associated tasks?"));

      if (reallyDelete) {
        if (Object.keys(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).length > 1) {
          _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.deleteList(this.oldName);
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
  }, {
    key: "deleteListBtnHandler",
    value: function deleteListBtnHandler() {
      var reallyDelete = confirm("Are you sure that you want to delete the ".concat(this.oldName, " list and all of it's associated tasks?"));

      if (reallyDelete) {
        delete _Logic__WEBPACK_IMPORTED_MODULE_0__.lists[this.oldName];

        if (Object.keys(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).length === 0) {
          _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setCurrentyList = null;
        } else {
          _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setNextListAsCurrent();
        }

        this.renderLists();
        this.renderTasks();
      } else this.renderLists();
    }
  }, {
    key: "editListSubmitBtnHandler",
    value: function editListSubmitBtnHandler(newName, textInput) {
      if (newName === '') {
        textInput.focus();
        return;
      }

      this.listCurrentlyBeingEdited = false;
      _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyListName(oldName, newName);
      this.renderLists();
      this.changeListHandler(newName);
    }
  }, {
    key: "editListIconHandler",
    value: function editListIconHandler(listName, listItem) {
      /* if another list is being editted, won't allow another to be editted
      until the first one is finished */
      if (this.listCurrentlyBeingEdited) return;
      this.listCurrentlyBeingEdited = true;
      this.oldName = listName;
      var html = "<i class=\"fas fa-list-alt\"></i><input class=\"new-list-text-input\" type=\"text\" value=\"".concat(listName, "\" /><i class=\"far fa-trash-alt list\"></i><i class=\"far fa-times-circle edit-list-cancel-btn\"></i><i class=\"far fa-check-circle edit-list-submit-btn\"></i>");
      listItem.innerHTML = html;
    }
  }, {
    key: "changeListHandler",
    value: function changeListHandler(listName) {
      _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.makeCurrentList(listName);
      this.renderTasks();
      var columnName = document.querySelector('.list-column-name');
      columnName.textContent = listName;
    }
  }, {
    key: "newListSubmitBtnHandler",
    value: function newListSubmitBtnHandler(target, listName, listTextInput) {
      if (listName === '') {
        listTextInput.focus();
        return;
      }

      _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.createNewList(listName);
      target.parentElement.remove();
      this.renderLists();
      this.changeListHandler(listName);
    }
  }, {
    key: "renderLists",
    value: function renderLists() {
      var ul = document.querySelector('.ul-list-of-lists');
      var html = '';
      var sortedLists = Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).sort(function (list1, list2) {
        if (list1.id > list2.id) return 1;
        if (list1.id === list2.id) return 0;
        if (list1.id < list2.id) return -1;
      });

      var _iterator3 = _createForOfIteratorHelper(sortedLists),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var list = _step3.value;
          html += "<li class=\"list menu-btn\"><i class=\"fas fa-list-alt edit-list-icon\"></i>".concat(list.name, "<span class=\"edit-list-icon\"><i class=\"fas fa-edit edit-list-icon\"></i></span></li>");
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      ul.innerHTML = html;
    }
  }, {
    key: "menuBtnHandler",
    value: function menuBtnHandler(menu) {
      var display = window.getComputedStyle(menu).display;

      if (display === 'none') {
        menu.style.display = 'block';
      } else menu.style.display = 'none';
    }
  }, {
    key: "addListBtnHandler",
    value: function addListBtnHandler() {
      var ul = document.querySelector('.ul-list-of-lists');
      var li = document.createElement('li');
      li.classList.add('list', 'menu-btn');
      var i = document.createElement('i');
      i.classList.add('fas', 'fa-list-alt');
      li.append(i);
      var textInput = "<input class=\"new-list-text-input\" type=\"text\" /><i class=\"far fa-times-circle new-list-cancel-btn\"></i><i class=\"far fa-check-circle new-list-submit-btn\"></i>";
      li.insertAdjacentHTML('beforeend', textInput);
      ul.append(li);
    }
  }, {
    key: "taskDeleteBtnHandler",
    value: function taskDeleteBtnHandler(target) {
      var taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
      _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.deleteTask(taskId);
      this.renderTasks();
    }
  }, {
    key: "taskEditorHandler",
    value: function taskEditorHandler(taskEditor, taskId) {
      taskEditor.classList.toggle('hidden');
      var taskTextInput = taskEditor.firstElementChild.firstElementChild;
      var detailsTextarea = taskEditor.firstElementChild.firstElementChild.nextElementSibling;
      var datepicker = taskEditor.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;
      taskTextInput.value = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].name;
      detailsTextarea.value = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].details;
      datepicker.valueAsNumber = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].dueDate;
    }
  }, {
    key: "editTaskSubmitBtnHandler",
    value: function editTaskSubmitBtnHandler(target) {
      var taskName = target.parentElement.parentElement.children[0].value;
      var details = target.parentElement.parentElement.children[1].value;
      var dueDate = target.parentElement.parentElement.children[2].firstElementChild.valueAsDate;

      if (!this.dueDateIsValid(dueDate)) {
        target.parentElement.parentElement.children[2].firstElementChild.focus();
      }

      if (!taskName) {
        target.parentElement.parentElement.children[0].focus();
      }

      if (taskName && this.dueDateIsValid(dueDate)) {
        var taskIsNew = target.parentElement.parentElement.parentElement.className === 'new-task-editor' ? true : false;
        var currentTime = Date.now(); //will use currentTime as a unique identifier for each task

        if (taskIsNew) {
          var task = _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.createNewTask(taskName, dueDate, details, currentTime);
          _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.addTaskToCurrentList(task); //here?

          this.renderTasks();
        }

        if (!taskIsNew) {
          var taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
          _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyTask(taskName, dueDate, details, taskId);
          this.renderTasks();
        }

        var taskEditor = target.parentElement.parentElement.parentElement;

        if (taskEditor.className === 'new-task-editor') {
          taskEditor.firstElementChild.firstElementChild.value = '';
          taskEditor.firstElementChild.children[1].value = '';
          taskEditor.firstElementChild.children[2].firstElementChild.value = '';
          taskEditor.classList.toggle('hidden');
        }
      }
    }
  }, {
    key: "dueDateIsValid",
    value: function dueDateIsValid(dueDateValueAsNumber) {
      if (isNaN(dueDateValueAsNumber)) return false;
      return true;
    }
  }, {
    key: "cancelNewTaskBtnHandler",
    value: function cancelNewTaskBtnHandler(newTaskEditor) {
      newTaskEditor.classList.add('hidden');
    }
  }, {
    key: "newTaskBtnHandler",
    value: function newTaskBtnHandler(newTaskEditor) {
      newTaskEditor.classList.remove('hidden');
    }
  }, {
    key: "renderTasks",
    value: function renderTasks() {
      var ulForTasks = document.querySelector('.the-task-items');
      ulForTasks.innerHTML = '';
      if (_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList === null) ulForTasks.innerHTML = '';

      for (var _i = 0, _Object$values = Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks); _i < _Object$values.length; _i++) {
        var task = _Object$values[_i];
        var html = this.createTaskHTML(task.taskId, task.name, task.dueDate); //here

        ulForTasks.innerHTML += html;
      }
    }
  }, {
    key: "createReadableDate",
    value: function createReadableDate(dateValueAsNumber) {
      var date = new Date(dateValueAsNumber);
      var month = date.getUTCMonth() + 1;
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();
      return "".concat(month, "/").concat(day, "/").concat(year);
    }
  }]);

  return DomController;
}();

var domController = new DomController(); //issues.  can't get task name to wrap at 50%;

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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function List(name, id) {
  _classCallCheck(this, List);

  this.name = name;
  this.tasks = {};
  this.id = id;
};



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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var currentList;
var nextListId = 0;
var lists = {};

var Logic = /*#__PURE__*/function () {
  function Logic() {
    _classCallCheck(this, Logic);
  }

  _createClass(Logic, [{
    key: "createNewTask",
    value: function createNewTask(name, dueDate) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var taskId = arguments.length > 3 ? arguments[3] : undefined;
      return new _Task__WEBPACK_IMPORTED_MODULE_0__.Task(name, dueDate, details, taskId);
    }
  }, {
    key: "addTaskToCurrentList",
    value: function addTaskToCurrentList(task) {
      currentList.tasks[task.taskId] = task;
    }
  }, {
    key: "modifyTask",
    value: function modifyTask(name, dueDate) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var taskId = arguments.length > 3 ? arguments[3] : undefined;

      for (var _i = 0, _Object$values = Object.values(currentList.tasks); _i < _Object$values.length; _i++) {
        var task = _Object$values[_i];

        if (task.taskId == taskId) {
          task.name = name;
          task.dueDate = dueDate;
          task.details = details;
          break;
        }
      }
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(task) {
      delete currentList.tasks[task];
    }
  }, {
    key: "createNewList",
    value: function createNewList(name) {
      var newList = new _List__WEBPACK_IMPORTED_MODULE_1__.List(name, nextListId++);
      lists[name] = newList;
    }
  }, {
    key: "modifyListName",
    value: function modifyListName(oldName, newName) {
      lists[newName] = lists[oldName];
      delete lists[oldName];
      lists[newName].name = newName;
    }
  }, {
    key: "setDefaultList",
    value: function setDefaultList() {
      if (Object.keys(lists).length === 0) {
        var chores = new _List__WEBPACK_IMPORTED_MODULE_1__.List('Chores', nextListId++);
        lists.Chores = chores;
        this.makeCurrentList('Chores');
      }
    }
  }, {
    key: "makeCurrentList",
    value: function makeCurrentList(listName) {
      currentList = lists[listName];
    }
  }, {
    key: "writeOverCurrentList",
    value: function writeOverCurrentList(dataFromStorage) {
      currentList = dataFromStorage;
    }
  }, {
    key: "setCurrentListToARemainingList",
    value: function setCurrentListToARemainingList() {
      var firstList = Object.keys(lists)[0];
      this.makeCurrentList(firstList);
    }
  }, {
    key: "deleteList",
    value: function deleteList(listName) {
      delete lists[listName];
    }
  }]);

  return Logic;
}();

var logic = new Logic();
window.addEventListener('beforeunload', function () {
  localStorage.setItem('currentList', JSON.stringify(currentList));
  localStorage.setItem('lists', JSON.stringify(lists));
  localStorage.setItem('nextListId', JSON.stringify(nextListId));
});
document.addEventListener('DOMContentLoaded', function () {
  if (Object.keys(localStorage).length > 0) {
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
});


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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(name, dueDate) {
  var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var taskId = arguments.length > 3 ? arguments[3] : undefined;

  _classCallCheck(this, Task);

  this.name = name;
  this.dueDate = dueDate;
  this.details = details;
  this.taskId = taskId;
};



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRG9tQ29udHJvbGxlciIsIm9sZE5hbWUiLCJsaXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGljayIsImJpbmQiLCJlIiwidGFyZ2V0IiwiY2xvc2VzdCIsImNsYXNzTmFtZSIsInRhc2tUYXJnZXQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImRhdGVUYXJnZXQiLCJjaGlsZHJlbiIsInRvZ2dsZVN0cmlrZXRocnVUYXNrIiwicHJldmVudERlZmF1bHQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJsaXN0VGV4dElucHV0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxpc3ROYW1lIiwidmFsdWUiLCJuZXdMaXN0U3VibWl0QnRuSGFuZGxlciIsImxpc3RJdGVtIiwidGV4dENvbnRlbnQiLCJlZGl0TGlzdEljb25IYW5kbGVyIiwidGV4dElucHV0IiwibmV3TmFtZSIsImZvY3VzIiwiZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyIiwicmVuZGVyTGlzdHMiLCJkZWxldGVMaXN0SGFuZGxlciIsIm1lbnUiLCJxdWVyeVNlbGVjdG9yIiwibWVudUJ0bkhhbmRsZXIiLCJ0YXNrRWRpdG9yIiwidGFza0lkIiwiZGF0YXNldCIsImlkIiwidGFza0VkaXRvckhhbmRsZXIiLCJlZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIiLCJuZXdUYXNrRWRpdG9yIiwibmV3VGFza0J0bkhhbmRsZXIiLCJ0YXNrRGVsZXRlQnRuSGFuZGxlciIsImNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyIiwiYWRkTGlzdEJ0bkhhbmRsZXIiLCJtYXRjaGVzIiwiY2hpbGROb2RlcyIsImNoYW5nZUxpc3RIYW5kbGVyIiwicmVuZGVyVGFza3MiLCJ2aWV3T25seVRvZGF5Iiwidmlld09ubHlXZWVrIiwidG9nZ2xlIiwidWxGb3JUYXNrcyIsImlubmVySFRNTCIsIk9iamVjdCIsInZhbHVlcyIsImN1cnJlbnRMaXN0IiwiZmlsdGVyIiwidGFzayIsImR1ZURhdGVPYmoiLCJEYXRlIiwiZHVlRGF0ZSIsIk1hdGgiLCJhYnMiLCJub3ciLCJodG1sIiwiY3JlYXRlVGFza0hUTUwiLCJuYW1lIiwiY3JlYXRlUmVhZGFibGVEYXRlIiwiZHVlRGF0ZURheSIsImdldFVUQ0RhdGUiLCJkdWVEYXRlTW9udGgiLCJnZXRVVENNb250aCIsImR1ZURhdGVZZWFyIiwiZ2V0VVRDRnVsbFllYXIiLCJjdXJyZW50RGF5IiwiY3VycmVudE1vbnRoIiwiY3VycmVudFllYXIiLCJjb2x1bW5OYW1lIiwicmVhbGx5RGVsZXRlIiwiY29uZmlybSIsImtleXMiLCJsaXN0cyIsImxlbmd0aCIsImxvZ2ljIiwidXBkYXRlQ29sdW1uTmFtZSIsImFsZXJ0IiwidWwiLCJzb3J0ZWRMaXN0cyIsInNvcnQiLCJsaXN0MSIsImxpc3QyIiwibGlzdCIsImRpc3BsYXkiLCJ3aW5kb3ciLCJnZXRDb21wdXRlZFN0eWxlIiwic3R5bGUiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJpIiwiYXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidGFza1RleHRJbnB1dCIsImRldGFpbHNUZXh0YXJlYSIsIm5leHRFbGVtZW50U2libGluZyIsImRhdGVwaWNrZXIiLCJkZXRhaWxzIiwidmFsdWVBc051bWJlciIsInRhc2tOYW1lIiwidmFsdWVBc0RhdGUiLCJkdWVEYXRlSXNWYWxpZCIsInRhc2tJc05ldyIsImN1cnJlbnRUaW1lIiwiZHVlRGF0ZVZhbHVlQXNOdW1iZXIiLCJpc05hTiIsImRhdGVWYWx1ZUFzTnVtYmVyIiwiZGF0ZSIsIm1vbnRoIiwiZGF5IiwieWVhciIsImRvbUNvbnRyb2xsZXIiLCJMaXN0IiwidGFza3MiLCJuZXh0TGlzdElkIiwiTG9naWMiLCJUYXNrIiwibmV3TGlzdCIsImNob3JlcyIsIkNob3JlcyIsIm1ha2VDdXJyZW50TGlzdCIsImRhdGFGcm9tU3RvcmFnZSIsImZpcnN0TGlzdCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiY29uc29sZSIsImxvZyIsIndyaXRlT3ZlckN1cnJlbnRMaXN0IiwicGFyc2UiLCJnZXRJdGVtIiwic2V0RGVmYXVsdExpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVNQSxhO0FBRUYsMkJBQWU7QUFBQTs7QUFDWCxTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLEtBQWhDO0FBQ0g7Ozs7V0FFRCx5Q0FBZ0M7QUFDNUJDLGNBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsS0FBS0MsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBbkM7QUFDSDs7O1dBRUQscUJBQVlDLENBQVosRUFBZTtBQUNYO0FBQ1I7QUFDQTtBQUVRO0FBQ0EsVUFBSUMsTUFBSjtBQUVBO0FBQ1I7O0FBSVEsVUFBR0QsQ0FBQyxDQUFDQyxNQUFGLENB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V0FBTyxDQUFDQyxHQUFSLENBQVksMEJBQVo7QUFDQXRELFNBQUssQ0FBQzBELGNBQU47QUFDSDtBQUNKLENBYkQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDeEZNaEIsSSxHQUVGLGNBQVkzRCxJQUFaLEVBQWtCTixPQUFsQixFQUFpRDtBQUFBLE1BQXRCOEMsT0FBc0IsdUVBQVosRUFBWTtBQUFBLE1BQVJ4RSxNQUFROztBQUFBOztBQUM3QyxPQUFLZ0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsT0FBS04sT0FBTCxHQUFlQSxPQUFmO0FBQ0EsT0FBSzhDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUt4RSxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxDOzs7Ozs7OztVQ1BMO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFPQXNGLCtGQUFBLEciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvZ2ljLCBjdXJyZW50TGlzdCwgbGlzdHN9IGZyb20gJy4vTG9naWMnO1xuXG5jbGFzcyBEb21Db250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkgIHtcbiAgICAgICAgdGhpcy5vbGROYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5saXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplQ2xpY2tFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgIC8qIHdyaXRpbmcgdGhpcyBhcHBsaWNhdGlvbiB3YXMgYSBsZWFybmluZyBwcm9jZXNzLiAgSSBhdHRlbXB0ZWQgYW5kXG4gICAgICAgICAgICBzdWNjZWVkZWQgaW4gdXNpbmcgb25lIGV2ZW50IGxpc3RlbmVyIHdpdGggZGVsZWdhdGlvbiBmb3IgZXZlcnlcbiAgICAgICAgICAgIGNsaWNrIG9uIHRoZSBET00uICBkb2luZyBzbyByZXF1aXJlZCBhIGNvbXBsZXggc2V0IG9mIGNvbmRpdGlvbmFscy4qLyBcbiAgICAgICAgXG4gICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgdmFyaWFibGUgaXMgZGVjbGFyZWQgZm9yIHVzZSBpbiBjb25kaXRpb25hbCBzdGF0ZW1lbnRzXG4gICAgICAgIGxldCB0YXJnZXQ7XG5cbiAgICAgICAgLyp0aGUgdGFza0VkaXRvckhhbmRsZXIoKSB1c2VzIGEgZGF0ZS1waWNrZXIgZWxlbWVudCwgc28gZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGNhbm5vdCBiZSB1c2VkIHdpdGggaXQqL1xuICAgICAgXG4gICAgXG4gICAgICAgIFxuICAgICAgICBpZihlLnRhcmdldC5jbG9zZXN0KCdkaXZbY2xhc3M9XCJ0YXNrLWRhdGUtYnRuc1wiXScpICYmIGUudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ2ZhcyBmYS1lZGl0Jykge1xuICAgICAgICAgICAgLy9zdHJpa2VzIHRocnUgdGhlIG5hbWUgb2YgdGhlIHRhc2sgYW5kIHRoZSBkdWUgZGF0ZSBpZiBlaXRoZXIgb25lIGNsaWNrZWQgb25cbiAgICAgICAgICAgIGNvbnN0IHRhc2tUYXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdkaXZbY2xhc3M9XCJ0YXNrLWRhdGUtYnRuc1wiXScpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2RpdltjbGFzcz1cInRhc2stZGF0ZS1idG5zXCJdJykuY2hpbGRyZW5bMV0uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0cmlrZXRocnVUYXNrKHRhc2tUYXJnZXQsIGRhdGVUYXJnZXQpO1xuICAgICAgICB9IGVsc2UgaWYoZS50YXJnZXQuY2xvc2VzdCgnaScpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdpJyk7XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctbGlzdC1jYW5jZWwtYnRuJykpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctbGlzdC1zdWJtaXQtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0VGV4dElucHV0ID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0TmFtZSA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdMaXN0U3VibWl0QnRuSGFuZGxlcih0YXJnZXQsIGxpc3ROYW1lLCBsaXN0VGV4dElucHV0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWxpc3QtaWNvbicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRMaXN0SWNvbkhhbmRsZXIobGlzdE5hbWUsIGxpc3RJdGVtKTsgXG4gICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1saXN0LXN1Ym1pdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIC8qIHRoaXMgYnRuIGlzIGlkZW50aWNhbCB0byB0aGUgJ25ldy1saXN0LXN1Ym1pdC1idG4nLCBidXQgXG4gICAgICAgICAgICAgICAgc3Vic3RpdHV0ZXMgaXQgd2hlbiBhbiBleGlzdGluZyBsaXN0IGlzIGN1cnJlbnRseSBiZWluZyBlZGl0ZWQgKi9cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZihuZXdOYW1lID09PSB0aGlzLm9sZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgIHRleHRJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRMaXN0U3VibWl0QnRuSGFuZGxlcihuZXdOYW1lLCB0ZXh0SW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1jYW5jZWwtYnRuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RDdXJyZW50bHlCZWluZ0VkaXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnZmFyIGZhLXRyYXNoLWFsdCBsaXN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlTGlzdEhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihlLnRhcmdldC5jbG9zZXN0KCdidXR0b24sIGxpJykpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdidXR0b24sIGxpJyk7XG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51QnRuSGFuZGxlcihtZW51KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkOyAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tFZGl0b3JIYW5kbGVyKHRhc2tFZGl0b3IsIHRhc2tJZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2stc3VibWl0LWJ0bicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0VkaXRvciA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAndGFzay1kZWxldGUtYnRuJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdjYW5jZWwtbmV3LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtbGlzdC1idG4nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZExpc3RCdG5IYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbiwgbGknKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICduZXctdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0VkaXRvciA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtbGlzdC1idG4nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZExpc3RCdG5IYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdsaXN0IG1lbnUtYnRuJyAmJiAhdGFyZ2V0LmNoaWxkcmVuWzFdLm1hdGNoZXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VMaXN0SGFuZGxlcihsaXN0TmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdtZW51LWJ0biBhbGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuIHRvZGF5Jykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdPbmx5VG9kYXkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuIHdlZWsnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld09ubHlXZWVrKCk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTdHJpa2V0aHJ1VGFzayh0YXNrVGFyZ2V0LCBkYXRlVGFyZ2V0KSB7XG4gICAgICAgIHRhc2tUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnc3RyaWtldGhydScpO1xuICAgICAgICBkYXRlVGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3N0cmlrZXRocnUnKTtcbiAgICB9XG5cbiAgICB2aWV3T25seVdlZWsoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpLmZpbHRlcih0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVPYmogPSBuZXcgRGF0ZSh0YXNrLmR1ZURhdGUpO1xuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoRGF0ZS5ub3coKSAtIGR1ZURhdGVPYmopIDw9IDYuMDQ4ZTgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLnRhc2tJZCwgdGFzay5uYW1lLCB0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVRhc2tIVE1MKHRhc2tJZCwgbmFtZSwgZHVlRGF0ZSkge1xuICAgICAgICBjb25zdCBodG1sID0gYDxsaSBjbGFzcz1cInRvZG8taXRlbVwiIGRhdGEtaWQ9XCIke3Rhc2tJZH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZGF0ZS1idG5zXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhc2tcIj4ke25hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGUtYW5kLWJ0bnNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImR1ZS1kYXRlXCI+JHt0aGlzLmNyZWF0ZVJlYWRhYmxlRGF0ZShkdWVEYXRlKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPjwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRhc2stZWRpdG9yIGhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIiBtZXRob2Q9XCJnZXRcIiBjbGFzcz1cInRhc2stZWRpdG9yLWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRhc2stZmllbGRcIiBuYW1lPVwidGFza1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUYXNrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImRlc2NyaXB0aW9uLWZpZWxkXCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXRhaWxzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWFkZGJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImRhdGUtcGlja2VyXCIgbmFtZT1cImR1ZS1kYXRlXCIgdHlwZT1cImRhdGVcIiByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrLWRlbGV0ZS1idG5cIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1zdWJtaXQtYnRuXCI+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+YDtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuXG4gICAgdmlld09ubHlUb2RheSgpIHtcbiAgICAgICAgY29uc3QgdWxGb3JUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGUtdGFzay1pdGVtcycpO1xuICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZU9iaiA9IG5ldyBEYXRlKHRhc2suZHVlRGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlRGF5ID0gZHVlRGF0ZU9iai5nZXRVVENEYXRlKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlTW9udGggPSBkdWVEYXRlT2JqLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlWWVhciA9IGR1ZURhdGVPYmouZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBuZXcgRGF0ZSgpLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IG5ldyBEYXRlKCkuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRVVENGdWxsWWVhcigpO1xuXG4gICAgICAgICAgICBpZiAoZHVlRGF0ZURheSA9PT0gY3VycmVudERheSAmJiBkdWVEYXRlTW9udGggPT09IGN1cnJlbnRNb250aCAmJiBkdWVEYXRlWWVhciA9PT0gY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLnRhc2tJZCwgdGFzay5uYW1lLCB0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUNvbHVtbk5hbWUoKSB7XG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1jb2x1bW4tbmFtZScpO1xuICAgICAgICBjb2x1bW5OYW1lLnRleHRDb250ZW50ID0gY3VycmVudExpc3QubmFtZTtcbiAgICB9XG5cbiBcblxuICAgIGRlbGV0ZUxpc3RIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLmxpc3RDdXJyZW50bHlCZWluZ0VkaXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCByZWFsbHlEZWxldGUgPSBjb25maXJtKGBBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgdGhlICR7dGhpcy5vbGROYW1lfSBsaXN0IGFuZCBhbGwgYXNzb2NpYXRlZCB0YXNrcz9gKTtcbiAgICAgICAgaWYocmVhbGx5RGVsZXRlKSB7XG4gICAgICAgICAgICBpZihPYmplY3Qua2V5cyhsaXN0cykubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGxvZ2ljLmRlbGV0ZUxpc3QodGhpcy5vbGROYW1lKTtcbiAgICAgICAgICAgICAgICBsb2dpYy5zZXRDdXJyZW50TGlzdFRvQVJlbWFpbmluZ0xpc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29sdW1uTmFtZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGRlbGV0ZSB5b3VyIG9ubHkgbGlzdCEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVMaXN0QnRuSGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgcmVhbGx5RGVsZXRlID0gY29uZmlybShgQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSAke3RoaXMub2xkTmFtZX0gbGlzdCBhbmQgYWxsIG9mIGl0J3MgYXNzb2NpYXRlZCB0YXNrcz9gKTtcbiAgICAgICAgaWYocmVhbGx5RGVsZXRlKSB7XG4gICAgICAgICAgICBkZWxldGUgbGlzdHNbdGhpcy5vbGROYW1lXTtcbiAgICAgICAgICAgIGlmKE9iamVjdC5rZXlzKGxpc3RzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBsb2dpYy5zZXRDdXJyZW50eUxpc3QgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHsgbG9naWMuc2V0TmV4dExpc3RBc0N1cnJlbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTsgICBcbiAgICAgICAgfSBlbHNlIHRoaXMucmVuZGVyTGlzdHMoKTtcblxuICAgIH1cblxuICAgIGVkaXRMaXN0U3VibWl0QnRuSGFuZGxlcihuZXdOYW1lLCB0ZXh0SW5wdXQpIHtcbiAgICAgICAgaWYobmV3TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRleHRJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdEN1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgICAgIGxvZ2ljLm1vZGlmeUxpc3ROYW1lKG9sZE5hbWUsIG5ld05hbWUpO1xuICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdEhhbmRsZXIobmV3TmFtZSk7XG4gICAgfVxuXG4gICAgZWRpdExpc3RJY29uSGFuZGxlcihsaXN0TmFtZSwgbGlzdEl0ZW0pIHtcbiAgICAgICAgLyogaWYgYW5vdGhlciBsaXN0IGlzIGJlaW5nIGVkaXR0ZWQsIHdvbid0IGFsbG93IGFub3RoZXIgdG8gYmUgZWRpdHRlZFxuICAgICAgICB1bnRpbCB0aGUgZmlyc3Qgb25lIGlzIGZpbmlzaGVkICovXG4gICAgICAgIGlmICh0aGlzLmxpc3RDdXJyZW50bHlCZWluZ0VkaXRlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmxpc3RDdXJyZW50bHlCZWluZ0VkaXRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub2xkTmFtZSA9IGxpc3ROYW1lO1xuICAgICAgICBjb25zdCBodG1sID0gYDxpIGNsYXNzPVwiZmFzIGZhLWxpc3QtYWx0XCI+PC9pPjxpbnB1dCBjbGFzcz1cIm5ldy1saXN0LXRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHtsaXN0TmFtZX1cIiAvPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdCBsaXN0XCI+PC9pPjxpIGNsYXNzPVwiZmFyIGZhLXRpbWVzLWNpcmNsZSBlZGl0LWxpc3QtY2FuY2VsLWJ0blwiPjwvaT48aSBjbGFzcz1cImZhciBmYS1jaGVjay1jaXJjbGUgZWRpdC1saXN0LXN1Ym1pdC1idG5cIj48L2k+YDtcbiAgICAgICAgbGlzdEl0ZW0uaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9XG5cbiAgICBjaGFuZ2VMaXN0SGFuZGxlcihsaXN0TmFtZSkge1xuICAgICAgICBsb2dpYy5tYWtlQ3VycmVudExpc3QobGlzdE5hbWUpO1xuICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1jb2x1bW4tbmFtZScpO1xuICAgICAgICBjb2x1bW5OYW1lLnRleHRDb250ZW50ID0gbGlzdE5hbWU7XG4gICAgfVxuXG5cbiAgICBuZXdMaXN0U3VibWl0QnRuSGFuZGxlcih0YXJnZXQsIGxpc3ROYW1lLCBsaXN0VGV4dElucHV0KSB7XG4gICAgICAgIGlmKGxpc3ROYW1lID09PSAnJykge1xuICAgICAgICAgICAgbGlzdFRleHRJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2ljLmNyZWF0ZU5ld0xpc3QobGlzdE5hbWUpO1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICB0aGlzLmNoYW5nZUxpc3RIYW5kbGVyKGxpc3ROYW1lKTtcbiAgICB9XG5cbiAgICByZW5kZXJMaXN0cygpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWwtbGlzdC1vZi1saXN0cycpO1xuICAgICAgICBsZXQgaHRtbCA9ICcnO1xuICAgICAgICBjb25zdCBzb3J0ZWRMaXN0cyA9IE9iamVjdC52YWx1ZXMobGlzdHMpLnNvcnQoKGxpc3QxLCBsaXN0MikgPT4ge1xuICAgICAgICAgICAgaWYobGlzdDEuaWQgPiBsaXN0Mi5pZCkgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAobGlzdDEuaWQgPT09IGxpc3QyLmlkKSByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmIChsaXN0MS5pZCA8IGxpc3QyLmlkKSByZXR1cm4gLTE7XG4gICAgICAgIH0pOyBcbiAgICAgICAgZm9yIChjb25zdCBsaXN0IG9mIHNvcnRlZExpc3RzKSB7XG4gICAgICAgICAgICBodG1sICs9IGA8bGkgY2xhc3M9XCJsaXN0IG1lbnUtYnRuXCI+PGkgY2xhc3M9XCJmYXMgZmEtbGlzdC1hbHQgZWRpdC1saXN0LWljb25cIj48L2k+JHtsaXN0Lm5hbWV9PHNwYW4gY2xhc3M9XCJlZGl0LWxpc3QtaWNvblwiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXQgZWRpdC1saXN0LWljb25cIj48L2k+PC9zcGFuPjwvbGk+YDtcbiAgICAgICAgfVxuICAgICAgICB1bC5pbm5lckhUTUwgPSBodG1sO1xuICAgIH1cblxuICAgIG1lbnVCdG5IYW5kbGVyKG1lbnUpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1lbnUpLmRpc3BsYXk7XG4gICAgICAgIGlmKGRpc3BsYXkgPT09ICdub25lJyl7XG4gICAgICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGFkZExpc3RCdG5IYW5kbGVyKCkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bC1saXN0LW9mLWxpc3RzJyk7XG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnbGlzdCcsICdtZW51LWJ0bicpO1xuICAgICAgICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBpLmNsYXNzTGlzdC5hZGQoJ2ZhcycsICdmYS1saXN0LWFsdCcpO1xuICAgICAgICBsaS5hcHBlbmQoaSk7XG4gICAgICAgIGNvbnN0IHRleHRJbnB1dCA9IGA8aW5wdXQgY2xhc3M9XCJuZXctbGlzdC10ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiAvPjxpIGNsYXNzPVwiZmFyIGZhLXRpbWVzLWNpcmNsZSBuZXctbGlzdC1jYW5jZWwtYnRuXCI+PC9pPjxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLWNpcmNsZSBuZXctbGlzdC1zdWJtaXQtYnRuXCI+PC9pPmA7XG4gICAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGV4dElucHV0KTtcbiAgICAgICAgdWwuYXBwZW5kKGxpKTtcbiAgICB9XG5cbiAgICB0YXNrRGVsZXRlQnRuSGFuZGxlcih0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdGFza0lkID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDtcbiAgICAgICAgbG9naWMuZGVsZXRlVGFzayh0YXNrSWQpO1xuICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgfVxuXG4gICAgdGFza0VkaXRvckhhbmRsZXIodGFza0VkaXRvciwgdGFza0lkKSB7XG4gICAgICAgIHRhc2tFZGl0b3IuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIGNvbnN0IHRhc2tUZXh0SW5wdXQgPSB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBjb25zdCBkZXRhaWxzVGV4dGFyZWEgPSB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgY29uc3QgZGF0ZXBpY2tlciA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBcbiAgICAgICAgdGFza1RleHRJbnB1dC52YWx1ZSA9IGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tJZF0ubmFtZTtcbiAgICAgXG4gICAgICAgIGRldGFpbHNUZXh0YXJlYS52YWx1ZSA9IGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tJZF0uZGV0YWlscztcbiAgICAgICAgZGF0ZXBpY2tlci52YWx1ZUFzTnVtYmVyID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5kdWVEYXRlO1xuICAgIH1cblxuICAgIGVkaXRUYXNrU3VibWl0QnRuSGFuZGxlcih0YXJnZXQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblswXS52YWx1ZTtcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMV0udmFsdWU7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzJdLmZpcnN0RWxlbWVudENoaWxkLnZhbHVlQXNEYXRlO1xuXG4gICAgICAgIGlmKCF0aGlzLmR1ZURhdGVJc1ZhbGlkKGR1ZURhdGUpKXtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0YXNrTmFtZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGFza05hbWUgJiYgdGhpcy5kdWVEYXRlSXNWYWxpZChkdWVEYXRlKSkge1xuICAgICAgICAgICAgY29uc3QgdGFza0lzTmV3ID0gKHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc05hbWUgPT09ICduZXctdGFzay1lZGl0b3InKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTsgLy93aWxsIHVzZSBjdXJyZW50VGltZSBhcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGZvciBlYWNoIHRhc2tcblxuICAgICAgICAgICAgaWYodGFza0lzTmV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IGxvZ2ljLmNyZWF0ZU5ld1Rhc2sodGFza05hbWUsIGR1ZURhdGUsIGRldGFpbHMsIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgICAgICBsb2dpYy5hZGRUYXNrVG9DdXJyZW50TGlzdCh0YXNrKTsgLy9oZXJlP1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCF0YXNrSXNOZXcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xuICAgICAgICAgICAgICAgIGxvZ2ljLm1vZGlmeVRhc2sodGFza05hbWUsIGR1ZURhdGUsIGRldGFpbHMsIHRhc2tJZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGFza0VkaXRvciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGlmKHRhc2tFZGl0b3IuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stZWRpdG9yJykge1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW5bMV0udmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkdWVEYXRlSXNWYWxpZChkdWVEYXRlVmFsdWVBc051bWJlcikge1xuICAgICAgICBpZihpc05hTihkdWVEYXRlVmFsdWVBc051bWJlcikpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY2FuY2VsTmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcikge1xuICAgICAgICBuZXdUYXNrRWRpdG9yLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIG5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpIHtcbiAgICAgICAgbmV3VGFza0VkaXRvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICByZW5kZXJUYXNrcygpIHtcbiAgICAgICAgY29uc3QgdWxGb3JUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGUtdGFzay1pdGVtcycpO1xuICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBpZihjdXJyZW50TGlzdCA9PT0gbnVsbCkgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLnRhc2tJZCwgdGFzay5uYW1lLCB0YXNrLmR1ZURhdGUpOyAvL2hlcmVcbiAgICAgICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVSZWFkYWJsZURhdGUoZGF0ZVZhbHVlQXNOdW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVWYWx1ZUFzTnVtYmVyKTtcbiAgICAgICAgY29uc3QgbW9udGggPSBkYXRlLmdldFVUQ01vbnRoKCkgKyAxO1xuICAgICAgICBjb25zdCBkYXkgPSBkYXRlLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZG9tQ29udHJvbGxlciA9IG5ldyBEb21Db250cm9sbGVyKCk7XG5cblxuXG4vL2lzc3Vlcy4gIGNhbid0IGdldCB0YXNrIG5hbWUgdG8gd3JhcCBhdCA1MCU7IiwiY2xhc3MgTGlzdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgaWQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50YXNrcyA9IHt9O1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgfVxufVxuXG5leHBvcnQgeyBMaXN0IH07IiwiaW1wb3J0IHtUYXNrfSBmcm9tICcuL1Rhc2snO1xuaW1wb3J0IHtMaXN0fSBmcm9tICcuL0xpc3QnO1xuaW1wb3J0IHsgZG9tQ29udHJvbGxlciB9IGZyb20gJy4vRG9tQ29udHJvbGxlcic7XG5cbmxldCBjdXJyZW50TGlzdDtcbmxldCBuZXh0TGlzdElkID0gMDtcblxubGV0IGxpc3RzID0ge307XG5cblxuY2xhc3MgTG9naWMge1xuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIGNyZWF0ZU5ld1Rhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9IFwiXCIsIHRhc2tJZCkge1xuICAgICAgICByZXR1cm4gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgdGFza0lkKTtcbiAgICB9XG5cbiAgICBhZGRUYXNrVG9DdXJyZW50TGlzdCh0YXNrKSB7XG4gICAgICAgIGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2sudGFza0lkXSA9IHRhc2s7XG4gICAgfVxuXG4gICAgbW9kaWZ5VGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gJycsIHRhc2tJZCkge1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykpIHtcbiAgICAgICAgICAgIGlmKHRhc2sudGFza0lkID09IHRhc2tJZCkge1xuICAgICAgICAgICAgICAgIHRhc2submFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgdGFzay5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICB0YXNrLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVsZXRlVGFzayh0YXNrKSB7XG4gICAgICAgIGRlbGV0ZSBjdXJyZW50TGlzdC50YXNrc1t0YXNrXTtcbiAgICB9XG5cbiAgICBjcmVhdGVOZXdMaXN0KG5hbWUpIHtcbiAgICAgICAgY29uc3QgbmV3TGlzdCA9IG5ldyBMaXN0KG5hbWUsIG5leHRMaXN0SWQrKyk7XG4gICAgICAgIGxpc3RzW25hbWVdID0gbmV3TGlzdDtcbiAgICB9XG5cbiAgICBtb2RpZnlMaXN0TmFtZShvbGROYW1lLCBuZXdOYW1lKSB7XG4gICAgICAgIGxpc3RzW25ld05hbWVdID0gbGlzdHNbb2xkTmFtZV07XG4gICAgICAgIGRlbGV0ZSBsaXN0c1tvbGROYW1lXTtcbiAgICAgICAgbGlzdHNbbmV3TmFtZV0ubmFtZSA9IG5ld05hbWU7XG4gICAgfVxuXG4gICAgXG4gICAgc2V0RGVmYXVsdExpc3QoKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhsaXN0cykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBjaG9yZXMgPSBuZXcgTGlzdCgnQ2hvcmVzJywgbmV4dExpc3RJZCsrKTtcbiAgICAgICAgICAgIGxpc3RzLkNob3JlcyA9IGNob3JlcztcbiAgICAgICAgICAgIHRoaXMubWFrZUN1cnJlbnRMaXN0KCdDaG9yZXMnKTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBtYWtlQ3VycmVudExpc3QobGlzdE5hbWUpIHtcbiAgICAgICAgY3VycmVudExpc3QgPSBsaXN0c1tsaXN0TmFtZV07XG4gICAgfVxuXG4gICAgd3JpdGVPdmVyQ3VycmVudExpc3QoZGF0YUZyb21TdG9yYWdlKSB7XG4gICAgICAgIGN1cnJlbnRMaXN0ID0gZGF0YUZyb21TdG9yYWdlO1xuICAgIH1cblxuICAgIHNldEN1cnJlbnRMaXN0VG9BUmVtYWluaW5nTGlzdCgpIHtcbiAgICAgICAgY29uc3QgZmlyc3RMaXN0ID0gT2JqZWN0LmtleXMobGlzdHMpWzBdO1xuICAgICAgICB0aGlzLm1ha2VDdXJyZW50TGlzdChmaXJzdExpc3QpO1xuICAgIH1cblxuICAgIGRlbGV0ZUxpc3QobGlzdE5hbWUpIHtcbiAgICAgICAgZGVsZXRlIGxpc3RzW2xpc3ROYW1lXTtcbiAgICB9XG5cblxuICAgXG59XG5cbmNvbnN0IGxvZ2ljID0gbmV3IExvZ2ljKCk7XG5cbiAgICBcblxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRMaXN0JywgSlNPTi5zdHJpbmdpZnkoY3VycmVudExpc3QpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGlzdHMnLCBKU09OLnN0cmluZ2lmeShsaXN0cykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduZXh0TGlzdElkJywgSlNPTi5zdHJpbmdpZnkobmV4dExpc3RJZCkpO1xufSlcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmKE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlcyBzdHVmZiBpbiBsb2NhbCBzdG9yYWdlJyk7XG4gICAgICAgICAgICBsb2dpYy53cml0ZU92ZXJDdXJyZW50TGlzdChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50TGlzdCcpKSk7XG4gICAgICAgICAgICBsaXN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpc3RzJykpO1xuICAgICAgICAgICAgbmV4dExpc3RJZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25leHRMaXN0SWQnKSk7XG4gICAgICAgICAgICBkb21Db250cm9sbGVyLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICBkb21Db250cm9sbGVyLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICBkb21Db250cm9sbGVyLnVwZGF0ZUNvbHVtbk5hbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnbm90aGluZyBpbiBsb2NhbCBzdG9yYWdlJyk7XG4gICAgICAgIGxvZ2ljLnNldERlZmF1bHRMaXN0KCk7XG4gICAgfVxufSlcblxuXG5leHBvcnQge2N1cnJlbnRMaXN0LCBsaXN0cywgbG9naWMsIG5leHRMaXN0SWR9O1xuIiwiY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gXCJcIiwgdGFza0lkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgICAgIHRoaXMudGFza0lkID0gdGFza0lkO1xuICAgIH1cblxuXG5cbn1cblxuZXhwb3J0IHsgVGFzayB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtkb21Db250cm9sbGVyfSBmcm9tICcuL21vZHVsZXMvRG9tQ29udHJvbGxlcic7XG5cblxuXG5cblxuXG5kb21Db250cm9sbGVyLmluaXRpYWxpemVDbGlja0V2ZW50TGlzdGVuZXJzKCk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9
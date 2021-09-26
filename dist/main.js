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


var oldName;

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

      if (e.target.closest('button, li')) {
        target = e.target.closest('button, li');

        if (target.className === 'edit-task-btn') {
          var taskEditor = target.parentElement.parentElement.parentElement.children[1];
          var taskId = target.parentElement.parentElement.parentElement.dataset.id;
          this.taskEditorHandler(taskEditor, taskId);
        }
      }

      e.preventDefault();

      if (e.target.closest('div[class="task-date-btns"]') && e.target.className !== 'fas fa-edit') {
        //strikes thru the name of the task and the due date if either one clicked on
        var taskTarget = e.target.closest('div[class="task-date-btns"]').firstElementChild;
        var dateTarget = e.target.closest('div[class="task-date-btns"]').children[1].firstElementChild;
        this.toggleStrikethruTask(taskTarget, dateTarget);
      } else if (e.target.closest('i')) {
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

          if (newName === oldName) {
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

        if (target.className === 'new-task-btn') {
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
      var reallyDelete = confirm("Are you sure that you want to delete the ".concat(oldName, " list and all associated tasks?"));

      if (reallyDelete) {
        if (Object.keys(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).length > 1) {
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
  }, {
    key: "deleteListBtnHandler",
    value: function deleteListBtnHandler() {
      var reallyDelete = confirm("Are you sure that you want to delete the ".concat(oldName, " list and all of it's associated tasks?"));

      if (reallyDelete) {
        delete _Logic__WEBPACK_IMPORTED_MODULE_0__.lists[oldName];

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
      oldName = listName;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsib2xkTmFtZSIsIkRvbUNvbnRyb2xsZXIiLCJsaXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGljayIsImJpbmQiLCJlIiwidGFyZ2V0IiwiY2xvc2VzdCIsImNsYXNzTmFtZSIsInRhc2tFZGl0b3IiLCJwYXJlbnRFbGVtZW50IiwiY2hpbGRyZW4iLCJ0YXNrSWQiLCJkYXRhc2V0IiwiaWQiLCJ0YXNrRWRpdG9ySGFuZGxlciIsInByZXZlbnREZWZhdWx0IiwidGFza1RhcmdldCIsImZpcnN0RWxlbWVudENoaWxkIiwiZGF0ZVRhcmdldCIsInRvZ2dsZVN0cmlrZXRocnVUYXNrIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCJsaXN0VGV4dElucHV0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxpc3ROYW1lIiwidmFsdWUiLCJuZXdMaXN0U3VibWl0QnRuSGFuZGxlciIsImxpc3RJdGVtIiwidGV4dENvbnRlbnQiLCJlZGl0TGlzdEljb25IYW5kbGVyIiwidGV4dElucHV0IiwibmV3TmFtZSIsImZvY3VzIiwiZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyIiwicmVuZGVyTGlzdHMiLCJkZWxldGVMaXN0SGFuZGxlciIsIm1lbnUiLCJxdWVyeVNlbGVjdG9yIiwibWVudUJ0bkhhbmRsZXIiLCJlZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIiLCJuZXdUYXNrRWRpdG9yIiwibmV3VGFza0J0bkhhbmRsZXIiLCJ0YXNrRGVsZXRlQnRuSGFuZGxlciIsImNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyIiwiYWRkTGlzdEJ0bkhhbmRsZXIiLCJtYXRjaGVzIiwiY2hpbGROb2RlcyIsImNoYW5nZUxpc3RIYW5kbGVyIiwicmVuZGVyVGFza3MiLCJ2aWV3T25seVRvZGF5Iiwidmlld09ubHlXZWVrIiwidG9nZ2xlIiwidWxGb3JUYXNrcyIsImlubmVySFRNTCIsIk9iamVjdCIsInZhbHVlcyIsImN1cnJlbnRMaXN0IiwiZmlsdGVyIiwidGFzayIsImR1ZURhdGVPYmoiLCJEYXRlIiwiZHVlRGF0ZSIsIk1hdGgiLCJhYnMiLCJub3ciLCJodG1sIiwiY3JlYXRlVGFza0hUTUwiLCJuYW1lIiwiY3JlYXRlUmVhZGFibGVEYXRlIiwiZHVlRGF0ZURheSIsImdldFVUQ0RhdGUiLCJkdWVEYXRlTW9udGgiLCJnZXRVVENNb250aCIsImR1ZURhdGVZZWFyIiwiZ2V0VVRDRnVsbFllYXIiLCJjdXJyZW50RGF5IiwiY3VycmVudE1vbnRoIiwiY3VycmVudFllYXIiLCJjb2x1bW5OYW1lIiwicmVhbGx5RGVsZXRlIiwiY29uZmlybSIsImtleXMiLCJsaXN0cyIsImxlbmd0aCIsImxvZ2ljIiwidXBkYXRlQ29sdW1uTmFtZSIsImFsZXJ0IiwidWwiLCJzb3J0ZWRMaXN0cyIsInNvcnQiLCJsaXN0MSIsImxpc3QyIiwibGlzdCIsImRpc3BsYXkiLCJ3aW5kb3ciLCJnZXRDb21wdXRlZFN0eWxlIiwic3R5bGUiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJpIiwiYXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidGFza1RleHRJbnB1dCIsImRldGFpbHNUZXh0YXJlYSIsIm5leHRFbGVtZW50U2libGluZyIsImRhdGVwaWNrZXIiLCJkZXRhaWxzIiwidmFsdWVBc051bWJlciIsInRhc2tOYW1lIiwidmFsdWVBc0RhdGUiLCJkdWVEYXRlSXNWYWxpZCIsInRhc2tJc05ldyIsImN1cnJlbnRUaW1lIiwiZHVlRGF0ZVZhbHVlQXNOdW1iZXIiLCJpc05hTiIsImRhdGVWYWx1ZUFzTnVtYmVyIiwiZGF0ZSIsIm1vbnRoIiwiZGF5IiwieWVhciIsImRvbUNvbnRyb2xsZXIiLCJMaXN0IiwidGFza3MiLCJuZXh0TGlzdElkIiwiTG9naWMiLCJUYXNrIiwibmV3TGlzdCIsImNob3JlcyIsIkNob3JlcyIsIm1ha2VDdXJyZW50TGlzdCIsImRhdGFGcm9tU3RvcmFnZSIsImZpcnN0TGlzdCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiY29uc29sZSIsImxvZyIsIndyaXRlT3ZlckN1cnJlbnRMaXN0IiwicGFyc2UiLCJnZXRJdGVtIiwic2V0RGVmYXVsdExpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBSUEsT0FBSjs7SUFHTUMsYTtBQUVGLDJCQUFlO0FBQUE7O0FBQ1gsU0FBS0QsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLRSx3QkFBTCxHQUFnQyxLQUFoQztBQUNIOzs7O1dBRUQseUNBQWdDO0FBQzVCQyxjQUFRLENBQUNDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEtBQUtDLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLElBQXRCLENBQW5DO0FBQ0g7OztXQUVELHFCQUFZQyxDQUFaLEVBQWU7QUFDWDtBQUNSO0FBQ0E7QUFFUTtBQUNBLFVBQUlDLE1BQUo7QUFFQTtBQUNSOztBQUNRLFVBQUdELENB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UCxHQVJELE1BUU87QUFDSGdCLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLDBCQUFaO0FBQ0F0RCxTQUFLLENBQUMwRCxjQUFOO0FBQ0g7QUFDSixDQWJEOzs7Ozs7Ozs7Ozs7Ozs7OztJQ3hGTWhCLEksR0FFRixjQUFZM0QsSUFBWixFQUFrQk4sT0FBbEIsRUFBaUQ7QUFBQSxNQUF0QjhDLE9BQXNCLHVFQUFaLEVBQVk7QUFBQSxNQUFSakcsTUFBUTs7QUFBQTs7QUFDN0MsT0FBS3lELElBQUwsR0FBWUEsSUFBWjtBQUNBLE9BQUtOLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUs4QyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLakcsTUFBTCxHQUFjQSxNQUFkO0FBQ0gsQzs7Ozs7Ozs7VUNQTDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05BO0FBT0ErRywrRkFBQSxHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2dpYywgY3VycmVudExpc3QsIGxpc3RzfSBmcm9tICcuL0xvZ2ljJztcblxubGV0IG9sZE5hbWU7XG5cblxuY2xhc3MgRG9tQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpICB7XG4gICAgICAgIHRoaXMub2xkTmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGlzdEN1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICAvKiB3cml0aW5nIHRoaXMgYXBwbGljYXRpb24gd2FzIGEgbGVhcm5pbmcgcHJvY2Vzcy4gIEkgYXR0ZW1wdGVkIGFuZFxuICAgICAgICAgICAgc3VjY2VlZGVkIGluIHVzaW5nIG9uZSBldmVudCBsaXN0ZW5lciB3aXRoIGRlbGVnYXRpb24gZm9yIGV2ZXJ5XG4gICAgICAgICAgICBjbGljayBvbiB0aGUgRE9NLiAgZG9pbmcgc28gcmVxdWlyZWQgYSBjb21wbGV4IHNldCBvZiBjb25kaXRpb25hbHMuKi8gXG4gICAgICAgIFxuICAgICAgICAvLyB0aGUgZm9sbG93aW5nIHZhcmlhYmxlIGlzIGRlY2xhcmVkIGZvciB1c2UgaW4gY29uZGl0aW9uYWwgc3RhdGVtZW50c1xuICAgICAgICBsZXQgdGFyZ2V0O1xuXG4gICAgICAgIC8qdGhlIHRhc2tFZGl0b3JIYW5kbGVyKCkgdXNlcyBhIGRhdGUtcGlja2VyIGVsZW1lbnQsIHNvIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjYW5ub3QgYmUgdXNlZCB3aXRoIGl0Ki9cbiAgICAgICAgaWYoZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBsaScpKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdidXR0b24sIGxpJyk7XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnZWRpdC10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkOyAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMudGFza0VkaXRvckhhbmRsZXIodGFza0VkaXRvciwgdGFza0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJ2RpdltjbGFzcz1cInRhc2stZGF0ZS1idG5zXCJdJykgJiYgZS50YXJnZXQuY2xhc3NOYW1lICE9PSAnZmFzIGZhLWVkaXQnKSB7XG4gICAgICAgICAgICAvL3N0cmlrZXMgdGhydSB0aGUgbmFtZSBvZiB0aGUgdGFzayBhbmQgdGhlIGR1ZSBkYXRlIGlmIGVpdGhlciBvbmUgY2xpY2tlZCBvblxuICAgICAgICAgICAgY29uc3QgdGFza1RhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2RpdltjbGFzcz1cInRhc2stZGF0ZS1idG5zXCJdJykuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICBjb25zdCBkYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnZGl2W2NsYXNzPVwidGFzay1kYXRlLWJ0bnNcIl0nKS5jaGlsZHJlblsxXS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RyaWtldGhydVRhc2sodGFza1RhcmdldCwgZGF0ZVRhcmdldCk7XG4gICAgICAgIH0gZWxzZSBpZihlLnRhcmdldC5jbG9zZXN0KCdpJykpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2knKTtcbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1saXN0LWNhbmNlbC1idG4nKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1saXN0LXN1Ym1pdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RUZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1pY29uJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RJY29uSGFuZGxlcihsaXN0TmFtZSwgbGlzdEl0ZW0pOyBcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWxpc3Qtc3VibWl0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgLyogdGhpcyBidG4gaXMgaWRlbnRpY2FsIHRvIHRoZSAnbmV3LWxpc3Qtc3VibWl0LWJ0bicsIGJ1dCBcbiAgICAgICAgICAgICAgICBzdWJzdGl0dXRlcyBpdCB3aGVuIGFuIGV4aXN0aW5nIGxpc3QgaXMgY3VycmVudGx5IGJlaW5nIGVkaXRlZCAqL1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRJbnB1dCA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdOYW1lID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKG5ld05hbWUgPT09IG9sZE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgIHRleHRJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRMaXN0U3VibWl0QnRuSGFuZGxlcihuZXdOYW1lLCB0ZXh0SW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1jYW5jZWwtYnRuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RDdXJyZW50bHlCZWluZ0VkaXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnZmFyIGZhLXRyYXNoLWFsdCBsaXN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlTGlzdEhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihlLnRhcmdldC5jbG9zZXN0KCdidXR0b24sIGxpJykpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdidXR0b24sIGxpJyk7XG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51QnRuSGFuZGxlcihtZW51KTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzay1zdWJtaXQtYnRuJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRUYXNrU3VibWl0QnRuSGFuZGxlcih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICd0YXNrLWRlbGV0ZS1idG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFza0RlbGV0ZUJ0bkhhbmRsZXIodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NhbmNlbC1uZXctdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsTmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1saXN0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTGlzdEJ0bkhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBsaScpO1xuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtbGlzdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTGlzdEJ0bkhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbGlzdCBtZW51LWJ0bicgJiYgIXRhcmdldC5jaGlsZHJlblsxXS5tYXRjaGVzKCdpbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUxpc3RIYW5kbGVyKGxpc3ROYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4gYWxsJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4gdG9kYXknKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3T25seVRvZGF5KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuIHdlZWsnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3T25seVdlZWsoKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTdHJpa2V0aHJ1VGFzayh0YXNrVGFyZ2V0LCBkYXRlVGFyZ2V0KSB7XG4gICAgICAgIHRhc2tUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnc3RyaWtldGhydScpO1xuICAgICAgICBkYXRlVGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3N0cmlrZXRocnUnKTtcbiAgICB9XG5cbiAgICB2aWV3T25seVdlZWsoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpLmZpbHRlcih0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVPYmogPSBuZXcgRGF0ZSh0YXNrLmR1ZURhdGUpO1xuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoRGF0ZS5ub3coKSAtIGR1ZURhdGVPYmopIDw9IDYuMDQ4ZTgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLnRhc2tJZCwgdGFzay5uYW1lLCB0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVRhc2tIVE1MKHRhc2tJZCwgbmFtZSwgZHVlRGF0ZSkge1xuICAgICAgICBjb25zdCBodG1sID0gYDxsaSBjbGFzcz1cInRvZG8taXRlbVwiIGRhdGEtaWQ9XCIke3Rhc2tJZH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZGF0ZS1idG5zXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhc2tcIj4ke25hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGUtYW5kLWJ0bnNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImR1ZS1kYXRlXCI+JHt0aGlzLmNyZWF0ZVJlYWRhYmxlRGF0ZShkdWVEYXRlKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPjwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRhc2stZWRpdG9yIGhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIiBtZXRob2Q9XCJnZXRcIiBjbGFzcz1cInRhc2stZWRpdG9yLWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRhc2stZmllbGRcIiBuYW1lPVwidGFza1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUYXNrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImRlc2NyaXB0aW9uLWZpZWxkXCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXRhaWxzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWFkZGJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImRhdGUtcGlja2VyXCIgbmFtZT1cImR1ZS1kYXRlXCIgdHlwZT1cImRhdGVcIiByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrLWRlbGV0ZS1idG5cIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1zdWJtaXQtYnRuXCI+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+YDtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuXG4gICAgdmlld09ubHlUb2RheSgpIHtcbiAgICAgICAgY29uc3QgdWxGb3JUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGUtdGFzay1pdGVtcycpO1xuICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZU9iaiA9IG5ldyBEYXRlKHRhc2suZHVlRGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlRGF5ID0gZHVlRGF0ZU9iai5nZXRVVENEYXRlKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlTW9udGggPSBkdWVEYXRlT2JqLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlWWVhciA9IGR1ZURhdGVPYmouZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBuZXcgRGF0ZSgpLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IG5ldyBEYXRlKCkuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRVVENGdWxsWWVhcigpO1xuXG4gICAgICAgICAgICBpZiAoZHVlRGF0ZURheSA9PT0gY3VycmVudERheSAmJiBkdWVEYXRlTW9udGggPT09IGN1cnJlbnRNb250aCAmJiBkdWVEYXRlWWVhciA9PT0gY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLnRhc2tJZCwgdGFzay5uYW1lLCB0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUNvbHVtbk5hbWUoKSB7XG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1jb2x1bW4tbmFtZScpO1xuICAgICAgICBjb2x1bW5OYW1lLnRleHRDb250ZW50ID0gY3VycmVudExpc3QubmFtZTtcbiAgICB9XG5cbiBcblxuICAgIGRlbGV0ZUxpc3RIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLmxpc3RDdXJyZW50bHlCZWluZ0VkaXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCByZWFsbHlEZWxldGUgPSBjb25maXJtKGBBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgdGhlICR7b2xkTmFtZX0gbGlzdCBhbmQgYWxsIGFzc29jaWF0ZWQgdGFza3M/YCk7XG4gICAgICAgIGlmKHJlYWxseURlbGV0ZSkge1xuICAgICAgICAgICAgaWYoT2JqZWN0LmtleXMobGlzdHMpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsb2dpYy5kZWxldGVMaXN0KG9sZE5hbWUpO1xuICAgICAgICAgICAgICAgIGxvZ2ljLnNldEN1cnJlbnRMaXN0VG9BUmVtYWluaW5nTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb2x1bW5OYW1lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gZGVsZXRlIHlvdXIgb25seSBsaXN0IScpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZUxpc3RCdG5IYW5kbGVyKCkge1xuICAgICAgICBjb25zdCByZWFsbHlEZWxldGUgPSBjb25maXJtKGBBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgdGhlICR7b2xkTmFtZX0gbGlzdCBhbmQgYWxsIG9mIGl0J3MgYXNzb2NpYXRlZCB0YXNrcz9gKTtcbiAgICAgICAgaWYocmVhbGx5RGVsZXRlKSB7XG4gICAgICAgICAgICBkZWxldGUgbGlzdHNbb2xkTmFtZV07XG4gICAgICAgICAgICBpZihPYmplY3Qua2V5cyhsaXN0cykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9naWMuc2V0Q3VycmVudHlMaXN0ID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7IGxvZ2ljLnNldE5leHRMaXN0QXNDdXJyZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7ICAgXG4gICAgICAgIH0gZWxzZSB0aGlzLnJlbmRlckxpc3RzKCk7XG5cbiAgICB9XG5cbiAgICBlZGl0TGlzdFN1Ym1pdEJ0bkhhbmRsZXIobmV3TmFtZSwgdGV4dElucHV0KSB7XG4gICAgICAgIGlmKG5ld05hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0ZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RDdXJyZW50bHlCZWluZ0VkaXRlZCA9IGZhbHNlO1xuICAgICAgICBsb2dpYy5tb2RpZnlMaXN0TmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICB0aGlzLmNoYW5nZUxpc3RIYW5kbGVyKG5ld05hbWUpO1xuICAgIH1cblxuICAgIGVkaXRMaXN0SWNvbkhhbmRsZXIobGlzdE5hbWUsIGxpc3RJdGVtKSB7XG4gICAgICAgIC8qIGlmIGFub3RoZXIgbGlzdCBpcyBiZWluZyBlZGl0dGVkLCB3b24ndCBhbGxvdyBhbm90aGVyIHRvIGJlIGVkaXR0ZWRcbiAgICAgICAgdW50aWwgdGhlIGZpcnN0IG9uZSBpcyBmaW5pc2hlZCAqL1xuICAgICAgICBpZiAodGhpcy5saXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5saXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQgPSB0cnVlO1xuICAgICAgICBvbGROYW1lID0gbGlzdE5hbWU7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtbGlzdC1hbHRcIj48L2k+PGlucHV0IGNsYXNzPVwibmV3LWxpc3QtdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke2xpc3ROYW1lfVwiIC8+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IGxpc3RcIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIGVkaXQtbGlzdC1jYW5jZWwtYnRuXCI+PC9pPjxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLWNpcmNsZSBlZGl0LWxpc3Qtc3VibWl0LWJ0blwiPjwvaT5gO1xuICAgICAgICBsaXN0SXRlbS5pbm5lckhUTUwgPSBodG1sO1xuICAgIH1cblxuICAgIGNoYW5nZUxpc3RIYW5kbGVyKGxpc3ROYW1lKSB7XG4gICAgICAgIGxvZ2ljLm1ha2VDdXJyZW50TGlzdChsaXN0TmFtZSk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgY29uc3QgY29sdW1uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWNvbHVtbi1uYW1lJyk7XG4gICAgICAgIGNvbHVtbk5hbWUudGV4dENvbnRlbnQgPSBsaXN0TmFtZTtcbiAgICB9XG5cblxuICAgIG5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpIHtcbiAgICAgICAgaWYobGlzdE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICBsaXN0VGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbG9naWMuY3JlYXRlTmV3TGlzdChsaXN0TmFtZSk7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdEhhbmRsZXIobGlzdE5hbWUpO1xuICAgIH1cblxuICAgIHJlbmRlckxpc3RzKCkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bC1saXN0LW9mLWxpc3RzJyk7XG4gICAgICAgIGxldCBodG1sID0gJyc7XG4gICAgICAgIGNvbnN0IHNvcnRlZExpc3RzID0gT2JqZWN0LnZhbHVlcyhsaXN0cykuc29ydCgobGlzdDEsIGxpc3QyKSA9PiB7XG4gICAgICAgICAgICBpZihsaXN0MS5pZCA+IGxpc3QyLmlkKSByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmIChsaXN0MS5pZCA9PT0gbGlzdDIuaWQpIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKGxpc3QxLmlkIDwgbGlzdDIuaWQpIHJldHVybiAtMTtcbiAgICAgICAgfSk7IFxuICAgICAgICBmb3IgKGNvbnN0IGxpc3Qgb2Ygc29ydGVkTGlzdHMpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gYDxsaSBjbGFzcz1cImxpc3QgbWVudS1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdCBlZGl0LWxpc3QtaWNvblwiPjwvaT4ke2xpc3QubmFtZX08c3BhbiBjbGFzcz1cImVkaXQtbGlzdC1pY29uXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdCBlZGl0LWxpc3QtaWNvblwiPjwvaT48L3NwYW4+PC9saT5gO1xuICAgICAgICB9XG4gICAgICAgIHVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuXG4gICAgbWVudUJ0bkhhbmRsZXIobWVudSkge1xuICAgICAgICBjb25zdCBkaXNwbGF5ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobWVudSkuZGlzcGxheTtcbiAgICAgICAgaWYoZGlzcGxheSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBtZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgYWRkTGlzdEJ0bkhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVsLWxpc3Qtb2YtbGlzdHMnKTtcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdsaXN0JywgJ21lbnUtYnRuJyk7XG4gICAgICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLWxpc3QtYWx0Jyk7XG4gICAgICAgIGxpLmFwcGVuZChpKTtcbiAgICAgICAgY29uc3QgdGV4dElucHV0ID0gYDxpbnB1dCBjbGFzcz1cIm5ldy1saXN0LXRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+PGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIG5ldy1saXN0LWNhbmNlbC1idG5cIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlIG5ldy1saXN0LXN1Ym1pdC1idG5cIj48L2k+YDtcbiAgICAgICAgbGkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZXh0SW5wdXQpO1xuICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgIH1cblxuICAgIHRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xuICAgICAgICBsb2dpYy5kZWxldGVUYXNrKHRhc2tJZCk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICB0YXNrRWRpdG9ySGFuZGxlcih0YXNrRWRpdG9yLCB0YXNrSWQpIHtcbiAgICAgICAgdGFza0VkaXRvci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgY29uc3QgdGFza1RleHRJbnB1dCA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGNvbnN0IGRldGFpbHNUZXh0YXJlYSA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb25zdCBkYXRlcGlja2VyID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIFxuICAgICAgICB0YXNrVGV4dElucHV0LnZhbHVlID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5uYW1lO1xuICAgICBcbiAgICAgICAgZGV0YWlsc1RleHRhcmVhLnZhbHVlID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5kZXRhaWxzO1xuICAgICAgICBkYXRlcGlja2VyLnZhbHVlQXNOdW1iZXIgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLmR1ZURhdGU7XG4gICAgfVxuXG4gICAgZWRpdFRhc2tTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGFza05hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLnZhbHVlO1xuICAgICAgICBjb25zdCBkZXRhaWxzID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsxXS52YWx1ZTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQudmFsdWVBc0RhdGU7XG5cbiAgICAgICAgaWYoIXRoaXMuZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZSkpe1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXRhc2tOYW1lKSB7XG4gICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0YXNrTmFtZSAmJiB0aGlzLmR1ZURhdGVJc1ZhbGlkKGR1ZURhdGUpKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrSXNOZXcgPSAodGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWVkaXRvcicpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpOyAvL3dpbGwgdXNlIGN1cnJlbnRUaW1lIGFzIGEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIGVhY2ggdGFza1xuXG4gICAgICAgICAgICBpZih0YXNrSXNOZXcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrID0gbG9naWMuY3JlYXRlTmV3VGFzayh0YXNrTmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgY3VycmVudFRpbWUpO1xuICAgICAgICAgICAgICAgIGxvZ2ljLmFkZFRhc2tUb0N1cnJlbnRMaXN0KHRhc2spOyAvL2hlcmU/XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXRhc2tJc05ldykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7XG4gICAgICAgICAgICAgICAgbG9naWMubW9kaWZ5VGFzayh0YXNrTmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgdGFza0lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0YXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgaWYodGFza0VkaXRvci5jbGFzc05hbWUgPT09ICduZXctdGFzay1lZGl0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlblsxXS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkcmVuWzJdLmZpcnN0RWxlbWVudENoaWxkLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGFza0VkaXRvci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGR1ZURhdGVJc1ZhbGlkKGR1ZURhdGVWYWx1ZUFzTnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKGR1ZURhdGVWYWx1ZUFzTnVtYmVyKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjYW5jZWxOZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKSB7XG4gICAgICAgIG5ld1Rhc2tFZGl0b3IuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgbmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcikge1xuICAgICAgICBuZXdUYXNrRWRpdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIHJlbmRlclRhc2tzKCkge1xuICAgICAgICBjb25zdCB1bEZvclRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZS10YXNrLWl0ZW1zJyk7XG4gICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGlmKGN1cnJlbnRMaXN0ID09PSBudWxsKSB1bEZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLmNyZWF0ZVRhc2tIVE1MKHRhc2sudGFza0lkLCB0YXNrLm5hbWUsIHRhc2suZHVlRGF0ZSk7IC8vaGVyZVxuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVJlYWRhYmxlRGF0ZShkYXRlVmFsdWVBc051bWJlcikge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVZhbHVlQXNOdW1iZXIpO1xuICAgICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0VVRDTW9udGgoKSArIDE7XG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkb21Db250cm9sbGVyID0gbmV3IERvbUNvbnRyb2xsZXIoKTtcblxuXG5cbi8vaXNzdWVzLiAgY2FuJ3QgZ2V0IHRhc2sgbmFtZSB0byB3cmFwIGF0IDUwJTsiLCJjbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0ge307XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG59XG5cbmV4cG9ydCB7IExpc3QgfTsiLCJpbXBvcnQge1Rhc2t9IGZyb20gJy4vVGFzayc7XG5pbXBvcnQge0xpc3R9IGZyb20gJy4vTGlzdCc7XG5pbXBvcnQgeyBkb21Db250cm9sbGVyIH0gZnJvbSAnLi9Eb21Db250cm9sbGVyJztcblxubGV0IGN1cnJlbnRMaXN0O1xubGV0IG5leHRMaXN0SWQgPSAwO1xuXG5sZXQgbGlzdHMgPSB7fTtcblxuXG5jbGFzcyBMb2dpYyB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgY3JlYXRlTmV3VGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gXCJcIiwgdGFza0lkKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCB0YXNrSWQpO1xuICAgIH1cblxuICAgIGFkZFRhc2tUb0N1cnJlbnRMaXN0KHRhc2spIHtcbiAgICAgICAgY3VycmVudExpc3QudGFza3NbdGFzay50YXNrSWRdID0gdGFzaztcbiAgICB9XG5cbiAgICBtb2RpZnlUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSAnJywgdGFza0lkKSB7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKSkge1xuICAgICAgICAgICAgaWYodGFzay50YXNrSWQgPT0gdGFza0lkKSB7XG4gICAgICAgICAgICAgICAgdGFzay5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICB0YXNrLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICAgICAgICAgIHRhc2suZGV0YWlscyA9IGRldGFpbHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVUYXNrKHRhc2spIHtcbiAgICAgICAgZGVsZXRlIGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tdO1xuICAgIH1cblxuICAgIGNyZWF0ZU5ld0xpc3QobmFtZSkge1xuICAgICAgICBjb25zdCBuZXdMaXN0ID0gbmV3IExpc3QobmFtZSwgbmV4dExpc3RJZCsrKTtcbiAgICAgICAgbGlzdHNbbmFtZV0gPSBuZXdMaXN0O1xuICAgIH1cblxuICAgIG1vZGlmeUxpc3ROYW1lKG9sZE5hbWUsIG5ld05hbWUpIHtcbiAgICAgICAgbGlzdHNbbmV3TmFtZV0gPSBsaXN0c1tvbGROYW1lXTtcbiAgICAgICAgZGVsZXRlIGxpc3RzW29sZE5hbWVdO1xuICAgICAgICBsaXN0c1tuZXdOYW1lXS5uYW1lID0gbmV3TmFtZTtcbiAgICB9XG5cbiAgICBcbiAgICBzZXREZWZhdWx0TGlzdCgpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGxpc3RzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGNob3JlcyA9IG5ldyBMaXN0KCdDaG9yZXMnLCBuZXh0TGlzdElkKyspO1xuICAgICAgICAgICAgbGlzdHMuQ2hvcmVzID0gY2hvcmVzO1xuICAgICAgICAgICAgdGhpcy5tYWtlQ3VycmVudExpc3QoJ0Nob3JlcycpO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIG1ha2VDdXJyZW50TGlzdChsaXN0TmFtZSkge1xuICAgICAgICBjdXJyZW50TGlzdCA9IGxpc3RzW2xpc3ROYW1lXTtcbiAgICB9XG5cbiAgICB3cml0ZU92ZXJDdXJyZW50TGlzdChkYXRhRnJvbVN0b3JhZ2UpIHtcbiAgICAgICAgY3VycmVudExpc3QgPSBkYXRhRnJvbVN0b3JhZ2U7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudExpc3RUb0FSZW1haW5pbmdMaXN0KCkge1xuICAgICAgICBjb25zdCBmaXJzdExpc3QgPSBPYmplY3Qua2V5cyhsaXN0cylbMF07XG4gICAgICAgIHRoaXMubWFrZUN1cnJlbnRMaXN0KGZpcnN0TGlzdCk7XG4gICAgfVxuXG4gICAgZGVsZXRlTGlzdChsaXN0TmFtZSkge1xuICAgICAgICBkZWxldGUgbGlzdHNbbGlzdE5hbWVdO1xuICAgIH1cblxuXG4gICBcbn1cblxuY29uc3QgbG9naWMgPSBuZXcgTG9naWMoKTtcblxuICAgIFxuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudExpc3QnLCBKU09OLnN0cmluZ2lmeShjdXJyZW50TGlzdCkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0cycsIEpTT04uc3RyaW5naWZ5KGxpc3RzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25leHRMaXN0SWQnLCBKU09OLnN0cmluZ2lmeShuZXh0TGlzdElkKSk7XG59KVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYoT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlcmVzIHN0dWZmIGluIGxvY2FsIHN0b3JhZ2UnKTtcbiAgICAgICAgICAgIGxvZ2ljLndyaXRlT3ZlckN1cnJlbnRMaXN0KEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRMaXN0JykpKTtcbiAgICAgICAgICAgIGxpc3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdHMnKSk7XG4gICAgICAgICAgICBuZXh0TGlzdElkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmV4dExpc3RJZCcpKTtcbiAgICAgICAgICAgIGRvbUNvbnRyb2xsZXIucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIGRvbUNvbnRyb2xsZXIucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIGRvbUNvbnRyb2xsZXIudXBkYXRlQ29sdW1uTmFtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RoaW5nIGluIGxvY2FsIHN0b3JhZ2UnKTtcbiAgICAgICAgbG9naWMuc2V0RGVmYXVsdExpc3QoKTtcbiAgICB9XG59KVxuXG5cbmV4cG9ydCB7Y3VycmVudExpc3QsIGxpc3RzLCBsb2dpYywgbmV4dExpc3RJZH07XG4iLCJjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSBcIlwiLCB0YXNrSWQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICAgICAgdGhpcy50YXNrSWQgPSB0YXNrSWQ7XG4gICAgfVxuXG5cblxufVxuXG5leHBvcnQgeyBUYXNrIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2RvbUNvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy9Eb21Db250cm9sbGVyJztcblxuXG5cblxuXG5cbmRvbUNvbnRyb2xsZXIuaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
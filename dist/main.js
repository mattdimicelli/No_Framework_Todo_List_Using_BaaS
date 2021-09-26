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
          var textInput = target.previousElementSibling.previousElementSibling.previousElementSibling;
          var newName = target.previousElementSibling.previousElementSibling.previousElementSibling.value;

          if (newName === oldName) {
            textInput.focus();
            return;
          }

          this.editListSubmitBtnHandler(newName, textInput);
        } else if (target.classList.contains('edit-list-cancel-btn')) {
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

      _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyListName(oldName, newName);
      this.renderLists();
      this.changeListHandler(newName);
    }
  }, {
    key: "editListIconHandler",
    value: function editListIconHandler(listName, listItem) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsib2xkTmFtZSIsIkRvbUNvbnRyb2xsZXIiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGljayIsImJpbmQiLCJlIiwidGFyZ2V0IiwiY2xvc2VzdCIsImNsYXNzTmFtZSIsInRhc2tFZGl0b3IiLCJwYXJlbnRFbGVtZW50IiwiY2hpbGRyZW4iLCJ0YXNrSWQiLCJkYXRhc2V0IiwiaWQiLCJ0YXNrRWRpdG9ySGFuZGxlciIsInByZXZlbnREZWZhdWx0IiwidGFza1RhcmdldCIsImZpcnN0RWxlbWVudENoaWxkIiwiZGF0ZVRhcmdldCIsInRvZ2dsZVN0cmlrZXRocnVUYXNrIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCJsaXN0VGV4dElucHV0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxpc3ROYW1lIiwidmFsdWUiLCJuZXdMaXN0U3VibWl0QnRuSGFuZGxlciIsImxpc3RJdGVtIiwidGV4dENvbnRlbnQiLCJlZGl0TGlzdEljb25IYW5kbGVyIiwidGV4dElucHV0IiwibmV3TmFtZSIsImZvY3VzIiwiZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyIiwicmVuZGVyTGlzdHMiLCJkZWxldGVMaXN0SGFuZGxlciIsIm1lbnUiLCJxdWVyeVNlbGVjdG9yIiwibWVudUJ0bkhhbmRsZXIiLCJlZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIiLCJuZXdUYXNrRWRpdG9yIiwibmV3VGFza0J0bkhhbmRsZXIiLCJ0YXNrRGVsZXRlQnRuSGFuZGxlciIsImNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyIiwiYWRkTGlzdEJ0bkhhbmRsZXIiLCJtYXRjaGVzIiwiY2hpbGROb2RlcyIsImNoYW5nZUxpc3RIYW5kbGVyIiwicmVuZGVyVGFza3MiLCJ2aWV3T25seVRvZGF5Iiwidmlld09ubHlXZWVrIiwidG9nZ2xlIiwidWxGb3JUYXNrcyIsImlubmVySFRNTCIsIk9iamVjdCIsInZhbHVlcyIsImN1cnJlbnRMaXN0IiwiZmlsdGVyIiwidGFzayIsImR1ZURhdGVPYmoiLCJEYXRlIiwiZHVlRGF0ZSIsIk1hdGgiLCJhYnMiLCJub3ciLCJodG1sIiwiY3JlYXRlVGFza0hUTUwiLCJuYW1lIiwiY3JlYXRlUmVhZGFibGVEYXRlIiwiZHVlRGF0ZURheSIsImdldFVUQ0RhdGUiLCJkdWVEYXRlTW9udGgiLCJnZXRVVENNb250aCIsImR1ZURhdGVZZWFyIiwiZ2V0VVRDRnVsbFllYXIiLCJjdXJyZW50RGF5IiwiY3VycmVudE1vbnRoIiwiY3VycmVudFllYXIiLCJjb2x1bW5OYW1lIiwicmVhbGx5RGVsZXRlIiwiY29uZmlybSIsImtleXMiLCJsaXN0cyIsImxlbmd0aCIsImxvZ2ljIiwidXBkYXRlQ29sdW1uTmFtZSIsImFsZXJ0IiwidWwiLCJzb3J0ZWRMaXN0cyIsInNvcnQiLCJsaXN0MSIsImxpc3QyIiwibGlzdCIsImRpc3BsYXkiLCJ3aW5kb3ciLCJnZXRDb21wdXRlZFN0eWxlIiwic3R5bGUiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJpIiwiYXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidGFza1RleHRJbnB1dCIsImRldGFpbHNUZXh0YXJlYSIsIm5leHRFbGVtZW50U2libGluZyIsImRhdGVwaWNrZXIiLCJkZXRhaWxzIiwidmFsdWVBc051bWJlciIsInRhc2tOYW1lIiwidmFsdWVBc0RhdGUiLCJkdWVEYXRlSXNWYWxpZCIsInRhc2tJc05ldyIsImN1cnJlbnRUaW1lIiwiZHVlRGF0ZVZhbHVlQXNOdW1iZXIiLCJpc05hTiIsImRhdGVWYWx1ZUFzTnVtYmVyIiwiZGF0ZSIsIm1vbnRoIiwiZGF5IiwieWVhciIsImRvbUNvbnRyb2xsZXIiLCJMaXN0IiwidGFza3MiLCJuZXh0TGlzdElkIiwiTG9naWMiLCJUYXNrIiwibmV3TGlzdCIsImNob3JlcyIsIkNob3JlcyIsIm1ha2VDdXJyZW50TGlzdCIsImRhdGFGcm9tU3RvcmFnZSIsImZpcnN0TGlzdCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiY29uc29sZSIsImxvZyIsIndyaXRlT3ZlckN1cnJlbnRMaXN0IiwicGFyc2UiLCJnZXRJdGVtIiwic2V0RGVmYXVsdExpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBSUEsT0FBSjs7SUFHTUMsYTtBQUVGLDJCQUFlO0FBQUE7QUFBRTs7OztXQUVqQix5Q0FBZ0M7QUFDNUJDLGNBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsS0FBS0MsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBbkM7QUFDSDs7O1dBRUQscUJBQVlDLENBQVosRUFBZTtBQUNYO0FBQ1I7QUFDQTtBQUVRO0FBQ0EsVUFBSUMsTUFBSjs7QUFDQSxVQUFHRCxDQUFDLENBQUNDLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQixZQUFqQixDQUFILEVBQW1DO0FBQy9CRCxjQUFNLEdBQUdELENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxPQUFU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LE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUtqRyxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxDOzs7Ozs7OztVQ1BMO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFPQStHLCtGQUFBLEciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvZ2ljLCBjdXJyZW50TGlzdCwgbGlzdHN9IGZyb20gJy4vTG9naWMnO1xuXG5sZXQgb2xkTmFtZTtcblxuXG5jbGFzcyBEb21Db250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkgIHt9XG5cbiAgICBpbml0aWFsaXplQ2xpY2tFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgIC8qIHdyaXRpbmcgdGhpcyBhcHBsaWNhdGlvbiB3YXMgYSBsZWFybmluZyBwcm9jZXNzLiAgSSBhdHRlbXB0ZWQgYW5kXG4gICAgICAgICAgICBzdWNjZWVkZWQgaW4gdXNpbmcgb25lIGV2ZW50IGxpc3RlbmVyIHdpdGggZGVsZWdhdGlvbiBmb3IgZXZlcnlcbiAgICAgICAgICAgIGNsaWNrIG9uIHRoZSBET00uICBkb2luZyBzbyByZXF1aXJlZCBhIGNvbXBsZXggc2V0IG9mIGNvbmRpdGlvbmFscy4qLyBcbiAgICAgICAgXG4gICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgdmFyaWFibGUgaXMgZGVjbGFyZWQgZm9yIHVzZSBpbiBjb25kaXRpb25hbCBzdGF0ZW1lbnRzXG4gICAgICAgIGxldCB0YXJnZXQ7XG4gICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbiwgbGknKSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBsaScpO1xuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0VkaXRvciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDsgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tFZGl0b3JIYW5kbGVyKHRhc2tFZGl0b3IsIHRhc2tJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZihlLnRhcmdldC5jbG9zZXN0KCdkaXZbY2xhc3M9XCJ0YXNrLWRhdGUtYnRuc1wiXScpICYmIGUudGFyZ2V0LmNsYXNzTmFtZSAhPT0gJ2ZhcyBmYS1lZGl0Jykge1xuICAgICAgICAgICAgY29uc3QgdGFza1RhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2RpdltjbGFzcz1cInRhc2stZGF0ZS1idG5zXCJdJykuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICBjb25zdCBkYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnZGl2W2NsYXNzPVwidGFzay1kYXRlLWJ0bnNcIl0nKS5jaGlsZHJlblsxXS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RyaWtldGhydVRhc2sodGFza1RhcmdldCwgZGF0ZVRhcmdldCk7XG4gICAgICAgIH0gZWxzZSBpZihlLnRhcmdldC5jbG9zZXN0KCdpJykpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2knKTtcbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1saXN0LWNhbmNlbC1idG4nKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1saXN0LXN1Ym1pdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RUZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1pY29uJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RJY29uSGFuZGxlcihsaXN0TmFtZSwgbGlzdEl0ZW0pOyBcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWxpc3Qtc3VibWl0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dElucHV0ID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYobmV3TmFtZSA9PT0gb2xkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyKG5ld05hbWUsIHRleHRJbnB1dCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1saXN0LWNhbmNlbC1idG4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnZmFyIGZhLXRyYXNoLWFsdCBsaXN0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlTGlzdEhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihlLnRhcmdldC5jbG9zZXN0KCdidXR0b24sIGxpJykpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdidXR0b24sIGxpJyk7XG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51QnRuSGFuZGxlcihtZW51KTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzay1zdWJtaXQtYnRuJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRUYXNrU3VibWl0QnRuSGFuZGxlcih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICd0YXNrLWRlbGV0ZS1idG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFza0RlbGV0ZUJ0bkhhbmRsZXIodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2NhbmNlbC1uZXctdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsTmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1saXN0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTGlzdEJ0bkhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBsaScpO1xuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtbGlzdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTGlzdEJ0bkhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbGlzdCBtZW51LWJ0bicgJiYgIXRhcmdldC5jaGlsZHJlblsxXS5tYXRjaGVzKCdpbnB1dCcpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUxpc3RIYW5kbGVyKGxpc3ROYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4gYWxsJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4gdG9kYXknKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3T25seVRvZGF5KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuIHdlZWsnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3T25seVdlZWsoKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTdHJpa2V0aHJ1VGFzayh0YXNrVGFyZ2V0LCBkYXRlVGFyZ2V0KSB7XG4gICAgICAgIHRhc2tUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnc3RyaWtldGhydScpO1xuICAgICAgICBkYXRlVGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3N0cmlrZXRocnUnKTtcbiAgICB9XG5cbiAgICB2aWV3T25seVdlZWsoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpLmZpbHRlcih0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVPYmogPSBuZXcgRGF0ZSh0YXNrLmR1ZURhdGUpO1xuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoRGF0ZS5ub3coKSAtIGR1ZURhdGVPYmopIDw9IDYuMDQ4ZTgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLnRhc2tJZCwgdGFzay5uYW1lLCB0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVRhc2tIVE1MKHRhc2tJZCwgbmFtZSwgZHVlRGF0ZSkge1xuICAgICAgICBjb25zdCBodG1sID0gYDxsaSBjbGFzcz1cInRvZG8taXRlbVwiIGRhdGEtaWQ9XCIke3Rhc2tJZH1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZGF0ZS1idG5zXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRhc2tcIj4ke25hbWV9PC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGUtYW5kLWJ0bnNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImR1ZS1kYXRlXCI+JHt0aGlzLmNyZWF0ZVJlYWRhYmxlRGF0ZShkdWVEYXRlKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPjwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRhc2stZWRpdG9yIGhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIiBtZXRob2Q9XCJnZXRcIiBjbGFzcz1cInRhc2stZWRpdG9yLWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRhc2stZmllbGRcIiBuYW1lPVwidGFza1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUYXNrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImRlc2NyaXB0aW9uLWZpZWxkXCIgbmFtZT1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXRhaWxzXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWFkZGJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImRhdGUtcGlja2VyXCIgbmFtZT1cImR1ZS1kYXRlXCIgdHlwZT1cImRhdGVcIiByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrLWRlbGV0ZS1idG5cIj48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1zdWJtaXQtYnRuXCI+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+YDtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuXG4gICAgdmlld09ubHlUb2RheSgpIHtcbiAgICAgICAgY29uc3QgdWxGb3JUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGUtdGFzay1pdGVtcycpO1xuICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZU9iaiA9IG5ldyBEYXRlKHRhc2suZHVlRGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlRGF5ID0gZHVlRGF0ZU9iai5nZXRVVENEYXRlKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlTW9udGggPSBkdWVEYXRlT2JqLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlWWVhciA9IGR1ZURhdGVPYmouZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBuZXcgRGF0ZSgpLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IG5ldyBEYXRlKCkuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRVVENGdWxsWWVhcigpO1xuXG4gICAgICAgICAgICBpZiAoZHVlRGF0ZURheSA9PT0gY3VycmVudERheSAmJiBkdWVEYXRlTW9udGggPT09IGN1cnJlbnRNb250aCAmJiBkdWVEYXRlWWVhciA9PT0gY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gdGhpcy5jcmVhdGVUYXNrSFRNTCh0YXNrLnRhc2tJZCwgdGFzay5uYW1lLCB0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUNvbHVtbk5hbWUoKSB7XG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1jb2x1bW4tbmFtZScpO1xuICAgICAgICBjb2x1bW5OYW1lLnRleHRDb250ZW50ID0gY3VycmVudExpc3QubmFtZTtcbiAgICB9XG5cbiBcblxuICAgIGRlbGV0ZUxpc3RIYW5kbGVyKCkge1xuICAgICAgICBjb25zdCByZWFsbHlEZWxldGUgPSBjb25maXJtKGBBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgdGhlICR7b2xkTmFtZX0gbGlzdCBhbmQgYWxsIGFzc29jaWF0ZWQgdGFza3M/YCk7XG4gICAgICAgIGlmKHJlYWxseURlbGV0ZSkge1xuICAgICAgICAgICAgaWYoT2JqZWN0LmtleXMobGlzdHMpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsb2dpYy5kZWxldGVMaXN0KG9sZE5hbWUpO1xuICAgICAgICAgICAgICAgIGxvZ2ljLnNldEN1cnJlbnRMaXN0VG9BUmVtYWluaW5nTGlzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb2x1bW5OYW1lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gZGVsZXRlIHlvdXIgb25seSBsaXN0IScpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZUxpc3RCdG5IYW5kbGVyKCkge1xuICAgICAgICBjb25zdCByZWFsbHlEZWxldGUgPSBjb25maXJtKGBBcmUgeW91IHN1cmUgdGhhdCB5b3Ugd2FudCB0byBkZWxldGUgdGhlICR7b2xkTmFtZX0gbGlzdCBhbmQgYWxsIG9mIGl0J3MgYXNzb2NpYXRlZCB0YXNrcz9gKTtcbiAgICAgICAgaWYocmVhbGx5RGVsZXRlKSB7XG4gICAgICAgICAgICBkZWxldGUgbGlzdHNbb2xkTmFtZV07XG4gICAgICAgICAgICBpZihPYmplY3Qua2V5cyhsaXN0cykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9naWMuc2V0Q3VycmVudHlMaXN0ID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7IGxvZ2ljLnNldE5leHRMaXN0QXNDdXJyZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7ICAgXG4gICAgICAgIH0gZWxzZSB0aGlzLnJlbmRlckxpc3RzKCk7XG5cbiAgICB9XG5cbiAgICBlZGl0TGlzdFN1Ym1pdEJ0bkhhbmRsZXIobmV3TmFtZSwgdGV4dElucHV0KSB7XG4gICAgICAgIGlmKG5ld05hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0ZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2dpYy5tb2RpZnlMaXN0TmFtZShvbGROYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICB0aGlzLmNoYW5nZUxpc3RIYW5kbGVyKG5ld05hbWUpO1xuICAgIH1cblxuICAgIGVkaXRMaXN0SWNvbkhhbmRsZXIobGlzdE5hbWUsIGxpc3RJdGVtKSB7XG4gICAgICAgIG9sZE5hbWUgPSBsaXN0TmFtZTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGA8aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdFwiPjwvaT48aW5wdXQgY2xhc3M9XCJuZXctbGlzdC10ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7bGlzdE5hbWV9XCIgLz48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgbGlzdFwiPjwvaT48aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgZWRpdC1saXN0LWNhbmNlbC1idG5cIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlIGVkaXQtbGlzdC1zdWJtaXQtYnRuXCI+PC9pPmA7XG4gICAgICAgIGxpc3RJdGVtLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuXG4gICAgY2hhbmdlTGlzdEhhbmRsZXIobGlzdE5hbWUpIHtcbiAgICAgICAgbG9naWMubWFrZUN1cnJlbnRMaXN0KGxpc3ROYW1lKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICBjb25zdCBjb2x1bW5OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtY29sdW1uLW5hbWUnKTtcbiAgICAgICAgY29sdW1uTmFtZS50ZXh0Q29udGVudCA9IGxpc3ROYW1lO1xuICAgIH1cblxuXG4gICAgbmV3TGlzdFN1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0LCBsaXN0TmFtZSwgbGlzdFRleHRJbnB1dCkge1xuICAgICAgICBpZihsaXN0TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGxpc3RUZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2dpYy5jcmVhdGVOZXdMaXN0KGxpc3ROYW1lKTtcbiAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VMaXN0SGFuZGxlcihsaXN0TmFtZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyTGlzdHMoKSB7XG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVsLWxpc3Qtb2YtbGlzdHMnKTtcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcbiAgICAgICAgY29uc3Qgc29ydGVkTGlzdHMgPSBPYmplY3QudmFsdWVzKGxpc3RzKS5zb3J0KChsaXN0MSwgbGlzdDIpID0+IHtcbiAgICAgICAgICAgIGlmKGxpc3QxLmlkID4gbGlzdDIuaWQpIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKGxpc3QxLmlkID09PSBsaXN0Mi5pZCkgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAobGlzdDEuaWQgPCBsaXN0Mi5pZCkgcmV0dXJuIC0xO1xuICAgICAgICB9KTsgXG4gICAgICAgIGZvciAoY29uc3QgbGlzdCBvZiBzb3J0ZWRMaXN0cykge1xuICAgICAgICAgICAgaHRtbCArPSBgPGxpIGNsYXNzPVwibGlzdCBtZW51LWJ0blwiPjxpIGNsYXNzPVwiZmFzIGZhLWxpc3QtYWx0IGVkaXQtbGlzdC1pY29uXCI+PC9pPiR7bGlzdC5uYW1lfTxzcGFuIGNsYXNzPVwiZWRpdC1saXN0LWljb25cIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0IGVkaXQtbGlzdC1pY29uXCI+PC9pPjwvc3Bhbj48L2xpPmA7XG4gICAgICAgIH1cbiAgICAgICAgdWwuaW5uZXJIVE1MID0gaHRtbDtcbiAgICB9XG5cbiAgICBtZW51QnRuSGFuZGxlcihtZW51KSB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtZW51KS5kaXNwbGF5O1xuICAgICAgICBpZihkaXNwbGF5ID09PSAnbm9uZScpe1xuICAgICAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBhZGRMaXN0QnRuSGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWwtbGlzdC1vZi1saXN0cycpO1xuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2xpc3QnLCAnbWVudS1idG4nKTtcbiAgICAgICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgaS5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtbGlzdC1hbHQnKTtcbiAgICAgICAgbGkuYXBwZW5kKGkpO1xuICAgICAgICBjb25zdCB0ZXh0SW5wdXQgPSBgPGlucHV0IGNsYXNzPVwibmV3LWxpc3QtdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgLz48aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgbmV3LWxpc3QtY2FuY2VsLWJ0blwiPjwvaT48aSBjbGFzcz1cImZhciBmYS1jaGVjay1jaXJjbGUgbmV3LWxpc3Qtc3VibWl0LWJ0blwiPjwvaT5gO1xuICAgICAgICBsaS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRleHRJbnB1dCk7XG4gICAgICAgIHVsLmFwcGVuZChsaSk7XG4gICAgfVxuXG4gICAgdGFza0RlbGV0ZUJ0bkhhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7XG4gICAgICAgIGxvZ2ljLmRlbGV0ZVRhc2sodGFza0lkKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgIH1cblxuICAgIHRhc2tFZGl0b3JIYW5kbGVyKHRhc2tFZGl0b3IsIHRhc2tJZCkge1xuICAgICAgICB0YXNrRWRpdG9yLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBjb25zdCB0YXNrVGV4dElucHV0ID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgY29uc3QgZGV0YWlsc1RleHRhcmVhID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgXG4gICAgICAgIHRhc2tUZXh0SW5wdXQudmFsdWUgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLm5hbWU7XG4gICAgIFxuICAgICAgICBkZXRhaWxzVGV4dGFyZWEudmFsdWUgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLmRldGFpbHM7XG4gICAgICAgIGRhdGVwaWNrZXIudmFsdWVBc051bWJlciA9IGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tJZF0uZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBlZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXNrTmFtZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0udmFsdWU7XG4gICAgICAgIGNvbnN0IGRldGFpbHMgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzFdLnZhbHVlO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZUFzRGF0ZTtcblxuICAgICAgICBpZighdGhpcy5kdWVEYXRlSXNWYWxpZChkdWVEYXRlKSl7XG4gICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzJdLmZpcnN0RWxlbWVudENoaWxkLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGFza05hbWUpIHtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRhc2tOYW1lICYmIHRoaXMuZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJc05ldyA9ICh0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lID09PSAnbmV3LXRhc2stZWRpdG9yJykgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7IC8vd2lsbCB1c2UgY3VycmVudFRpbWUgYXMgYSB1bmlxdWUgaWRlbnRpZmllciBmb3IgZWFjaCB0YXNrXG5cbiAgICAgICAgICAgIGlmKHRhc2tJc05ldykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBsb2dpYy5jcmVhdGVOZXdUYXNrKHRhc2tOYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCBjdXJyZW50VGltZSk7XG4gICAgICAgICAgICAgICAgbG9naWMuYWRkVGFza1RvQ3VycmVudExpc3QodGFzayk7IC8vaGVyZT9cbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighdGFza0lzTmV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0lkID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDtcbiAgICAgICAgICAgICAgICBsb2dpYy5tb2RpZnlUYXNrKHRhc2tOYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCB0YXNrSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBpZih0YXNrRWRpdG9yLmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWVkaXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkcmVuWzFdLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZVZhbHVlQXNOdW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4oZHVlRGF0ZVZhbHVlQXNOdW1iZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpIHtcbiAgICAgICAgbmV3VGFza0VkaXRvci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBuZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKSB7XG4gICAgICAgIG5ld1Rhc2tFZGl0b3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyVGFza3MoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYoY3VycmVudExpc3QgPT09IG51bGwpIHVsRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKSkge1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMuY3JlYXRlVGFza0hUTUwodGFzay50YXNrSWQsIHRhc2submFtZSwgdGFzay5kdWVEYXRlKTsgLy9oZXJlXG4gICAgICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCArPSBodG1sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUmVhZGFibGVEYXRlKGRhdGVWYWx1ZUFzTnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlVmFsdWVBc051bWJlcik7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpICsgMTtcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAgIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRvbUNvbnRyb2xsZXIgPSBuZXcgRG9tQ29udHJvbGxlcigpO1xuXG5cblxuLy9pc3N1ZXMuICBjYW4ndCBnZXQgdGFzayBuYW1lIHRvIHdyYXAgYXQgNTAlOyIsImNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSB7fTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgTGlzdCB9OyIsImltcG9ydCB7VGFza30gZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7TGlzdH0gZnJvbSAnLi9MaXN0JztcbmltcG9ydCB7IGRvbUNvbnRyb2xsZXIgfSBmcm9tICcuL0RvbUNvbnRyb2xsZXInO1xuXG5sZXQgY3VycmVudExpc3Q7XG5sZXQgbmV4dExpc3RJZCA9IDA7XG5cbmxldCBsaXN0cyA9IHt9O1xuXG5cbmNsYXNzIExvZ2ljIHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBjcmVhdGVOZXdUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSBcIlwiLCB0YXNrSWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMsIHRhc2tJZCk7XG4gICAgfVxuXG4gICAgYWRkVGFza1RvQ3VycmVudExpc3QodGFzaykge1xuICAgICAgICBjdXJyZW50TGlzdC50YXNrc1t0YXNrLnRhc2tJZF0gPSB0YXNrO1xuICAgIH1cblxuICAgIG1vZGlmeVRhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9ICcnLCB0YXNrSWQpIHtcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpKSB7XG4gICAgICAgICAgICBpZih0YXNrLnRhc2tJZCA9PSB0YXNrSWQpIHtcbiAgICAgICAgICAgICAgICB0YXNrLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgIHRhc2suZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgICAgICAgICAgdGFzay5kZXRhaWxzID0gZGV0YWlscztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZVRhc2sodGFzaykge1xuICAgICAgICBkZWxldGUgY3VycmVudExpc3QudGFza3NbdGFza107XG4gICAgfVxuXG4gICAgY3JlYXRlTmV3TGlzdChuYW1lKSB7XG4gICAgICAgIGNvbnN0IG5ld0xpc3QgPSBuZXcgTGlzdChuYW1lLCBuZXh0TGlzdElkKyspO1xuICAgICAgICBsaXN0c1tuYW1lXSA9IG5ld0xpc3Q7XG4gICAgfVxuXG4gICAgbW9kaWZ5TGlzdE5hbWUob2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgICBsaXN0c1tuZXdOYW1lXSA9IGxpc3RzW29sZE5hbWVdO1xuICAgICAgICBkZWxldGUgbGlzdHNbb2xkTmFtZV07XG4gICAgICAgIGxpc3RzW25ld05hbWVdLm5hbWUgPSBuZXdOYW1lO1xuICAgIH1cblxuICAgIFxuICAgIHNldERlZmF1bHRMaXN0KCkge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMobGlzdHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgY2hvcmVzID0gbmV3IExpc3QoJ0Nob3JlcycsIG5leHRMaXN0SWQrKyk7XG4gICAgICAgICAgICBsaXN0cy5DaG9yZXMgPSBjaG9yZXM7XG4gICAgICAgICAgICB0aGlzLm1ha2VDdXJyZW50TGlzdCgnQ2hvcmVzJyk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgbWFrZUN1cnJlbnRMaXN0KGxpc3ROYW1lKSB7XG4gICAgICAgIGN1cnJlbnRMaXN0ID0gbGlzdHNbbGlzdE5hbWVdO1xuICAgIH1cblxuICAgIHdyaXRlT3ZlckN1cnJlbnRMaXN0KGRhdGFGcm9tU3RvcmFnZSkge1xuICAgICAgICBjdXJyZW50TGlzdCA9IGRhdGFGcm9tU3RvcmFnZTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TGlzdFRvQVJlbWFpbmluZ0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0TGlzdCA9IE9iamVjdC5rZXlzKGxpc3RzKVswXTtcbiAgICAgICAgdGhpcy5tYWtlQ3VycmVudExpc3QoZmlyc3RMaXN0KTtcbiAgICB9XG5cbiAgICBkZWxldGVMaXN0KGxpc3ROYW1lKSB7XG4gICAgICAgIGRlbGV0ZSBsaXN0c1tsaXN0TmFtZV07XG4gICAgfVxuXG5cbiAgIFxufVxuXG5jb25zdCBsb2dpYyA9IG5ldyBMb2dpYygpO1xuXG4gICAgXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50TGlzdCcsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRMaXN0KSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xpc3RzJywgSlNPTi5zdHJpbmdpZnkobGlzdHMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmV4dExpc3RJZCcsIEpTT04uc3RyaW5naWZ5KG5leHRMaXN0SWQpKTtcbn0pXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgICBpZihPYmplY3Qua2V5cyhsb2NhbFN0b3JhZ2UpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZXMgc3R1ZmYgaW4gbG9jYWwgc3RvcmFnZScpO1xuICAgICAgICAgICAgbG9naWMud3JpdGVPdmVyQ3VycmVudExpc3QoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudExpc3QnKSkpO1xuICAgICAgICAgICAgbGlzdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsaXN0cycpKTtcbiAgICAgICAgICAgIG5leHRMaXN0SWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduZXh0TGlzdElkJykpO1xuICAgICAgICAgICAgZG9tQ29udHJvbGxlci5yZW5kZXJMaXN0cygpO1xuICAgICAgICAgICAgZG9tQ29udHJvbGxlci5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgZG9tQ29udHJvbGxlci51cGRhdGVDb2x1bW5OYW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vdGhpbmcgaW4gbG9jYWwgc3RvcmFnZScpO1xuICAgICAgICBsb2dpYy5zZXREZWZhdWx0TGlzdCgpO1xuICAgIH1cbn0pXG5cblxuZXhwb3J0IHtjdXJyZW50TGlzdCwgbGlzdHMsIGxvZ2ljLCBuZXh0TGlzdElkfTtcbiIsImNsYXNzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9IFwiXCIsIHRhc2tJZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgICAgICB0aGlzLnRhc2tJZCA9IHRhc2tJZDtcbiAgICB9XG5cblxuXG59XG5cbmV4cG9ydCB7IFRhc2sgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7ZG9tQ29udHJvbGxlcn0gZnJvbSAnLi9tb2R1bGVzL0RvbUNvbnRyb2xsZXInO1xuXG5cblxuXG5cblxuZG9tQ29udHJvbGxlci5pbml0aWFsaXplQ2xpY2tFdmVudExpc3RlbmVycygpO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
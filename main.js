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
      var target;

      if (e.target.closest('i')) {
        target = e.target.closest('i');

        if (target.classList.contains('new-list-cancel-btn')) {
          e.preventDefault();
          target.parentElement.remove();
        }

        if (target.classList.contains('new-list-submit-btn')) {
          e.preventDefault();
          var listTextInput = target.previousElementSibling.previousElementSibling;
          var listName = target.previousElementSibling.previousElementSibling.value;
          this.newListSubmitBtnHandler(target, listName, listTextInput);
        }

        if (target.classList.contains('edit-list-icon')) {
          e.preventDefault();
          var listItem = target.parentElement.parentElement;
          var _listName = target.parentElement.parentElement.textContent;
          this.editListIconHandler(_listName, listItem);
        }

        if (target.classList.contains('edit-list-submit-btn')) {
          e.preventDefault();
          var textInput = target.previousElementSibling.previousElementSibling.previousElementSibling;
          var newName = target.previousElementSibling.previousElementSibling.previousElementSibling.value;

          if (newName === oldName) {
            textInput.focus();
            return;
          }

          this.editListSubmitBtnHandler(newName, textInput);
        }

        if (target.classList.contains('edit-list-cancel-btn')) {
          e.preventDefault();
          this.renderLists();
        }

        if (target.className === 'far fa-trash-alt list') {
          e.preventDefault();
          this.deleteListHandler();
        }
      }

      if (e.target.closest('div[class="task-date-btns"]') && e.target.className !== 'fas fa-edit') {
        var taskTarget = e.target.closest('div[class="task-date-btns"]').firstElementChild;
        var dateTarget = e.target.closest('div[class="task-date-btns"]').children[1].firstElementChild;
        this.toggleStrikethruTask(taskTarget, dateTarget);
      }

      target = e.target.closest('button, li');

      if (target) {
        if (target.className === 'menu-btn') {
          var menu = document.querySelector('.menu');
          this.menuBtnHandler(menu);
        }

        if (target.className === 'edit-task-btn') {
          var taskEditor = target.parentElement.parentElement.parentElement.children[1];
          var taskId = target.parentElement.parentElement.parentElement.dataset.id;
          this.taskEditorHandler(taskEditor, taskId);
        }

        if (target.className === 'edit-task-submit-btn') {
          e.preventDefault();
          this.editTaskSubmitBtnHandler(target);
        }

        if (target.className === 'new-task-btn') {
          var newTaskEditor = target.previousElementSibling;
          this.newTaskBtnHandler(newTaskEditor);
        }

        if (target.className === 'task-delete-btn') {
          e.preventDefault();
          this.taskDeleteBtnHandler(target);
        }

        if (target.className === 'cancel-new-task-btn') {
          e.preventDefault();
          var _newTaskEditor = target.parentElement.parentElement.parentElement;
          this.cancelNewTaskBtnHandler(_newTaskEditor);
        }

        if (target.classList.contains('add-list-btn')) {
          e.preventDefault();
          this.addListBtnHandler();
        }

        if (target.className === 'list menu-btn' && !target.children[1].matches('input')) {
          var _listName2 = target.childNodes[1].textContent;
          this.changeListHandler(_listName2);
        }

        if (target.className === 'menu-btn all') {
          e.preventDefault();
          this.renderTasks();
        }

        if (target.className === 'menu-btn today') {
          e.preventDefault();
          this.viewOnlyToday();
        }

        if (target.className === 'menu-btn week') {
          e.preventDefault();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsib2xkTmFtZSIsIkRvbUNvbnRyb2xsZXIiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGljayIsImJpbmQiLCJlIiwidGFyZ2V0IiwiY2xvc2VzdCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnRFbGVtZW50IiwicmVtb3ZlIiwibGlzdFRleHRJbnB1dCIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJsaXN0TmFtZSIsInZhbHVlIiwibmV3TGlzdFN1Ym1pdEJ0bkhhbmRsZXIiLCJsaXN0SXRlbSIsInRleHRDb250ZW50IiwiZWRpdExpc3RJY29uSGFuZGxlciIsInRleHRJbnB1dCIsIm5ld05hbWUiLCJmb2N1cyIsImVkaXRMaXN0U3VibWl0QnRuSGFuZGxlciIsInJlbmRlckxpc3RzIiwiY2xhc3NOYW1lIiwiZGVsZXRlTGlzdEhhbmRsZXIiLCJ0YXNrVGFyZ2V0IiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJkYXRlVGFyZ2V0IiwiY2hpbGRyZW4iLCJ0b2dnbGVTdHJpa2V0aHJ1VGFzayIsIm1lbnUiLCJxdWVyeVNlbGVjdG9yIiwibWVudUJ0bkhhbmRsZXIiLCJ0YXNrRWRpdG9yIiwidGFza0lkIiwiZGF0YXNldCIsImlkIiwidGFza0VkaXRvckhhbmRsZXIiLCJlZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIiLCJuZXdUYXNrRWRpdG9yIiwibmV3VGFza0J0bkhhbmRsZXIiLCJ0YXNrRGVsZXRlQnRuSGFuZGxlciIsImNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyIiwiYWRkTGlzdEJ0bkhhbmRsZXIiLCJtYXRjaGVzIiwiY2hpbGROb2RlcyIsImNoYW5nZUxpc3RIYW5kbGVyIiwicmVuZGVyVGFza3MiLCJ2aWV3T25seVRvZGF5Iiwidmlld09ubHlXZWVrIiwidG9nZ2xlIiwidWxGb3JUYXNrcyIsImlubmVySFRNTCIsIk9iamVjdCIsInZhbHVlcyIsImN1cnJlbnRMaXN0IiwiZmlsdGVyIiwidGFzayIsImR1ZURhdGVPYmoiLCJEYXRlIiwiZHVlRGF0ZSIsIk1hdGgiLCJhYnMiLCJub3ciLCJodG1sIiwiY3JlYXRlVGFza0hUTUwiLCJuYW1lIiwiY3JlYXRlUmVhZGFibGVEYXRlIiwiZHVlRGF0ZURheSIsImdldFVUQ0RhdGUiLCJkdWVEYXRlTW9udGgiLCJnZXRVVENNb250aCIsImR1ZURhdGVZZWFyIiwiZ2V0VVRDRnVsbFllYXIiLCJjdXJyZW50RGF5IiwiY3VycmVudE1vbnRoIiwiY3VycmVudFllYXIiLCJjb2x1bW5OYW1lIiwicmVhbGx5RGVsZXRlIiwiY29uZmlybSIsImtleXMiLCJsaXN0cyIsImxlbmd0aCIsImxvZ2ljIiwidXBkYXRlQ29sdW1uTmFtZSIsImFsZXJ0IiwidWwiLCJzb3J0ZWRMaXN0cyIsInNvcnQiLCJsaXN0MSIsImxpc3QyIiwibGlzdCIsImRpc3BsYXkiLCJ3aW5kb3ciLCJnZXRDb21wdXRlZFN0eWxlIiwic3R5bGUiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJpIiwiYXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwidGFza1RleHRJbnB1dCIsImRldGFpbHNUZXh0YXJlYSIsIm5leHRFbGVtZW50U2libGluZyIsImRhdGVwaWNrZXIiLCJkZXRhaWxzIiwidmFsdWVBc051bWJlciIsInRhc2tOYW1lIiwidmFsdWVBc0RhdGUiLCJkdWVEYXRlSXNWYWxpZCIsInRhc2tJc05ldyIsImN1cnJlbnRUaW1lIiwiZHVlRGF0ZVZhbHVlQXNOdW1iZXIiLCJpc05hTiIsImRhdGVWYWx1ZUFzTnVtYmVyIiwiZGF0ZSIsIm1vbnRoIiwiZGF5IiwieWVhciIsImRvbUNvbnRyb2xsZXIiLCJMaXN0IiwidGFza3MiLCJuZXh0TGlzdElkIiwiTG9naWMiLCJUYXNrIiwibmV3TGlzdCIsImNob3JlcyIsIkNob3JlcyIsIm1ha2VDdXJyZW50TGlzdCIsImRhdGFGcm9tU3RvcmFnZSIsImZpcnN0TGlzdCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiY29uc29sZSIsImxvZyIsIndyaXRlT3ZlckN1cnJlbnRMaXN0IiwicGFyc2UiLCJnZXRJdGVtIiwic2V0RGVmYXVsdExpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBSUEsT0FBSjs7SUFHTUMsYTtBQUVGLDJCQUFlO0FBQUE7QUFBRTs7OztXQUVqQix5Q0FBZ0M7QUFDNUJDLGNBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsS0FBS0MsV0FBTCxDQUFpQkMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBbkM7QUFDSDs7O1dBRUQscUJBQVlDLENBQVosRUFBZTtBQUNYLFVBQUlDLE1BQUo7O0FBRUEsVUFBR0QsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLE9BQVQsQ0FBaUIsR0FBakIsQ0FBSCxFQUEwQjtBQUN0QkQsY0FBTSxHQUFHRCxDQUFDLENBQUNDLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQixHQUFqQixDQUFUOztB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RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05BO0FBT0FzRiwrRkFBQSxHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2dpYywgY3VycmVudExpc3QsIGxpc3RzfSBmcm9tICcuL0xvZ2ljJztcblxubGV0IG9sZE5hbWU7XG5cblxuY2xhc3MgRG9tQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpICB7fVxuXG4gICAgaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICBsZXQgdGFyZ2V0O1xuXG4gICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJ2knKSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnaScpO1xuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWxpc3QtY2FuY2VsLWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV3LWxpc3Qtc3VibWl0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RUZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1saXN0LWljb24nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RJY29uSGFuZGxlcihsaXN0TmFtZSwgbGlzdEl0ZW0pOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1zdWJtaXQtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dElucHV0ID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld05hbWUgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYobmV3TmFtZSA9PT0gb2xkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyKG5ld05hbWUsIHRleHRJbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWxpc3QtY2FuY2VsLWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdmYXIgZmEtdHJhc2gtYWx0IGxpc3QnKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlTGlzdEhhbmRsZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoZS50YXJnZXQuY2xvc2VzdCgnZGl2W2NsYXNzPVwidGFzay1kYXRlLWJ0bnNcIl0nKSAmJiBlLnRhcmdldC5jbGFzc05hbWUgIT09ICdmYXMgZmEtZWRpdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tUYXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdkaXZbY2xhc3M9XCJ0YXNrLWRhdGUtYnRuc1wiXScpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2RpdltjbGFzcz1cInRhc2stZGF0ZS1idG5zXCJdJykuY2hpbGRyZW5bMV0uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN0cmlrZXRocnVUYXNrKHRhc2tUYXJnZXQsIGRhdGVUYXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBsaScpO1xuXG4gICAgICAgIGlmKHRhcmdldCkge1xuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuICAgICAgICAgICAgICAgIHRoaXMubWVudUJ0bkhhbmRsZXIobWVudSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnZWRpdC10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkOyAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMudGFza0VkaXRvckhhbmRsZXIodGFza0VkaXRvciwgdGFza0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2stc3VibWl0LWJ0bicpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICduZXctdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0VkaXRvciA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAndGFzay1kZWxldGUtYnRuJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnY2FuY2VsLW5ldy10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0VkaXRvciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLWxpc3QtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRMaXN0QnRuSGFuZGxlcigpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdsaXN0IG1lbnUtYnRuJyAmJiAhdGFyZ2V0LmNoaWxkcmVuWzFdLm1hdGNoZXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0TmFtZSA9IHRhcmdldC5jaGlsZE5vZGVzWzFdLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlTGlzdEhhbmRsZXIobGlzdE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuIGFsbCcpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuIHRvZGF5Jykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdPbmx5VG9kYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdtZW51LWJ0biB3ZWVrJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdPbmx5V2VlaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlU3RyaWtldGhydVRhc2sodGFza1RhcmdldCwgZGF0ZVRhcmdldCkge1xuICAgICAgICB0YXNrVGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3N0cmlrZXRocnUnKTtcbiAgICAgICAgZGF0ZVRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdzdHJpa2V0aHJ1Jyk7XG4gICAgfVxuXG4gICAgdmlld09ubHlXZWVrKCkge1xuICAgICAgICBjb25zdCB1bEZvclRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZS10YXNrLWl0ZW1zJyk7XG4gICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKS5maWx0ZXIodGFzayA9PiB7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlT2JqID0gbmV3IERhdGUodGFzay5kdWVEYXRlKTtcblxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKERhdGUubm93KCkgLSBkdWVEYXRlT2JqKSA8PSA2LjA0OGU4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KSkge1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMuY3JlYXRlVGFza0hUTUwodGFzay50YXNrSWQsIHRhc2submFtZSwgdGFzay5kdWVEYXRlKTtcbiAgICAgICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVUYXNrSFRNTCh0YXNrSWQsIG5hbWUsIGR1ZURhdGUpIHtcbiAgICAgICAgY29uc3QgaHRtbCA9IGA8bGkgY2xhc3M9XCJ0b2RvLWl0ZW1cIiBkYXRhLWlkPVwiJHt0YXNrSWR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWRhdGUtYnRuc1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YXNrXCI+JHtuYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlLWFuZC1idG5zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkdWUtZGF0ZVwiPiR7dGhpcy5jcmVhdGVSZWFkYWJsZURhdGUoZHVlRGF0ZSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LXRhc2stYnRuXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdFwiPjwvaT48L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWVkaXRvciBoaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gYWN0aW9uPVwiXCIgbWV0aG9kPVwiZ2V0XCIgY2xhc3M9XCJ0YXNrLWVkaXRvci1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0YXNrLWZpZWxkXCIgbmFtZT1cInRhc2tcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVGFza1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJkZXNjcmlwdGlvbi1maWVsZFwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwiRGV0YWlsc1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1hZGRidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkYXRlLXBpY2tlclwiIG5hbWU9XCJkdWUtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidGFzay1kZWxldGUtYnRuXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0XCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LXRhc2stc3VibWl0LWJ0blwiPjxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLWNpcmNsZVwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPmA7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cblxuICAgIHZpZXdPbmx5VG9kYXkoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpLmZpbHRlcih0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGVPYmogPSBuZXcgRGF0ZSh0YXNrLmR1ZURhdGUpO1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZURheSA9IGR1ZURhdGVPYmouZ2V0VVRDRGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZU1vbnRoID0gZHVlRGF0ZU9iai5nZXRVVENNb250aCgpO1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZVllYXIgPSBkdWVEYXRlT2JqLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF5ID0gbmV3IERhdGUoKS5nZXRVVENEYXRlKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TW9udGggPSBuZXcgRGF0ZSgpLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0VVRDRnVsbFllYXIoKTtcblxuICAgICAgICAgICAgaWYgKGR1ZURhdGVEYXkgPT09IGN1cnJlbnREYXkgJiYgZHVlRGF0ZU1vbnRoID09PSBjdXJyZW50TW9udGggJiYgZHVlRGF0ZVllYXIgPT09IGN1cnJlbnRZZWFyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KSkge1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMuY3JlYXRlVGFza0hUTUwodGFzay50YXNrSWQsIHRhc2submFtZSwgdGFzay5kdWVEYXRlKTtcbiAgICAgICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDb2x1bW5OYW1lKCkge1xuICAgICAgICBjb25zdCBjb2x1bW5OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtY29sdW1uLW5hbWUnKTtcbiAgICAgICAgY29sdW1uTmFtZS50ZXh0Q29udGVudCA9IGN1cnJlbnRMaXN0Lm5hbWU7XG4gICAgfVxuXG4gXG5cbiAgICBkZWxldGVMaXN0SGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgcmVhbGx5RGVsZXRlID0gY29uZmlybShgQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSAke29sZE5hbWV9IGxpc3QgYW5kIGFsbCBhc3NvY2lhdGVkIHRhc2tzP2ApO1xuICAgICAgICBpZihyZWFsbHlEZWxldGUpIHtcbiAgICAgICAgICAgIGlmKE9iamVjdC5rZXlzKGxpc3RzKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbG9naWMuZGVsZXRlTGlzdChvbGROYW1lKTtcbiAgICAgICAgICAgICAgICBsb2dpYy5zZXRDdXJyZW50TGlzdFRvQVJlbWFpbmluZ0xpc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29sdW1uTmFtZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnVW5hYmxlIHRvIGRlbGV0ZSB5b3VyIG9ubHkgbGlzdCEnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVMaXN0QnRuSGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgcmVhbGx5RGVsZXRlID0gY29uZmlybShgQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSAke29sZE5hbWV9IGxpc3QgYW5kIGFsbCBvZiBpdCdzIGFzc29jaWF0ZWQgdGFza3M/YCk7XG4gICAgICAgIGlmKHJlYWxseURlbGV0ZSkge1xuICAgICAgICAgICAgZGVsZXRlIGxpc3RzW29sZE5hbWVdO1xuICAgICAgICAgICAgaWYoT2JqZWN0LmtleXMobGlzdHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxvZ2ljLnNldEN1cnJlbnR5TGlzdCA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgeyBsb2dpYy5zZXROZXh0TGlzdEFzQ3VycmVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpOyAgIFxuICAgICAgICB9IGVsc2UgdGhpcy5yZW5kZXJMaXN0cygpO1xuXG4gICAgfVxuXG4gICAgZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyKG5ld05hbWUsIHRleHRJbnB1dCkge1xuICAgICAgICBpZihuZXdOYW1lID09PSAnJykge1xuICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbG9naWMubW9kaWZ5TGlzdE5hbWUob2xkTmFtZSwgbmV3TmFtZSk7XG4gICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VMaXN0SGFuZGxlcihuZXdOYW1lKTtcbiAgICB9XG5cbiAgICBlZGl0TGlzdEljb25IYW5kbGVyKGxpc3ROYW1lLCBsaXN0SXRlbSkge1xuICAgICAgICBvbGROYW1lID0gbGlzdE5hbWU7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtbGlzdC1hbHRcIj48L2k+PGlucHV0IGNsYXNzPVwibmV3LWxpc3QtdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke2xpc3ROYW1lfVwiIC8+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0IGxpc3RcIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIGVkaXQtbGlzdC1jYW5jZWwtYnRuXCI+PC9pPjxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLWNpcmNsZSBlZGl0LWxpc3Qtc3VibWl0LWJ0blwiPjwvaT5gO1xuICAgICAgICBsaXN0SXRlbS5pbm5lckhUTUwgPSBodG1sO1xuICAgIH1cblxuICAgIGNoYW5nZUxpc3RIYW5kbGVyKGxpc3ROYW1lKSB7XG4gICAgICAgIGxvZ2ljLm1ha2VDdXJyZW50TGlzdChsaXN0TmFtZSk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgY29uc3QgY29sdW1uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWNvbHVtbi1uYW1lJyk7XG4gICAgICAgIGNvbHVtbk5hbWUudGV4dENvbnRlbnQgPSBsaXN0TmFtZTtcbiAgICB9XG5cblxuICAgIG5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpIHtcbiAgICAgICAgaWYobGlzdE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICBsaXN0VGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbG9naWMuY3JlYXRlTmV3TGlzdChsaXN0TmFtZSk7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdEhhbmRsZXIobGlzdE5hbWUpO1xuICAgIH1cblxuICAgIHJlbmRlckxpc3RzKCkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bC1saXN0LW9mLWxpc3RzJyk7XG4gICAgICAgIGxldCBodG1sID0gJyc7XG4gICAgICAgIGNvbnN0IHNvcnRlZExpc3RzID0gT2JqZWN0LnZhbHVlcyhsaXN0cykuc29ydCgobGlzdDEsIGxpc3QyKSA9PiB7XG4gICAgICAgICAgICBpZihsaXN0MS5pZCA+IGxpc3QyLmlkKSByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmIChsaXN0MS5pZCA9PT0gbGlzdDIuaWQpIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKGxpc3QxLmlkIDwgbGlzdDIuaWQpIHJldHVybiAtMTtcbiAgICAgICAgfSk7IFxuICAgICAgICBmb3IgKGNvbnN0IGxpc3Qgb2Ygc29ydGVkTGlzdHMpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gYDxsaSBjbGFzcz1cImxpc3QgbWVudS1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdCBlZGl0LWxpc3QtaWNvblwiPjwvaT4ke2xpc3QubmFtZX08c3BhbiBjbGFzcz1cImVkaXQtbGlzdC1pY29uXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdCBlZGl0LWxpc3QtaWNvblwiPjwvaT48L3NwYW4+PC9saT5gO1xuICAgICAgICB9XG4gICAgICAgIHVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuXG4gICAgbWVudUJ0bkhhbmRsZXIobWVudSkge1xuICAgICAgICBjb25zdCBkaXNwbGF5ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobWVudSkuZGlzcGxheTtcbiAgICAgICAgaWYoZGlzcGxheSA9PT0gJ25vbmUnKXtcbiAgICAgICAgICAgIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBtZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgYWRkTGlzdEJ0bkhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVsLWxpc3Qtb2YtbGlzdHMnKTtcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdsaXN0JywgJ21lbnUtYnRuJyk7XG4gICAgICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnZmFzJywgJ2ZhLWxpc3QtYWx0Jyk7XG4gICAgICAgIGxpLmFwcGVuZChpKTtcbiAgICAgICAgY29uc3QgdGV4dElucHV0ID0gYDxpbnB1dCBjbGFzcz1cIm5ldy1saXN0LXRleHQtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+PGkgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIG5ldy1saXN0LWNhbmNlbC1idG5cIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlIG5ldy1saXN0LXN1Ym1pdC1idG5cIj48L2k+YDtcbiAgICAgICAgbGkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0ZXh0SW5wdXQpO1xuICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgIH1cblxuICAgIHRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xuICAgICAgICBsb2dpYy5kZWxldGVUYXNrKHRhc2tJZCk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICB0YXNrRWRpdG9ySGFuZGxlcih0YXNrRWRpdG9yLCB0YXNrSWQpIHtcbiAgICAgICAgdGFza0VkaXRvci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgY29uc3QgdGFza1RleHRJbnB1dCA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIGNvbnN0IGRldGFpbHNUZXh0YXJlYSA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb25zdCBkYXRlcGlja2VyID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIFxuICAgICAgICB0YXNrVGV4dElucHV0LnZhbHVlID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5uYW1lO1xuICAgICBcbiAgICAgICAgZGV0YWlsc1RleHRhcmVhLnZhbHVlID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5kZXRhaWxzO1xuICAgICAgICBkYXRlcGlja2VyLnZhbHVlQXNOdW1iZXIgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLmR1ZURhdGU7XG4gICAgfVxuXG4gICAgZWRpdFRhc2tTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGFza05hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLnZhbHVlO1xuICAgICAgICBjb25zdCBkZXRhaWxzID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsxXS52YWx1ZTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQudmFsdWVBc0RhdGU7XG5cbiAgICAgICAgaWYoIXRoaXMuZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZSkpe1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXRhc2tOYW1lKSB7XG4gICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0YXNrTmFtZSAmJiB0aGlzLmR1ZURhdGVJc1ZhbGlkKGR1ZURhdGUpKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrSXNOZXcgPSAodGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWVkaXRvcicpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpOyAvL3dpbGwgdXNlIGN1cnJlbnRUaW1lIGFzIGEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIGVhY2ggdGFza1xuXG4gICAgICAgICAgICBpZih0YXNrSXNOZXcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrID0gbG9naWMuY3JlYXRlTmV3VGFzayh0YXNrTmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgY3VycmVudFRpbWUpO1xuICAgICAgICAgICAgICAgIGxvZ2ljLmFkZFRhc2tUb0N1cnJlbnRMaXN0KHRhc2spOyAvL2hlcmU/XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXRhc2tJc05ldykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7XG4gICAgICAgICAgICAgICAgbG9naWMubW9kaWZ5VGFzayh0YXNrTmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgdGFza0lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0YXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgaWYodGFza0VkaXRvci5jbGFzc05hbWUgPT09ICduZXctdGFzay1lZGl0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlblsxXS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkcmVuWzJdLmZpcnN0RWxlbWVudENoaWxkLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGFza0VkaXRvci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGR1ZURhdGVJc1ZhbGlkKGR1ZURhdGVWYWx1ZUFzTnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKGR1ZURhdGVWYWx1ZUFzTnVtYmVyKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjYW5jZWxOZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKSB7XG4gICAgICAgIG5ld1Rhc2tFZGl0b3IuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgbmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcikge1xuICAgICAgICBuZXdUYXNrRWRpdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIHJlbmRlclRhc2tzKCkge1xuICAgICAgICBjb25zdCB1bEZvclRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRoZS10YXNrLWl0ZW1zJyk7XG4gICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGlmKGN1cnJlbnRMaXN0ID09PSBudWxsKSB1bEZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSB0aGlzLmNyZWF0ZVRhc2tIVE1MKHRhc2sudGFza0lkLCB0YXNrLm5hbWUsIHRhc2suZHVlRGF0ZSk7IC8vaGVyZVxuICAgICAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgKz0gaHRtbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVJlYWRhYmxlRGF0ZShkYXRlVmFsdWVBc051bWJlcikge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVZhbHVlQXNOdW1iZXIpO1xuICAgICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0VVRDTW9udGgoKSArIDE7XG4gICAgICAgIGNvbnN0IGRheSA9IGRhdGUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBkb21Db250cm9sbGVyID0gbmV3IERvbUNvbnRyb2xsZXIoKTtcblxuXG5cbi8vaXNzdWVzLiAgY2FuJ3QgZ2V0IHRhc2sgbmFtZSB0byB3cmFwIGF0IDUwJTsiLCJjbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0ge307XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG59XG5cbmV4cG9ydCB7IExpc3QgfTsiLCJpbXBvcnQge1Rhc2t9IGZyb20gJy4vVGFzayc7XG5pbXBvcnQge0xpc3R9IGZyb20gJy4vTGlzdCc7XG5pbXBvcnQgeyBkb21Db250cm9sbGVyIH0gZnJvbSAnLi9Eb21Db250cm9sbGVyJztcblxubGV0IGN1cnJlbnRMaXN0O1xubGV0IG5leHRMaXN0SWQgPSAwO1xuXG5sZXQgbGlzdHMgPSB7fTtcblxuXG5jbGFzcyBMb2dpYyB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgY3JlYXRlTmV3VGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gXCJcIiwgdGFza0lkKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCB0YXNrSWQpO1xuICAgIH1cblxuICAgIGFkZFRhc2tUb0N1cnJlbnRMaXN0KHRhc2spIHtcbiAgICAgICAgY3VycmVudExpc3QudGFza3NbdGFzay50YXNrSWRdID0gdGFzaztcbiAgICB9XG5cbiAgICBtb2RpZnlUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSAnJywgdGFza0lkKSB7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKSkge1xuICAgICAgICAgICAgaWYodGFzay50YXNrSWQgPT0gdGFza0lkKSB7XG4gICAgICAgICAgICAgICAgdGFzay5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICB0YXNrLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICAgICAgICAgIHRhc2suZGV0YWlscyA9IGRldGFpbHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVUYXNrKHRhc2spIHtcbiAgICAgICAgZGVsZXRlIGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tdO1xuICAgIH1cblxuICAgIGNyZWF0ZU5ld0xpc3QobmFtZSkge1xuICAgICAgICBjb25zdCBuZXdMaXN0ID0gbmV3IExpc3QobmFtZSwgbmV4dExpc3RJZCsrKTtcbiAgICAgICAgbGlzdHNbbmFtZV0gPSBuZXdMaXN0O1xuICAgIH1cblxuICAgIG1vZGlmeUxpc3ROYW1lKG9sZE5hbWUsIG5ld05hbWUpIHtcbiAgICAgICAgbGlzdHNbbmV3TmFtZV0gPSBsaXN0c1tvbGROYW1lXTtcbiAgICAgICAgZGVsZXRlIGxpc3RzW29sZE5hbWVdO1xuICAgICAgICBsaXN0c1tuZXdOYW1lXS5uYW1lID0gbmV3TmFtZTtcbiAgICB9XG5cbiAgICBcbiAgICBzZXREZWZhdWx0TGlzdCgpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGxpc3RzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGNob3JlcyA9IG5ldyBMaXN0KCdDaG9yZXMnLCBuZXh0TGlzdElkKyspO1xuICAgICAgICAgICAgbGlzdHMuQ2hvcmVzID0gY2hvcmVzO1xuICAgICAgICAgICAgdGhpcy5tYWtlQ3VycmVudExpc3QoJ0Nob3JlcycpO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIG1ha2VDdXJyZW50TGlzdChsaXN0TmFtZSkge1xuICAgICAgICBjdXJyZW50TGlzdCA9IGxpc3RzW2xpc3ROYW1lXTtcbiAgICB9XG5cbiAgICB3cml0ZU92ZXJDdXJyZW50TGlzdChkYXRhRnJvbVN0b3JhZ2UpIHtcbiAgICAgICAgY3VycmVudExpc3QgPSBkYXRhRnJvbVN0b3JhZ2U7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudExpc3RUb0FSZW1haW5pbmdMaXN0KCkge1xuICAgICAgICBjb25zdCBmaXJzdExpc3QgPSBPYmplY3Qua2V5cyhsaXN0cylbMF07XG4gICAgICAgIHRoaXMubWFrZUN1cnJlbnRMaXN0KGZpcnN0TGlzdCk7XG4gICAgfVxuXG4gICAgZGVsZXRlTGlzdChsaXN0TmFtZSkge1xuICAgICAgICBkZWxldGUgbGlzdHNbbGlzdE5hbWVdO1xuICAgIH1cblxuXG4gICBcbn1cblxuY29uc3QgbG9naWMgPSBuZXcgTG9naWMoKTtcblxuICAgIFxuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudExpc3QnLCBKU09OLnN0cmluZ2lmeShjdXJyZW50TGlzdCkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0cycsIEpTT04uc3RyaW5naWZ5KGxpc3RzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25leHRMaXN0SWQnLCBKU09OLnN0cmluZ2lmeShuZXh0TGlzdElkKSk7XG59KVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYoT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlcmVzIHN0dWZmIGluIGxvY2FsIHN0b3JhZ2UnKTtcbiAgICAgICAgICAgIGxvZ2ljLndyaXRlT3ZlckN1cnJlbnRMaXN0KEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRMaXN0JykpKTtcbiAgICAgICAgICAgIGxpc3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdHMnKSk7XG4gICAgICAgICAgICBuZXh0TGlzdElkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmV4dExpc3RJZCcpKTtcbiAgICAgICAgICAgIGRvbUNvbnRyb2xsZXIucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIGRvbUNvbnRyb2xsZXIucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIGRvbUNvbnRyb2xsZXIudXBkYXRlQ29sdW1uTmFtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RoaW5nIGluIGxvY2FsIHN0b3JhZ2UnKTtcbiAgICAgICAgbG9naWMuc2V0RGVmYXVsdExpc3QoKTtcbiAgICB9XG59KVxuXG5cbmV4cG9ydCB7Y3VycmVudExpc3QsIGxpc3RzLCBsb2dpYywgbmV4dExpc3RJZH07XG4iLCJjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSBcIlwiLCB0YXNrSWQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICAgICAgdGhpcy50YXNrSWQgPSB0YXNrSWQ7XG4gICAgfVxuXG5cblxufVxuXG5leHBvcnQgeyBUYXNrIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2RvbUNvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy9Eb21Db250cm9sbGVyJztcblxuXG5cblxuXG5cbmRvbUNvbnRyb2xsZXIuaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
import logic from './Logic';
import { loadToDoListDataFromFirestore } from './Firebase.js';


class DomController {

    constructor()  {
        this.oldListName = null; // this prop is needed for several functions
        this.listCurrentlyBeingEdited = false;
        this.taskCurrentlyBeingEdited = false;
    }

    initializeEventListeners() {
        document.addEventListener('click', this.handleClick.bind(this));
        document.addEventListener('DOMContentLoaded', loadToDoListDataFromFirestore);
        const textInput = document.querySelectorAll('input[type="text"]');
        textInput.forEach(textInput => {
            textInput.addEventListener('keydown', this.textInputKeydownHandler);
        });
    }

    textInputKeydownHandler(e) {
        if (e.key === 'Enter') e.preventDefault();
    }

    handleClick(e) {
        const targetName = e.target.className;
        const target = e.target;
        /* every switch case that involves a <button> element invokes
         e.preventDefault().  Otherwise it is omitted */
        switch (targetName) {
            case 'due-date':
            case 'date-and-btns':
            case 'task':
            case 'task-date-btns': 
            case 'details-hidden':
            case 'task strikethru':
            case 'due-date strikethru':
            case 'details':
                this.toggleStrikethru(target);
                break;

            case 'fas fa-edit task-edit-btn':
            case 'edit-task-btn': 
                e.preventDefault();      
                this.renderTaskEditor(target);
                break;

            case 'new-task-btn':
            case 'fas fa-plus new-task-plus': 
                e.preventDefault();
                this.addTaskBtnHandler(target);
                break;

            case 'task-delete-btn':
            case 'far fa-trash-alt edit-task-trashcan':
                e.preventDefault();
                this.taskDeleteBtnHandler(target);
                break;

            case 'cancel-new-task-btn':
            case 'far fa-times-circle cancel-new-task-icon': 
                e.preventDefault();
                this.cancelCreateNewTaskBtnHandler(target);
                break;

            case 'new-task-submit-btn':
            case 'edit-task-submit-btn':
            case 'far fa-check-circle new-task-checkmark':
            case 'far fa-check-circle edit-task-checkmark':  
                e.preventDefault();
                this.taskSubmitBtnHandler(target);
                break;

            case 'fas fa-grip-horizontal toggle-menu-btn-icon':
            case 'toggle-menu-btn': 
                e.preventDefault();
                this.toggleMenuBtnHandler();
                break;

            case 'fas fa-globe all-icon':
            case 'menu-btn all': 
            case 'no-styling all':
                e.preventDefault();
                this.viewAllBtnHandler();
                break;
            
            case 'menu-btn today':
            case 'fas fa-calendar-day day-icon':
            case 'no-styling day':
                e.preventDefault();
                this.viewOnlyToday();
                break;
            
            case 'menu-btn week':
            case 'fas fa-calendar-week week-icon':
            case 'no-styling week':
                e.preventDefault();
                this.viewOnlyWeek();
                break;
            
            case 'list-menu-btn':
            case 'list-name-text':
            case 'fas fa-list-alt list-menu-icon':
            case 'list-icon-and-text':
            case 'no-styling menu-list':
                e.preventDefault();
                this.listMenuBtnHandler(target);
                break;

            case 'fas fa-edit edit-list-graphic': 
                this.startToEditListNameBtnHandler(target); 
                break;
            

            case 'no-styling delete-list-trashcan':
            case 'far fa-trash-alt remove-list-trashcan':
                e.preventDefault();
                this.deleteList();
                break;
            
            case 'no-styling cancel-edit-list-button':
            case 'far fa-times-circle edit-list-cancel-btn':
                e.preventDefault();
                this.cancelEditListNameBtnHandler();
                break;
            
            case 'no-styling submit-edit-list-button':
            case 'far fa-check-circle edit-list-submit-btn': 
                e.preventDefault();
                this.editListNameSubmitBtnHandler(target);
                break;

            case 'no-styling list-add-btn':
            case 'menu-btn add-list-btn':
            case 'fas fa-plus add-list-plus-icon':
                e.preventDefault();
                this.addListBtnHandler();
                break;
            
            case 'far fa-times-circle new-list-cancel-btn':
            case 'no-styling new-list-x-out-btn':
                e.preventDefault();
                this.cancelNewListBtnHandler(target);
                break;

            case 'far fa-check-circle new-list-submit-btn':
            case 'no-styling new-list-checkmark-btn': 
                e.preventDefault();
                this.newListSubmitBtnHandler(target);
                break;

            case 'show-task-details-btn':
            case 'fas fa-book-open show-details-btn':
                e.preventDefault();
                this.showDetailsBtnHandler(target);
                break;
        
        }
    }

    toggleStrikethru(target) {
        const task = target.closest('.task-date-btns').firstElementChild;
        const date = target.closest('.task-date-btns').children[1]
        .firstElementChild;
        task.classList.toggle('strikethru');
        date.classList.toggle('strikethru');
    }

    renderTaskEditor(target) {
        const taskEditor = target.closest('.todo-item').children[1];
        const taskId = target.closest('.todo-item').dataset.id;   
        // if a task editor window is already open, do nothing 
        if(this.taskCurrentlyBeingEdited) return;
        this.taskCurrentlyBeingEdited = true;
        taskEditor.classList.toggle('hidden');
        const taskTextInput = taskEditor.firstElementChild.firstElementChild;
        const detailsTextarea = taskEditor.firstElementChild.firstElementChild
        .nextElementSibling;
        const datepicker = taskEditor.firstElementChild.firstElementChild
        .nextElementSibling.nextElementSibling.firstElementChild;
    
        taskTextInput.value = logic.currentList.tasks[taskId].name;
     
        detailsTextarea.value = logic.currentList.tasks[taskId].details;
        if(logic.currentList.tasks[taskId].dueDate) {
            datepicker.valueAsNumber = logic.currentList.tasks[taskId].dueDate;
        }   
    }

    addTaskBtnHandler(target) {
        const newTaskEditor = target.closest('.new-task-btn')
        .previousElementSibling;
        newTaskEditor.classList.remove('hidden');
    }

    taskDeleteBtnHandler(target) {
        this.taskCurrentlyBeingEdited = false;
        const taskId = target.closest('.todo-item').dataset.id;
        logic.deleteTask(taskId);
        this.renderTasks();
    }

    cancelCreateNewTaskBtnHandler(target) {
        const newTaskEditor = target.closest('.new-task-editor');
        newTaskEditor.classList.add('hidden');
    }

    toggleMenuBtnHandler() {
        const menu = document.querySelector('.menu');
        if(window.getComputedStyle(menu).display === 'none'){
            menu.style.display = 'block';
        }
        else menu.style.display = 'none';
    }

    viewAllBtnHandler() {
        this.taskCurrentlyBeingEdited = false;
        this.listCurrentlyBeingEdited = false;
        this.renderTasks();
    }

    viewOnlyToday() {
        this.taskCurrentlyBeingEdited = false;
        this.listCurrentlyBeingEdited = false;
        let ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        const tasksOfToday = Object.values(logic.currentList.tasks).filter(task => {
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
        });
        for (const task of tasksOfToday) {
            const {taskId, name, dueDate, details} = task;
            const html = this.createTaskHTML(taskId, name, dueDate, details);
            ulForTasks.innerHTML += html;
        }
    }

    viewOnlyWeek() {
        this.taskCurrentlyBeingEdited = false;
        this.listCurrentlyBeingEdited = false;
        let ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        const tasksOfWeek = Object.values(logic.currentList.tasks).filter(task => {
            const dueDateObj = new Date(task.dueDate);
            if (Math.abs(Date.now() - dueDateObj) <= 6.048e8) {
                return true;
            } else return false;
        });
        for (const task of tasksOfWeek) {
            const {taskId, name, dueDate, details} = task;
            const html = this.createTaskHTML(taskId, name, dueDate, details);
            ulForTasks.innerHTML += html;
        }
    }

    listMenuBtnHandler(target) {
        const listMenuBtn = target.closest('.list-menu-btn');
        if(listMenuBtn.children.length === 1) {
            // if the list was currently being edited, the listMenuBtn would have
            // a second child (a text input), so the following would not run
            const listName = listMenuBtn.children[0].children[0].children[1].textContent;
            this.switchList(listName);
        }
    }

    startToEditListNameBtnHandler(target) {
        /* if another list is being edited, won't allow another to be edited
        until the first one is finished */
        if (this.listCurrentlyBeingEdited) return;

        const listItem = target.closest('.list-menu-btn');
        const listName = target.previousElementSibling.children[1].textContent;
        this.listCurrentlyBeingEdited = true;
        this.oldListName = listName;
        const html = 
        `<i class="fas fa-list-alt list-menu-icon"></i>
        <input class="new-list-text-input" type="text" value="${listName}">
        <button class="no-styling delete-list-trashcan">
            <i class="far fa-trash-alt remove-list-trashcan"></i>
        </button>
        <button class="no-styling cancel-edit-list-button">
            <i class="far fa-times-circle edit-list-cancel-btn"></i>
        </button>
        <button class="no-styling submit-edit-list-button">
            <i class="far fa-check-circle edit-list-submit-btn"></i>
        </button>`;
        listItem.innerHTML = html;
    }

    deleteList() {
        this.listCurrentlyBeingEdited = false;
        this.taskCurrentlyBeingEdited = false;
        const reallyDelete = confirm(`Are you sure that you want to delete the ${this.oldListName} list and all associated tasks?`);
        if(reallyDelete) {
            if(Object.keys(logic.lists).length > 1) {
                logic.deleteList(this.oldListName);
                logic.setOneOfTheRemainingListsToBeCurrentList();
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

    cancelEditListNameBtnHandler() {
        this.listCurrentlyBeingEdited = false;
        this.renderLists();
    }

    editListNameSubmitBtnHandler(target) {
        const textInput = target.closest('.list-menu-btn').children[1];
        const newName = textInput.value;
        if(newName === this.oldListName) {
            textInput.focus();
            return;
        }
        if(newName === '') {
            // don't allow user to save list without name
            textInput.focus();
            return;
        }
        this.listCurrentlyBeingEdited = false;
        logic.modifyListName(this.oldListName, newName);
        this.renderLists();
        this.switchList(newName);
    }

    addListBtnHandler() {
        let ul = document.querySelector('.ul-list-of-lists');
        let li = document.createElement('li');
        li.classList.add('list-menu-btn');
        let i = document.createElement('i');
        i.classList.add('fas', 'fa-list-alt', 'list-menu-icon');
        li.append(i);
        const textInput = 
        `<input class="new-list-text-input" type="text">
        <button class="no-styling new-list-x-out-btn">
            <i class="far fa-times-circle new-list-cancel-btn"></i>
        </button>
        <button class="no-styling new-list-checkmark-btn">
            <i class="far fa-check-circle new-list-submit-btn">
            </i>
        </button>`;
        li.insertAdjacentHTML('beforeend', textInput);
        ul.append(li);
    }

    cancelNewListBtnHandler(target) {
        target.closest('.list-menu-btn').remove();
    }

    showDetailsBtnHandler(target) {
        const taskDateBtnsDiv = target.closest('.task-date-btns');
        const taskDetailsDiv = taskDateBtnsDiv.firstElementChild.firstElementChild;
        taskDetailsDiv.classList.toggle('hidden');
    }

    createTaskHTML(taskId, name, dueDate, details) {
        const html = 
        `<li class="todo-item" data-id="${taskId}">
            <div class="task-date-btns">
                <div class="task">${name}
                    <div class="hidden details">${details}</div>
                </div> 
                <div class="date-and-btns">
                    <span class="due-date">${this.createReadableDate(dueDate)}</span>

                    ${details !== '' ?
                    `<button class="show-task-details-btn">
                        <i class="fas fa-book-open show-details-btn"></i>
                    </button>` 
                    : ''}

                    <button class="edit-task-btn">
                        <i class="fas fa-edit task-edit-btn"></i>
                    </button>
                </div>
            </div>
            <div class="task-editor hidden">
                <form action="" method="get" class="task-editor-form">
                    <input class="task-field" name="task" type="text" placeholder="Task">
                    <textarea class="description-field" name="description" placeholder="Details">
                    </textarea>
                    <div class="datepicker-addbutton">
                        <input class="date-picker" name="due-date" type="date" required>
                        <button class="task-delete-btn">
                            <i class="far fa-trash-alt edit-task-trashcan"></i>
                        </button>
                        <button class="edit-task-submit-btn">
                            <i class="far fa-check-circle edit-task-checkmark"></i>
                        </button>
                    </div>
                </form>
            </div>
        </li>`;
        return html;
    }

    updateColumnName() {
        let columnName = document.querySelector('.list-column-name');
        columnName.textContent = logic.currentList.name;
    }

    switchList(listName) {
        this.taskCurrentlyBeingEdited = false;
        this.listCurrentlyBeingEdited = false;
        logic.makeCurrentList(listName);
        this.renderTasks();
        this.updateColumnName();
    }

    newListSubmitBtnHandler(target) {
        const listMenuBtn = target.closest('.list-menu-btn');
        const listTextInput = listMenuBtn.children[1];
        const listName = listTextInput.value;
        if(listName === '') {
            // don't allow user to save list without name
            listTextInput.focus();
            return;
        }
        logic.createNewList(listName);
        this.renderLists();
        this.switchList(listName);
    }

    renderLists() {
        let ul = document.querySelector('.ul-list-of-lists');
        let html = '';
        const sortedLists = Object.values(logic.lists).sort((list1, list2) => {
            if(list1.id > list2.id) return 1;
            if (list1.id === list2.id) return 0;
            if (list1.id < list2.id) return -1;
        }); 
        for (const list of sortedLists) {
            html += 
            `<li class="list-menu-btn">
                <button class="no-styling menu-list">
                    <span class="list-icon-and-text">
                        <i class="fas fa-list-alt list-menu-icon"></i>
                        <span class="list-name-text">${list.name}</span>
                    </span>
                    <i class="fas fa-edit edit-list-graphic"></i>
                    <!-- This is not semantically perfect because this edit-list
                    -graphic should be a button, but cannot nest a button inside
                     a button. Todo: improve -->
                </button>
            </li>`;
        }
        ul.innerHTML = html;
    }

    taskSubmitBtnHandler(target) {
        const taskEditorForm = target.closest('.task-editor-form');
        const taskName = taskEditorForm.children[0].value;
        const details = taskEditorForm.children[1].value;
        const dueDate = taskEditorForm.children[2].firstElementChild.valueAsDate;

        if(!this.dueDateIsValid(dueDate)){
            // if the date is not valid, bring the date picker into focus
            taskEditorForm.children[2].firstElementChild.focus();
        } else if(!taskName) {
            // don't allow user to save task without name
            taskEditorForm.children[0].focus();
        } else if (taskName.length > 125) {
            taskEditorForm.children[0].focus();
            alert('The task must be 125 characters or less.');
        }
        else if(taskName && this.dueDateIsValid(dueDate)) {
            const taskEditorDiv = taskEditorForm.parentElement;
            const taskIsNew = taskEditorDiv.className === 'new-task-editor';
            const currentTime = Date.now(); /* will use currentTime as a unique
            identifier for each task */

            if(taskIsNew) {
                const task = logic.createNewTask(
                    taskName, dueDate, details, currentTime);
                logic.addTaskToCurrentList(task); 
                this.renderTasks();
                taskEditorForm.firstElementChild.value = '';
                taskEditorForm.children[1].value = '';
                taskEditorForm.children[2].firstElementChild.value = '';
                taskEditorDiv.classList.toggle('hidden');
            } else if(!taskIsNew) {
                const taskId = target.closest('.todo-item').dataset.id
                logic.modifyTask(taskName, dueDate, details, taskId);
                this.renderTasks();
            }
        }
        this.taskCurrentlyBeingEdited = false;
    }

    dueDateIsValid(dueDateValueAsNumber) {
        return isNaN(dueDateValueAsNumber) ? false : true;
    }

    renderTasks() {
        let ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        if(logic.currentList === null) ulForTasks.innerHTML = '';
        for (const task of Object.values(logic.currentList.tasks)) {
            const {taskId, name, dueDate, details} = task;
            const html = this.createTaskHTML(taskId, name, dueDate, details); 
            ulForTasks.innerHTML += html;
        }
    }

    createReadableDate(dateValueAsNumber) {
        // if the user didn't put a due date, just return an empty str
        if(dateValueAsNumber === null) return '';
        const date = new Date(dateValueAsNumber);
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`;
    }

    renderDataFromFirestore() {
        this.renderLists();
        this.renderTasks();
        this.updateColumnName();
    }
}

export default new DomController();



//issues.  can't get task name to wrap at 50%;
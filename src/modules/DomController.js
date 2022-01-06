import logic from './Logic';
import { loadToDoListDataFromFirestore } from './Firestore.js';


class DomController {

    constructor()  {
        this.oldListName = null; // this prop is needed for several functions
        this.listCurrentlyBeingEdited = false;
        this.taskCurrentlyBeingEdited = false;
    }

    initializeEventListeners() {
        document.addEventListener('click', this.handleClick.bind(this));
        document.addEventListener('DOMContentLoaded', loadToDoListDataFromFirestore);
    }

    handleClick(e) {
        const targetName = e.target.className;
        const target = e.target;
        switch (targetName) {
            case 'due-date':
            case 'date-and-btns':
            case 'task':
            case 'task-date-btns': {
                const task = target.closest('.task-date-btns').firstElementChild;
                const date = target.closest('.task-date-btns').children[1]
                .firstElementChild;
                this.toggleStrikethru(task, date);
                break;
            }

            case 'fas fa-edit task-edit-btn':
            case 'edit-task-btn': {
                e.preventDefault();
                const taskEditor = target.closest('.todo-item').children[1];
                const taskId = target.closest('.todo-item').dataset.id;         
                this.renderTaskEditor(taskEditor, taskId);
                break;
            }

            case 'new-task-btn':
            case 'fas fa-plus new-task-plus': {
                e.preventDefault();
                const newTaskEditor = target.closest('.new-task-btn')
                .previousElementSibling;
                this.createNewTaskBtnHandler(newTaskEditor);
                break;
            }

            case 'task-delete-btn':
            case 'far fa-trash-alt edit-task-trashcan':
                e.preventDefault();
                this.taskDeleteBtnHandler(target);
                break;

            case 'cancel-new-task-btn':
            case 'far fa-times-circle cancel-new-task-icon': {
                e.preventDefault();
                const newTaskEditor = target.closest('.new-task-editor');
                this.cancelCreateNewTaskBtnHandler(newTaskEditor);
                break;
            }

            case 'new-task-submit-btn':
            case 'edit-task-submit-btn':
            case 'far fa-check-circle new-task-checkmark':
            case 'far fa-check-circle edit-task-checkmark':  
                e.preventDefault();
                this.taskSubmitBtnHandler(target);
                break;

            case 'fas fa-grip-horizontal menu-btn-icon':
            case 'menu-btn': {
                const menu = document.querySelector('.menu');
                this.menuBtnHandler(menu);
                break;
            }

            case 'fas fa-globe all-icon':
            case 'menu-btn all': 
            case 'no-styling all':
                this.taskCurrentlyBeingEdited = false;
                this.listCurrentlyBeingEdited = false;
                this.renderTasks();
                break;
            
            case 'menu-btn today':
            case 'fas fa-calendar-day day-icon':
            case 'no-styling day':
                this.viewOnlyToday();
                break;
            
            case 'menu-btn week':
            case 'fas fa-calendar-week week-icon':
            case 'no-styling week':
                this.viewOnlyWeek();
                break;
            
            case 'list-menu-btn':
            case 'list-name-text':
            case 'fas fa-list-alt list-menu-icon':
                this.listMenuBtnHandler(target);
                break;

            case 'fas fa-edit edit-list-graphic': {
                const listItem = target.closest('.list-menu-btn');
                const listName = listItem.textContent;
                this.startToEditListNameBtnHandler(listName, listItem); 
                break;
            }

            case 'far fa-trash-alt remove-list-trashcan':
                this.deleteList();
                break;
            
            case 'far fa-times-circle edit-list-cancel-btn':
                this.listCurrentlyBeingEdited = false;
                this.renderLists();
                break;
            
            case 'far fa-check-circle edit-list-submit-btn': {
                /* this btn is identical to the 'new-list-submit-btn', but 
                substitutes it when an existing list is currently being edited */
                const textInput = target.previousElementSibling
                .previousElementSibling.previousElementSibling;
                const newName = textInput.value;
                if(newName === this.oldListName) {
                     textInput.focus();
                     return;
                }
                this.editListNameSubmitBtnHandler(newName, textInput);
                break;
            }
            
                

        }
    }

    listMenuBtnHandler(target) {
        const listMenuBtn = target.closest('.list-menu-btn');
        if (!listMenuBtn.children[1].matches('input')) {
            const listName = listMenuBtn.children[0].children[1].textContent;
            this.switchList(listName);
        }
    }
    
    handleShmick(e) {
        /* writing this application was a learning process.  I attempted and
            succeeded in using one event listener with delegation for every
            click on the DOM.  doing so required a complex set of conditionals.*/ 
        
        // the following variable is declared for use in conditional statements
        let target;        
        if(e.target.closest('div[class="task-date-btns"]') && e.target.className !== 'fas fa-edit') {
            //strikes thru the name of the task and the due date if either one clicked on
            const task = e.target.closest('div[class="task-date-btns"]').firstElementChild;
            const date = e.target.closest('div[class="task-date-btns"]').children[1].firstElementChild;
            this.toggleStrikethru(taskTarget, dateTarget);
        } else if(e.target.closest('i')) {
            e.preventDefault();
            target = e.target.closest('i');
            if(target.classList.contains('new-list-cancel-btn')) {
                target.parentElement.remove();
            } else if(target.classList.contains('new-list-submit-btn')) {
                const listTextInput = target.previousElementSibling.previousElementSibling;
                const listName = target.previousElementSibling.previousElementSibling.value;
                this.newListSubmitBtnHandler(target, listName, listTextInput);
            } else if(target.classList.contains('edit-list-icon')) {
                const listItem = target.parentElement.parentElement;
                const listName = target.parentElement.parentElement.textContent;
                this.startToEditListNameBtnHandler(listName, listItem); 
            } else if(target.classList.contains('edit-list-submit-btn')) {
                /* this btn is identical to the 'new-list-submit-btn', but 
                substitutes it when an existing list is currently being edited */
                const textInput = target.previousElementSibling.previousElementSibling.previousElementSibling;
                const newName = target.previousElementSibling.previousElementSibling.previousElementSibling.value;
                if(newName === this.oldListName) {
                     textInput.focus();
                     return;
                }
                this.editListNameSubmitBtnHandler(newName, textInput);
            } else if(target.classList.contains('edit-list-cancel-btn')) {
                this.listCurrentlyBeingEdited = false;
                this.renderLists();
            } else if(target.className === 'far fa-trash-alt list') {
                this.deleteList();
            } else if(e.target.closest('button, li')) {
                target = e.target.closest('button, li');
                if(target.className === 'menu-btn') {
                    const menu = document.querySelector('.menu');
                    this.menuBtnHandler(menu);
                } else if(target.className === 'edit-task-btn') {
                    const taskEditor = target.parentElement.parentElement.parentElement.children[1];
                    const taskId = target.parentElement.parentElement.parentElement.dataset.id;         
                    this.renderTaskEditor(taskEditor, taskId);
                } else if(target.className === 'edit-task-submit-btn') {
                    this.taskSubmitBtnHandler(target);
                } else if(target.className === 'new-task-btn') {
                    const newTaskEditor = target.previousElementSibling;
                    this.createNewTaskBtnHandler(newTaskEditor);
                } else if(target.className === 'task-delete-btn') {
                    this.taskDeleteBtnHandler(target);
                } else if(target.className === 'cancel-new-task-btn') {
                    const newTaskEditor = target.parentElement.parentElement.parentElement;
                    this.cancelCreateNewTaskBtnHandler(newTaskEditor);
                } else if(target.classList.contains('add-list-btn')) {
                    this.addListBtnHandler();
                } 
            }
        } else {
            target = e.target.closest('button, li');
            if (target === null) {
                return;
            } else {
                if(target.className === 'new-task-btn') {
                    e.preventDefault();
                    const newTaskEditor = target.previousElementSibling;
                    this.createNewTaskBtnHandler(newTaskEditor);
                } else if(target.classList.contains('add-list-btn')) {
                    this.addListBtnHandler();
                } else if(target.className === 'list-menu-btn' && !target.children[1].matches('input')) {
                    const listName = target.childNodes[1].textContent;
                    this.switchList(listName);
                } else if(target.className === 'menu-btn all') {
                    this.taskCurrentlyBeingEdited = false;
                    this.listCurrentlyBeingEdited = false;
                    this.renderTasks();
                } else if(target.className === 'menu-btn today') {
                    this.viewOnlyToday();
                } else if(target.className === 'menu-btn week') {
                    this.viewOnlyWeek();
                } else if(target.className === 'edit-task-submit-btn') {
                    e.preventDefault();
                    this.taskSubmitBtnHandler(target);
                } else if(target.className === 'task-delete-btn') {
                    e.preventDefault();
                    this.taskDeleteBtnHandler(target);
                } else if(target.className === 'cancel-new-task-btn') {
                    e.preventDefault();
                    const newTaskEditor = target.parentElement.parentElement.parentElement;
                    this.cancelCreateNewTaskBtnHandler(newTaskEditor);
                }
            } 
        }
    }

    toggleStrikethru(taskTarget, dateTarget) {
        taskTarget.classList.toggle('strikethru');
        dateTarget.classList.toggle('strikethru');
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
                <button class="edit-task-btn"><i class="fas fa-edit task-edit-btn"></i></button>

            </div>
        </div>
    <div class="task-editor hidden">
                    <form action="" method="get" class="task-editor-form">
                        <input class="task-field" name="task" type="text" placeholder="Task" />
                        <textarea class="description-field" name="description" placeholder="Details"></textarea>
                        <div class="datepicker-addbutton">
                            <input class="date-picker" name="due-date" type="date" required />
                            <button class="task-delete-btn"><i class="far fa-trash-alt edit-task-trashcan"></i></button>
                            <button class="edit-task-submit-btn"><i class="far fa-check-circle edit-task-checkmark"></i></button>
                        </div>
                    </form>
                </div>
            </li>`;
        return html;
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
            const html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
            ulForTasks.innerHTML += html;
        }
    }

    updateColumnName() {
        let columnName = document.querySelector('.list-column-name');
        columnName.textContent = logic.currentList.name;
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

    editListNameSubmitBtnHandler(newName, textInput) {
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

    startToEditListNameBtnHandler(listName, listItem) {
        /* if another list is being edited, won't allow another to be edited
        until the first one is finished */
        if (this.listCurrentlyBeingEdited) return;
        this.listCurrentlyBeingEdited = true;
        this.oldListName = listName;
        const html = `<i class="fas fa-list-alt list-menu-icon"></i><input class="new-list-text-input" type="text" value="${listName}" /><button class="no-styling delete-list-trashcan"><i class="far fa-trash-alt remove-list-trashcan"></i></button><button class="no-styling cancel-edit-list-button"><i class="far fa-times-circle edit-list-cancel-btn"></i></button><button class="no-styling submit-edit-list-button"><i class="far fa-check-circle edit-list-submit-btn"></i></button>`;
        listItem.innerHTML = html;
    }

    switchList(listName) {
        this.taskCurrentlyBeingEdited = false;
        this.listCurrentlyBeingEdited = false;
        logic.makeCurrentList(listName);
        this.renderTasks();
        this.updateColumnName();
    }

    newListSubmitBtnHandler(target, listName, listTextInput) {
        if(listName === '') {
            // don't allow user to save list without name
            listTextInput.focus();
            return;
        }
        logic.createNewList(listName);
        const listInputAndBtns = target.parentElement;
        listInputAndBtns.remove();
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
            html += `<li class="list-menu-btn"><button class="no-styling menu-list"><span class="list-icon-and-text"><i class="fas fa-list-alt list-menu-icon"></i><span class="list-name-text">${list.name}</span></span><i class="fas fa-edit edit-list-graphic"></i></button></li>`;
        }
        ul.innerHTML = html;
    }

    menuBtnHandler(menu) {
        if(window.getComputedStyle(menu).display === 'none'){
            menu.style.display = 'block';
        }
        else menu.style.display = 'none';
    }

    addListBtnHandler() {
        let ul = document.querySelector('.ul-list-of-lists');
        let li = document.createElement('li');
        li.classList.add('list', 'menu-btn');
        let i = document.createElement('i');
        i.classList.add('fas', 'fa-list-alt', 'list-menu-icon');
        li.append(i);
        const textInput = `<input class="new-list-text-input" type="text" /><i class="far fa-times-circle new-list-cancel-btn"></i><i class="far fa-check-circle new-list-submit-btn"></i>`;
        li.insertAdjacentHTML('beforeend', textInput);
        ul.append(li);
    }

    taskDeleteBtnHandler(target) {
        this.taskCurrentlyBeingEdited = false;
        const taskId = target.closest('.todo-item').dataset.id;
        logic.deleteTask(taskId);
        this.renderTasks();
    }

    renderTaskEditor(taskEditor, taskId) {
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
        } else if(taskName && this.dueDateIsValid(dueDate)) {
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

    cancelCreateNewTaskBtnHandler(newTaskEditor) {
        newTaskEditor.classList.add('hidden');
    }

    createNewTaskBtnHandler(newTaskEditor) {
        newTaskEditor.classList.remove('hidden');
    }

    renderTasks() {
        let ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        if(logic.currentList === null) ulForTasks.innerHTML = '';
        for (const task of Object.values(logic.currentList.tasks)) {
            const html = this.createTaskHTML(task.taskId, task.name, task.dueDate); 
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
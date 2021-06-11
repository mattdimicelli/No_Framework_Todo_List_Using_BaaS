import { logic, currentList, lists } from './Logic';

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
        logic.modifyListName(oldName, newName);
        this.renderLists();
    }

    editListIconHandler(listName, listItem) {
        oldName = listName;
        const html = `<i class="fas fa-list-alt"></i><input class="new-list-text-input" type="text" value="${listName}" /><i class="far fa-trash-alt"></i><i class="far fa-times-circle new-list-cancel-btn"></i><i class="far fa-check-circle edit-list-submit-btn"></i>`;
        listItem.innerHTML = html;
    }
    changeListHandler(listName) {
        logic.setCurrentList(listName);
        this.renderTasks();
        const columnName = document.querySelector('.list-column-name');
        columnName.textContent = listName;
    }


    newListSubmitBtnHandler(target, listName, listTextInput) {
        if(listName === '') {
            listTextInput.focus();
            return;
        }
        logic.createNewList(listName);
        target.parentElement.remove();
        this.renderLists();
    }

    renderLists() {
        const ul = document.querySelector('.ul-list-of-lists');
        let html = '';
        for (const key in lists) {
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
        logic.deleteTask(taskId);
        this.renderTasks();
    }

    taskEditorHandler(taskEditor, taskId) {
        taskEditor.classList.toggle('hidden');
        const taskTextInput = taskEditor.firstElementChild.firstElementChild;
        const detailsTextarea = taskEditor.firstElementChild.firstElementChild.nextElementSibling;
        const datepicker = taskEditor.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;

        taskTextInput.value = currentList.tasks[taskId].name;
        detailsTextarea.value = currentList.tasks[taskId].details;
        datepicker.valueAsNumber = currentList.tasks[taskId].dueDate;
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
                const task = logic.createNewTask(taskName, dueDate, details, currentTime);
                logic.addTaskToCurrentList(task);
                this.renderTasks();
            }
            if(!taskIsNew) {
                const taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
                logic.modifyTask(taskName, dueDate, details, taskId);
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
        for (const task of Object.values(currentList.tasks)) {
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

export const domController = new DomController();



//issues.  can't get task name to wrap at 50%;
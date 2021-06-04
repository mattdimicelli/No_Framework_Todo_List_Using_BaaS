function domController() {
    const todoListWrapper = document.querySelector('.todo-list-wrapper');
    

    function addTask() {

    }
    return {
        addTask, 

    };
}

function uiController() {
    //event listeners
    const addTaskBtn = document.querySelector('.new-task-btn');
    addTaskBtn.addEventListener('click', domController.addTask);


    return {};
}
import {domController} from './modules/DomController';
import {currentList, lists, logic, nextListId} from './modules/Logic';



document.addEventListener('DOMContentLoaded', function() {
    console.log('fire1');
    if(Object.keys(localStorage).length > 0) {
        console.log('fire2');
        logic.writeOverCurrentList(JSON.parse(localStorage.getItem('currentList')));
        lists = JSON.parse(localStorage.getItem('lists'));
        nextListId = JSON.parse(localStorage.getItem('nextListId'));
    }
});

logic.setDefaultList();
domController.initializeClickEventListeners();

document.addEventListener('beforeunload', function() {
    localStorage.setItem('currentList', JSON.stringify(currentList));
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('nextListId', JSON.stringify(nextListId));
})

const copy = document.querySelector('.copyright');
copy.addEventListener('click', function() {
    console.log('fire');
    localStorage.setItem('currentList', JSON.stringify(currentList));
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('nextListId', JSON.stringify(nextListId));
}) 









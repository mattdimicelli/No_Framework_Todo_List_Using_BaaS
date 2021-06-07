

class DomController {

    constructor() {}

    initializeClickEventListeners() {
        console.log('gah');
        document.addEventListener('click', this.handleClick.bind(this));
    }
    
    handleClick(e) {
        const target = e.target.closest('button');
        if(target.className === 'menu-btn') {
            const menu = document.querySelector('.menu');
            this.menuBtnHandler(menu);
        }
    }

    menuBtnHandler(menu) {
        console.dir(menu);
        if(menu.style.display === 'none'){
            menu.style.display = 'block';
        }
        else menu.style.display === 'none';
    }

   
}

export const domController = new DomController();
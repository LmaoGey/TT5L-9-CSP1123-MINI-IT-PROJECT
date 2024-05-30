const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        console.log('drag over');
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientX);
        console.log(afterElement);
        const draggable = document.querySelector('.dragging'); 
        container.appendChild(draggable);
    });
});

function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]; 

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect(); 
        const offset = x - box.left - box.width / 2;
        console.log(offset);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY });
}
var jhon = 393939
console.log(jhon)
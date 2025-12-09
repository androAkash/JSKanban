const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const task = document.querySelectorAll(".task")
let dragElement = null

task.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task
    })
})
/**
 * Attaches drag & drop event handlers to a column.
 *
 * Responsibilities:
 * - Highlights column when a draggable task enters
 * - Removes highlight when leaving
 * - Allows dropping tasks (HTML5 requires `dragover` to enable dropping)
 * - Moves the dragged task element into this column on drop
 *
 * Behavior:
 * - Uses global `dragElement` to track which task is currently being dragged
 * - Appends the dragged task into the column (changes its status visually)
 *
 * @param {HTMLElement} column - The column element (todo, progress, done)
 */
function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over")
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over")
    })
    column.addEventListener("dragover",(e)=>{
        e.preventDefault()
    })
    column.addEventListener("drop",(e)=>{
        e.preventDefault()
        console.log("Dropped",dragElement,column);

        column.appendChild(dragElement);
        column.classList.remove("hover-over")
    })
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done)

/* Modal logic */
const toggalModalButton = document.querySelector("#toggle-modal")
const modalBg = document.querySelector("modal .bg")
const modal = document.querySelector(".modal")

toggalModalButton.addEventListener("click",()=>{
    modal.classList.toggle("active")
})

modal.addEventListener("click",()=>{
    modal.classList.remove("active") 
})
/* Modal logic */
let taskData = {}
const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const task = document.querySelectorAll(".task")
let dragElement = null

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"))

    for (const col in data) {
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task => {
            const div = document.createElement("div")

            div.classList.add("task")
            div.setAttribute("draggable", "true")
            div.innerHTML = `
                    <h2>${task.taskTitle}</h2>
                    <p>${task.taskDesc}</p>
                    <button>Delete</button>
                    `
            column.appendChild(div)
            div.addEventListener("drag", (e) => {
                dragElement = div
            })
        })
    }
}

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
    column.addEventListener("dragover", (e) => {
        e.preventDefault()
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault()
        console.log("Dropped", dragElement, column);

        column.appendChild(dragElement);
        column.classList.remove("hover-over")

        updateCounts()
    })
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done)

/* Modal logic */
const toggalModalButton = document.querySelector("#toggle-modal")
const modalBg = document.querySelector("modal .bg")
const modal = document.querySelector(".modal")
const modalCenter = document.querySelector(".modal .center")
const addTaskButton = document.querySelector("#add-new-task")

toggalModalButton.addEventListener("click", () => {
    modal.classList.toggle("active")
})

modal.addEventListener("click", () => {
    modal.classList.remove("active")
})
modalCenter.addEventListener("click", (e) => {
    //Prevent closing the modal
    e.stopPropagation()
})

addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value

    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")
    div.innerHTML = `
                    <h2>${taskTitle}</h2>
                    <p>${taskDesc}</p>
                    <button>Delete</button>
                    `
    todo.appendChild(div)


    div.addEventListener("dragstart", () => {
        dragElement = div
    })

    updateCounts()

    modal.classList.remove("active")
})


/* Modal logic */

function updateCounts() {
    [todo, progress, done].forEach(col => {
        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right")

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                taskTitle: t.querySelector("h2").innerText,
                taskDesc: t.querySelector("p").innerText
            }
        })
        localStorage.setItem("tasks", JSON.stringify(taskData))
        count.innerText = tasks.length
    })
}
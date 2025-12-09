## Drag and Drop System (Phase 1)

### 1. Hover Feedback
When a task is dragged over a column, the column highlights using a `hover-over` CSS class.  
This is handled through a reusable function `addDragEventsOnColumn()`, which attaches
`dragenter` and `dragleave` events to each column.

### 2. Enabling Drop Behavior
HTML5 drag-and-drop does not allow dropping by default.  
Even if a `drop` event exists, it will not trigger unless we explicitly enable it.

To allow dropping, we use:

```js
column.addEventListener("dragover", (e) => {
    e.preventDefault();
});

// Const
// Parameters
const port = window.location.port || 3000;
const displayedTaskNbr = document.getElementById("displayed-task-nbr");

// Title
const toDoListTitle = document.getElementById("list-title");
const modifyTitleBtn = document.getElementById("modify-title");
const changeTitleInputLabel = document.getElementById("change-title-label");
const changeTitleInput = document.getElementById("change-title");

// List of tasks
const tasksList = document.getElementById("tasks-list");

// New task
const addNewTask = document.getElementById("add-new-task");
const newTaskInterface = document.getElementById("add-new-task-interface");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const validate = document.getElementById("create-task");

// Create a new task
addNewTask.addEventListener("click", () => newTaskInterface.style.display = "inline-grid");

newTaskInterface.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = taskTitle.value;
    const description = taskDescription.value.trim() || "";

    if(!title) {
        alert("A title is required.");
        return;
    }

    const response = await fetch(`http://localhost:${port}/api/tasks`, {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({title, description})
    });

    const result = await response.json();
    console.log(result);
})
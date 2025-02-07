// Const
// Parameters
const port = 3000;
const displayedTaskNbr = document.getElementById("displayed-task-nbr");

// Title
const toDoListTitle = document.getElementById("list-title");
const modifyTitleBtn = document.getElementById("modify-title");
const changeTitleInterface = document.getElementById("change-title-interface");
const changeTitleInput = document.getElementById("change-title");
const validateTitle = document.getElementById("validate-new-title");

// List of tasks
const tasksList = document.getElementById("tasks-list");

// New task
const addNewTask = document.getElementById("add-new-task");
const newTaskInterface = document.getElementById("add-new-task-interface");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const validate = document.getElementById("create-task");

// Modify the to-do list title
modifyTitleBtn.addEventListener("click", () => changeTitleInterface.style.display = "block")

changeTitleInterface.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = changeTitleInput.value;
    toDoListTitle.innerText = title;

    changeTitleInput.value = "";
    changeTitleInterface.style.display = "none";
} )

// Create a new task
addNewTask.addEventListener("click", () => newTaskInterface.style.display = "inline-grid");

newTaskInterface.addEventListener("submit", async (event) => {
    event.preventDefault();

    let title = taskTitle.value;
    let description = taskDescription.value.trim() || "";

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

    taskTitle.value = "";
    taskDescription.value = "";
    newTaskInterface.style.display = "none";
})
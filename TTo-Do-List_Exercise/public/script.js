// Const
// Parameters
const port = 3000;
const displayedTaskNbr = document.getElementById("displayed-task-nbr");
const completedState = document.getElementById("completed-state");

// Title
const toDoListTitle = document.getElementById("list-title");
const modifyTitleBtn = document.getElementById("modify-title");
const changeTitleInterface = document.getElementById("change-title-interface");
const changeTitleInput = document.getElementById("change-title");
const validateTitle = document.getElementById("validate-new-title");

// List of tasks
const tasksList = document.getElementById("tasks-list");
let page = 0;
const previousPageBtn = document.getElementById("previous");
const nextPageBtn = document.getElementById("next");

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
    localStorage.setItem(title, changeTitleInput.value);
    if (title) {
        toDoListTitle.innerText = localStorage.getItem(title);
    }

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

// Display all the tasks
async function getAllTasks(page) {
    tasksList.innerHTML = "";
    let limit = displayedTaskNbr.value;
    let completed = completedState.value;

    const url = `http://localhost:3000/api/tasks?page=${page}&limit=${limit}&completed=${completed}`;

    try {
        const response = await fetch(url, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const tasksData = await response.json();

        tasksData.forEach(task => {
            let thisTaskCard = document.createElement("div");
            thisTaskCard.classList.add("task-card");

            let thisTaskTitle = document.createElement("h4");
            thisTaskTitle.innerText = task.title;
            thisTaskCard.appendChild(thisTaskTitle);

            if (task.description) {
                let thisTaskDescription = document.createElement("p");
                thisTaskDescription.innerText = task.description;  
                thisTaskCard.appendChild(thisTaskDescription);
            }
            
            let thisTaskState = document.createElement("p");
            let completedState;
            if (task.completed) {
                completedState = "yes";
            } else {
                completedState = "no";
            }
            thisTaskState.innerText = `Completed: ${completedState}`;

            let thisTaskDate = document.createElement("p");
            thisTaskDate.innerText = `Created at: ${new Date(task.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}`;

            let btnDiv = document.createElement("div");

            let updateBtn = document.createElement("button");
            updateBtn.innerText = "Edit task";

            let deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete task";

            btnDiv.appendChild(updateBtn);
            btnDiv.appendChild(deleteBtn);

            thisTaskCard.appendChild(thisTaskState);
            thisTaskCard.appendChild(thisTaskDate);
            thisTaskCard.appendChild(btnDiv);

            tasksList.appendChild(thisTaskCard);
        });
    } catch (err) {
        console.log(err.message);
    }
}
getAllTasks();

// filters for displaying the tasks:
displayedTaskNbr.addEventListener("change", getAllTasks);
completedState.addEventListener("change", getAllTasks);
previousPageBtn.addEventListener("click", (event) => navigate(event));
nextPageBtn.addEventListener("click", (event) => navigate(event));

// navigation
function navigate(event) {
    if (event.target == previousPageBtn) {
        if (page == 0) return ;
        page = page - 1;
        getAllTasks(page);
    } else if (event.target == nextPageBtn) {
        page = page + 1;
        getAllTasks(page);
    }
}
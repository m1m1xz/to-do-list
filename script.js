// Get elements from HTML

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";
displayTasks();

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please write a task first!");
        return;
    }
    const task = {
        id: Date.now(),
        text: text,
        completed: false

    };
    tasks.push(task);
    saveTasks();
    taskInput.value = "";
    displayTasks();

}
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});
function displayTasks() {
    taskList.innerHTML = "";
    let filteredTasks = tasks;

    if (currentFilter === "active") {

        filteredTasks =
            tasks.filter(task => !task.completed);

    }
    if (currentFilter === "completed") {

        filteredTasks =
            tasks.filter(task => task.completed);

    }
    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }
    filteredTasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "task";
        if (task.completed) {
            li.classList.add("completed");

        }
        li.innerHTML = `
            <div class="checkbox"></div>
            <span class="task-text">
                ${task.text}
            </span>
            <button class="delete-btn">
                *
            </button>

        `;
        const checkbox =
            li.querySelector(".checkbox");

        checkbox.addEventListener("click", function() {
            toggleTask(task.id);

        });
        const deleteButton =
            li.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });
        taskList.appendChild(li);

    });
    updateCount();

}
function toggleTask(id) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;

    });
    saveTasks();
    displayTasks();

}
function deleteTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;

    });
    saveTasks();
    displayTasks();

}

const filterButtons =
    document.querySelectorAll(".filter");
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");

        });

        button.classList.add("active");


        currentFilter =
            button.dataset.filter;


        displayTasks();

    });

});


// Clear completed tasks

clearCompleted.addEventListener("click", function() {

    tasks =
        tasks.filter(task => !task.completed);


    saveTasks();

    displayTasks();

});


// Save tasks in browser

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Update task count

function updateCount() {

    const remaining =
        tasks.filter(task => !task.completed).length;


    taskCount.textContent =
        `${remaining} task${remaining !== 1 ? "s" : ""} remaining`;

}
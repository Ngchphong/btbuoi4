document.getElementById("formTask").onsubmit = function(event) {
    event.preventDefault();
    const inputTask = document.getElementById("inputTask").value.trim();
    const taskStatus = document.getElementById("taskStatus").value;
    const inputCategory = document.getElementById("inputCategory").value.trim();

    if (inputTask !== "" && inputCategory !== "") {
        let categories = JSON.parse(localStorage.getItem("categories")) || [];
        if (!categories.includes(inputCategory)) {
            categories.push(inputCategory);
            localStorage.setItem("categories", JSON.stringify(categories));
        }
        
        const task = {
            text: inputTask,
            status: taskStatus,
            category: inputCategory
        };
        addTask(task);
        document.getElementById("inputTask").value = '';
        document.getElementById("inputCategory").value = '';
    } else {
        alert("Task and category must be filled out");
    }
};

document.getElementById("saveBtn").addEventListener("click", function(event) {
    event.preventDefault();
    const taskList = document.getElementById("tasks");
    const tasks = [];
    for (let taskItem of taskList.getElementsByTagName("li")) {
        const task = {
            text: taskItem.querySelector(".task-text").textContent,
            status: taskItem.querySelector(".task-status").textContent,
            category: taskItem.querySelector(".task-category").textContent
        };
        tasks.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

const tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks) {
    for (let task of tasks) {
        addTask(task);
    }
}

function addTask(task) {
    const taskList = document.getElementById("tasks");
    const taskItem = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.classList.add("task-text");
    taskItem.appendChild(taskText);

    const taskStatus = document.createElement("span");
    taskStatus.textContent = task.status;
    taskStatus.classList.add("task-status");
    taskItem.appendChild(taskStatus);

    const taskCategory = document.createElement("span");
    taskCategory.textContent = task.category;
    taskCategory.classList.add("task-category");
    taskItem.appendChild(taskCategory);

    const statusButton = document.createElement("button");
    statusButton.textContent = "Change Status";
    statusButton.addEventListener("click", function() {
        const newStatus = prompt("Enter new status (Pending, In Progress, Completed):");
        if (newStatus === "Pending" || newStatus === "In Progress" || newStatus === "Completed") {
            taskStatus.textContent = newStatus;
        } else {
            alert("Invalid status");
        }
    });
    taskItem.appendChild(statusButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
        taskList.removeChild(taskItem);
    });
    taskItem.appendChild(removeButton);

    taskList.appendChild(taskItem);
}

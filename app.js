const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Weekly reset
setInterval(() => {
  tasks.forEach(task => {
    if (task.target) {
      task.progress = 0;
      task.completed = false;
    }
  });
  saveTasks();
  renderTasks();
}, 7 * 24 * 60 * 60 * 1000); 

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const taskName = document.getElementById("taskName").value;
  const taskTarget = parseInt(document.getElementById("taskTarget").value) || null;

  tasks.push({
    name: taskName,
    target: taskTarget,
    progress: 0,
    completed: false,
  });

  saveTasks();
  taskForm.reset();
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task ${task.completed ? "completed" : ""}`;

    taskDiv.innerHTML = `
      <strong>${task.name}</strong>
      ${task.target ? ` - Progress: ${task.progress}/${task.target}` : ""}
      <div>
        <button onclick="incrementProgress(${index})" ${task.completed ? "disabled" : ""}>+1</button>
        <button onclick="markComplete(${index})" ${task.completed ? "disabled" : ""}>Complete</button>
        <button onclick="removeTask(${index})" style="background-color: #ff6b6b; color: #fff;">Remove</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

function incrementProgress(index) {
  const task = tasks[index];
  if (!task.completed && task.target) {
    task.progress++;
    if (task.progress >= task.target) {
      task.completed = true;
    }
    saveTasks(); 
    renderTasks();
  }
}

function markComplete(index) {
  tasks[index].completed = true;
  saveTasks(); 
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1); 
  saveTasks(); 
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();

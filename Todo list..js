 
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

 
    document.addEventListener("DOMContentLoaded", loadTasks);

    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }
      createTaskElement(taskText);
      saveTask(taskText, false);
      taskInput.value = "";
    }

    function createTaskElement(text, completed = false) {
      const li = document.createElement("li");
      if (completed) li.classList.add("completed");

      const span = document.createElement("span");
      span.textContent = text;
      span.classList.add("task-text");

      const actions = document.createElement("div");
      actions.classList.add("actions");

  
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "complete";
      completeBtn.classList.add("complete-btn");
      completeBtn.onclick = () => toggleComplete(li, text);
 
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit-btn");
      editBtn.onclick = () => editTask(li, span, text);
 
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => deleteTask(li, text);

      actions.appendChild(completeBtn);
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(actions);
      taskList.appendChild(li);
    }

    function toggleComplete(li, text) {
      li.classList.toggle("completed");
      updateTask(text, li.classList.contains("completed"));
    }

    function editTask(li, span, oldText) {
      const newText = prompt("Edit your task:", span.textContent);
      if (newText && newText.trim() !== "") {
        span.textContent = newText.trim();
        updateTaskText(oldText, newText.trim());
      }
    }

    function deleteTask(li, text) {
      li.remove();
      removeTask(text);
    }

  
    function saveTask(text, completed) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text, completed });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => createTaskElement(task.text, task.completed));
    }

    function updateTask(text, completed) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.map(task => 
        task.text === text ? { ...task, completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateTaskText(oldText, newText) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.map(task =>
        task.text === oldText ? { ...task, text: newText } : task
      );
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function removeTask(text) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(task => task.text !== text);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
 
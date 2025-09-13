// Display current date
const curDate = document.getElementById("curDate");
const presentDate = new Date();
curDate.innerHTML =
  presentDate.getDate() + "/" + (presentDate.getMonth() + 1) + "/" + presentDate.getFullYear();

// Elements
const addBtn = document.getElementById("addTask");
const ol = document.querySelector("ol");
const themeBtn = document.querySelector(".theme");

// Theme toggle
themeBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if (event.target.id === "light") {
    document.body.style.background = "#f5f5f5"; // Light background
    document.body.style.color = "black";
  } else if (event.target.id === "dark") {
    document.body.style.background =
      "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/images/TodoBg.png)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.color = "white";
  }
});

// Load todos from localStorage or initialize empty array
let localTodoLists = JSON.parse(localStorage.getItem("todos")) || [];

// Function to create and render a new task
function addTodoElement(taskText) {
  const newTask = document.createElement("li");
  newTask.textContent = taskText;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.id = "crossBtn";
  deleteBtn.textContent = " ❌";
  deleteBtn.addEventListener("click", () => {
    newTask.remove();
    localTodoLists = localTodoLists.filter((t) => t !== taskText);
    localStorage.setItem("todos", JSON.stringify(localTodoLists));
  });

  // Mark task as completed
  newTask.addEventListener("click", () => {
    newTask.style.textDecoration = "line-through";
    newTask.style.textDecorationColor = "#7aef8a";
  });

  newTask.appendChild(deleteBtn);
  ol.appendChild(newTask);
}

// Render existing todos on page load
localTodoLists.forEach(addTodoElement);

// Add task on button click
addBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const inputTask = document.getElementById("inputTask").value.trim();

  if (inputTask === "") {
    console.log("Empty task not allowed");
    return;
  }

  if (!localTodoLists.includes(inputTask)) {
    localTodoLists.push(inputTask);
    localStorage.setItem("todos", JSON.stringify(localTodoLists));
    addTodoElement(inputTask);
  }

  document.getElementById("inputTask").value = "";
});

// element.addEventListener('action', callback_func)

// target the unordered list
let todoListElement = document.getElementById("todoList");

// function that creates event listeners
const createEvents = (el) => {
  // add mouseenter event listener
  el.addEventListener("mouseenter", (e) => {
    e.target.classList.add("active");
  });
  // add mouseleave event listener
  el.addEventListener("mouseleave", (e) => {
    e.target.classList.remove("active");
  });
  // add click event listener
  el.addEventListener("click", () => {
    el.classList.remove("active");
    el.classList.add("disabled");
    el.style.textDecoration = "line-through";
  });
};

let input = document.getElementById("todoInputField");
let form = document.getElementById("todoForm");

form.addEventListener("submit", (e) => {
  // prevent page refresh
  e.preventDefault();

  // create new dom element using JavaScript
  let li = document.createElement("li");

  // add the nevessary classes to the list element
  li.classList.add("list-group-item");

  // set the intter text of the list element to the input field's value
  li.innerText = input.value;

  // stick all of our events to the list item
  createEvents(li);

  // add the item into the unordered list
  todoListElement.appendChild(li);

  // Adding todo items into LOCAL STORAGE
  let todoStorage = localStorage.getItem("todoListElement") ? JSON.parse(localStorage.getItem("todoListElement")) : [];
  todoStorage.push(input.value);
  localStorage.setItem("todoListElement", JSON.stringify(todoStorage));

  // clear the todo input field text
  input.value = "";
});
// Helper function to create a new todo list
const newTodoBuilder = (item) => {
  let stuff = document.createElement("li");
  stuff.classList.add("list-group-item");
  stuff.innerText = item
  createEvents(stuff);
  todoListElement.appendChild(stuff);
};
// For...of loop to iterate the todo items in local storage and add properties from newTodoBuilder
var createNewTodo = () => {
  let getNewTodos = JSON.parse(localStorage.getItem("todoListElement"));
  console.log(getNewTodos);
  for (const todo of getNewTodos) {
    newTodoBuilder(todo);
  }
};
// Created a function to delete all todo items in list
var deleteItems = () => {
  while (todoListElement.hasChildNodes()){
    todoListElement.removeChild(todoListElement.firstChild);
  }
  localStorage.clear();
  alert('Local Storage has been cleared!')
}
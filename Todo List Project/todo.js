// Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.getElementsByClassName("card-body")[0];
const secondCardBody = document.getElementsByClassName("card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.getElementById("clear-todos");
const deneme = document.querySelector(
  "body > div > div > div:nth-child(3) > button"
);
const onay = document.querySelector(
  "#exampleModal > div > div > div.modal-footer > button.btn.btn-primary"
);
const onayKutusu = document.querySelector("#exampleModal")
eventListeners();

//Eventlistenerlar
function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  onay.addEventListener("click",clearAllTodos)
}
function clearAllTodos(e) {
  
  while (todoList.firstElementChild != null) {
    todoList.removeChild(todoList.firstElementChild);
  }
  localStorage.removeItem("todos");
  onayKutusu.setAttribute("style" , "display : none")
  document.querySelector("body > div.modal-backdrop.fade.show").setAttribute("style" , "display : none")
}
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach((element) => {
    const text = element.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      //bulamadıysa
      element.setAttribute("style", "display : none !important");
    } else {
      element.setAttribute("style", "display : block !important");
    }
  });
}
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach((element) => {
    addTodoToUI(element);
  });
}
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    showAlert("success", "Todo başarıyla silindi..!");
    deleteTodoFromStogare(e.target.parentElement.parentElement.textContent);
  }
}
function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin..");
  } else {
    addTodoToUI(newTodo);
    addTodoToStogare(newTodo);
    showAlert("success", "Todo başarıyla eklendi..!");
  }
  e.preventDefault();
}
function deleteTodoFromStogare(todo) {
  let todos = getTodosFromStorage();
  todos.forEach((element, index) => {
    if (element === todo) {
      todos.splice(index, 1); //Arrayden değeri silme
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
function addTodoToUI(newTodo) {
  //Aldığı string değerini list item olarak UI ' ya ekler

  //Elementleri oluşturma
  const listItem = document.createElement("li");
  const link = document.createElement("a");

  //Link Oluşturma
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  //li'ye classlarını verme
  listItem.className = "list-group-item d-flex justify-content-between";

  //Text Node Ekleme
  listItem.appendChild(document.createTextNode(newTodo));

  //Listeye linki ekleme
  listItem.appendChild(link);

  //Todo liste list Item'ı ekleme
  todoList.appendChild(listItem); //querySelector'da kullanılabilir

  //Input'u temizleme
  todoInput.value = "";
}
function showAlert(type, message) {
  //Element oluşturma
  const alert = document.createElement("div");

  //Elemente class verme
  alert.className = `alert alert-${type}`;

  //Elemente text'ini verme
  alert.textContent = message;

  //Card Body'e alerti ekleme
  firstCardBody.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 1000); //2 değer alıyor 1. si fonksiyon 2. ise zaman milisaniye cinsinden
}
function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function addTodoToStogare(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

const taskInp = document.getElementById("task-input");
const dateInp = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const todosBody = document.querySelector("tbody");
const alertSection = document.querySelector(".alert-message");
const deleteAllButton = document.getElementById("delete-all");


let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
};

const generateId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();
};

const showAlert = (message, type) => {
    alertSection.innerHTML = "";

    const alert = document.createElement("p");
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertSection.append(alert);

    setTimeout(() => {
        alert.style.display = "none";
    }, 2500);
};

const displayTodos = () => {
    
    todosBody.innerHTML = "";
    if (!todos.length) {
        todosBody.innerHTML = "<tr><td colspan='4'>No task found</td></tr>";
    }

    todos.forEach(todo => {
        todosBody.innerHTML += `
            <tr>
                <td>${todo.task}</td>
                <td>${todo.date ? todo.date : "No Date"}</td>
                <td>${todo.completed ? "Completed" : "Pending"}</td>
                <td>
                    <button onClick="editHandler(${todo.id})">Edit</button>
                    <button onClick="toggleHandler(${todo.id})">Do</button>
                    <button onClick="deleteHandler(${todo.id})">Delete</button>
                </td>
            </tr>
        `
    });
};

const addButtonHandler = () => {
    task = taskInp.value;
    date = dateInp.value;

    const todo = {
        id: generateId(),
        completed: false,
        task,
        date,
    }

    if (task) {
        todos.push(todo);
        saveToLocalStorage();
        displayTodos();
        taskInp.value = "";
        dateInp.value = "";
        showAlert("Data was added", "success");
    } else {
        showAlert("Please enter a task", "error");
    }
};

const deleteAllHandler = () => {
    if (todos.length) {
        todos = [];
        saveToLocalStorage();
        displayTodos();
        showAlert("All todos deleted successfuly", "success");
    } else {
        showAlert("No todos to clear", "error");
    }
};

const editHandler = id => {
    const todo = todos.find(todo => todo.id === id);
    console.log(todo);
    // taskInp.value = 
}

window.addEventListener("load", displayTodos)
addBtn.addEventListener("click", addButtonHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);

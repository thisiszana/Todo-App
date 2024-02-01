const taskInp = document.getElementById("task-input");
const dateInp = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const editBtn = document.getElementById("edit-btn");
const todosBody = document.querySelector("tbody");
const alertSection = document.querySelector(".alert-message");
const deleteAllButton = document.getElementById("delete-all");
const filterBtn = document.querySelectorAll(".filter-todo");

let todos = JSON.parse(localStorage.getItem('todos')) || [];


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

const displayTodos = data => {
    const newTodos = data || todos

    todosBody.innerHTML = "";
    if (!newTodos.length) {
        todosBody.innerHTML = "<tr><td colspan='4'>No task found</td></tr>";
    }

    newTodos.forEach(todo => {
        todosBody.innerHTML += `
            <tr>
                <td>${todo.task}</td>
                <td>${todo.date ? todo.date : "No Date"}</td>
                <td>${todo.completed ? "Completed" : "Pending"}</td>
                <td>
                    <button onClick="editHandler('${todo.id}')">Edit</button>
                    <button onClick="toggleHandler('${todo.id}')">${todo.completed ? "Undo" : "Do"}</button>
                    <button onClick="deleteHandler('${todo.id}')">Delete</button>
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
    taskInp.value = todo.task;
    dateInp.value = todo.date;
    addBtn.style.display = "none";
    editBtn.style.display = "inline-block";
    editBtn.dataset.id = id;
};

const applyEditHandler = event => {
    const id = event.target.dataset.id;
    const todo = todos.find(todo => todo.id === id);

    todo.task = taskInp.value;
    todo.date = dateInp.value;
    addBtn.style.display = "inline-block";
    editBtn.style.display = "none";
    saveToLocalStorage();
    displayTodos();
    showAlert("Todo edited successfuly", "success");
};

const toggleHandler = id => {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    saveToLocalStorage();
    displayTodos();
    showAlert('Todo status changed successfuly', 'success');
};

const deleteHandler = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    todos = newTodos;
    saveToLocalStorage();
    displayTodos();
    showAlert('Todo deleted successfuly', 'success')
};

const filterHandler = event => {
    let filteredTodo = null;
    const filter = event.target.dataset.filter;
    switch (filter) {
        case "pending":
            filteredTodo = todos.filter(todo => todo.completed === false);
            break;
        case "completed":
            filteredTodo = todos.filter(todo => todo.completed === true);
            break;

        default:
            filteredTodo = todos;
            break;
    }

    displayTodos(filteredTodo);
}

window.addEventListener("load", () => displayTodos());
addBtn.addEventListener("click", addButtonHandler);
editBtn.addEventListener("click", applyEditHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
filterBtn.forEach(btn => {
    btn.addEventListener("click", filterHandler)
})
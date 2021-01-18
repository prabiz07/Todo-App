// Toggle Input
let getButton = document.querySelector('.toggle');
let element = document.getElementById('task-form');
let temp = true;

getButton.addEventListener('click', function () {
    temp = !temp;

    if (!temp) {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
});


// Tips overlay Init
const tips = document.querySelector('.tips');
const closeBtn = document.querySelector('.closebtn');
const overlay = document.getElementById('overlay');


tips.addEventListener('click', function () {
    overlay.style.height = '100%';
});

closeBtn.addEventListener('click', function () {
    overlay.style.height = '0%';
});


// Task list JS Init
// UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.list-collection');
const clearBtn = document.querySelector('.clear');

// Array which store todos
let todos = [];

// Add an event listener on form
form.addEventListener('submit', function (event) {
    // Call addTodo function with input box value
    addTodo(taskInput.value);
    // Prevent Default
    event.preventDefault();
});
clearBtn.addEventListener('click', clearTodo);

// Add Task function
function addTodo(item) {
    // if item is not empty
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        // Then add it to Todos array
        todos.push(todo);
        addToLocalStorage(todos);

        // Clear the input text box
        taskInput.value = '';
    } else {
        alert('Error: You must write something');
    }
}



// function to render all todos to screen
function renderTask(todos) {
    // Clear everything inside <ul> element
    taskList.innerHTML = '';

    // Run through each item inside todos
    todos.forEach(function (item) {
        // check if the item is completed
        const checked = item.completed ? 'checked' : null;
        // Create <li> element
        const list = document.createElement('li');
        // Set Attribute (Data-key)
        list.setAttribute('data-key', item.id);
        // If item is completed, then add 'checked' class to <li>
        if (item.completed === true) {
            list.classList.add('checked');
        }
        // Add other HTML element inside <li> element
        list.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <span class="deleteBtn"><i class="fa fa-trash-o"></i></span>
        `;
        // Add <li> element inside <ul> element
        taskList.appendChild(list);
    });
}

// AddToLocalStorage function
function addToLocalStorage(todos) {
    // Convert the array into string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));

    // Render them to screen
    renderTask(todos);
}

// function help to get everything from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    // if reference exist
    if (reference) {
        // Convert back to array and store it in todo array
        todos = JSON.parse(reference);
        renderTask(todos);
    }
}

// Toggle the value of completed and not completed
function toggle(id) {
    todos.forEach(function (item) {
        // use== not ===, because here types are different. One is number and another is string.
        if (item.id == id) {
            // toggle the value
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
    // Filter out the <li> with the id and update the todo array
    todos = todos.filter(function (item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
    });

    // update the Local Storage
    addToLocalStorage(todos);
}

// after that addEventListener <ul>. Because we need to listen for click event in all delete-button and checkbox
taskList.addEventListener('click', function (event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the state
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.parentElement.classList.contains('deleteBtn')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteTodo(event.target.parentElement.parentElement.getAttribute('data-key'));
    }
});

// function to clear all the todos from localstorage
function clearTodo() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from Local Storage
    clearFromLocalStorage();
}

// Function to clear all the todos from Local Storage
function clearFromLocalStorage() {
    localStorage.clear();
}

// Initially get everything from local storage
getFromLocalStorage();













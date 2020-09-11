// Define UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector('.btn');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load loadEventListener() function
loadEventListeners();

// Run all loadEventListener()
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach((task) => { 
            // Create a list element
            const list = document.createElement('li');
            // Add class 
            list.className = 'collection-item';
            // Create text node and Append to the newly created List
            list.appendChild(document.createTextNode(task.toUpperCase()));
            
            // THE DELETE ICON
            // Create HTML element
            const link = document.createElement('a');
            // Add class
            link.className = 'delete-item secondary-content';
            // Add delete icon
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // Append it to the list
            list.appendChild(link);
            // Finally, Append that List to the ul i.e. taskList
            taskList.appendChild(list);
        });
    }
}


// Add Task
function addTask(e) {
    // Validation for empty input
    if(taskInput.value === "") {
        alert("Add a task.")
    } else {
        // Create a list element
        const list = document.createElement('li');
        // Add class 
        list.className = 'collection-item';
        // Create text node and Append to the newly created List
        list.appendChild(document.createTextNode(taskInput.value.toUpperCase()));
        
        // THE DELETE ICON
        // Create HTML element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add delete icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append it to the list
        list.appendChild(link);

        // Finally, Append that List to the ul i.e. taskList
        taskList.appendChild(list);

        // Add to local storage
        storeTaskInLocalStorage(taskInput.value);

        // Clear input
        taskInput.value = "";

    }

    e.preventDefault();
}

// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            let taskItem = e.target.parentElement.parentElement;
            taskItem.remove();

            // Remove from LS 
            removeTaskFromLocalStorage(taskItem);
        }        
    }   
}

// Remove task from LS
function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let result = tasks.filter(task => taskItem.textContent != task)
    // tasks.forEach(function(task, index) {
    //     if(taskItem.textContent === task){
    //         tasks.splice(index, 1);
    //     }
    // });
    console.log(result);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
    if(confirm('Are you sure?')) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}
}

// Filter tasks
function filterTasks(e) {
    console.log(e.target.value);

    let text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Store Task In LocalStorage 
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


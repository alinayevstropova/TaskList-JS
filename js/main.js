const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deteleTask);
tasksList.addEventListener('click', doneTask);

function addTask(event) {
  event.preventDefault();

  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  saveToLacalStorage();

  const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

  const taskHTML = ` 
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
    </li> `;

  tasksList.insertAdjacentHTML('beforeend', taskHTML);

  taskInput.value = '';
  taskInput.focus();

  checkEmptyList();
}

function deteleTask(event) {
  if (event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('li');

  const id = parentNode.id;

  const index = tasks.findIndex(function (task) {
    return task.id == id;
  });

  tasks.splice(index, 1);

  saveToLacalStorage();
  parentNode.remove();
  checkEmptyList();
}

function doneTask(event) {
  if (event.target.dataset.action !== 'done') return;

  if (event.target.dataset.action === 'done') {
    const parentNode = event.target.closest('.list-group-item');

    const id = parentNode.id;
    const task = tasks.find(function (task) {
      if (task.id == id) return true;
    });
    task.done = !task.done;

    saveToLacalStorage();

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
  }
}

function checkEmptyList() {
  if (tasks.length == 0) {
    const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
        <img src="./img/empty.svg" alt="Empty" width="250" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
        </li>`;
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
  } else {
    const emplyListEl = document.querySelector('#emptyList');
    emplyListEl ? emplyListEl.remove() : null;
  }
}

function saveToLacalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

  const taskHTML = ` 
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
    </li> `;

  tasksList.insertAdjacentHTML('beforeend', taskHTML);
}

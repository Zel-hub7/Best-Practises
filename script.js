import './style.css';
import addTrash from './Modules/functions.js';

const clearButton = document.querySelector('.btnComplete');

const input = document.getElementById('input');

const target = document.getElementById('list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveToLocalStorage(data) {
  tasks.push(data);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addListItem(newObj) {
  const listItem = document.createElement('li');
  listItem.id = `L${newObj.index}`;
  listItem.className = 'common';

  const checkbox = document.createElement('input');
  checkbox.id = newObj.index;
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.checked = newObj.completed;

  const description = document.createElement('p');
  description.id = `P${newObj.index}`;
  description.className = 'li-p';
  description.textContent = newObj.description;

  const button = document.createElement('button');
  button.id = `edit-remove${newObj.index}`;
  button.className = 'btn dots list-item';

  const icon = document.createElement('i');
  icon.className = 'fa fa-ellipsis-v';

  button.appendChild(icon);

  listItem.appendChild(checkbox);
  listItem.appendChild(description);
  listItem.appendChild(button);

  target.appendChild(listItem);

  const deleteBtn = document.getElementById(`edit-remove${newObj.index}`);
  deleteBtn.addEventListener('click', addTrash);

  const checkboxEl = document.getElementById(newObj.index);
  checkboxEl.addEventListener('click', () => {
    const list = JSON.parse(localStorage.getItem('tasks'));
    const findIndex = list.findIndex((listEl) => listEl.index === newObj.index);

    list[findIndex].completed = !list[findIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(list));
    tasks = JSON.parse(localStorage.getItem('tasks'));
  });
}

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();

    const inputValue = input.value;
    const newObj = {
      description: inputValue,
      completed: false,
      index: tasks.length + 1,
    };

    saveToLocalStorage(newObj);
    addListItem(newObj);
    input.value = '';
  }
});

function createListItem(task) {
  const { index, description, completed } = task;

  const listItem = document.createElement('li');
  listItem.id = `L${index}`;
  listItem.className = 'common';

  const checkbox = document.createElement('input');
  checkbox.id = index;
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.checked = completed;

  const descriptionEl = document.createElement('p');
  descriptionEl.id = `P${index}`;
  descriptionEl.className = 'li-p';
  descriptionEl.textContent = description;

  const button = document.createElement('button');
  button.id = `edit-remove${index}`;
  button.className = 'btn dots list-item';

  const icon = document.createElement('i');
  icon.className = 'fa fa-ellipsis-v';

  button.appendChild(icon);

  listItem.appendChild(checkbox);
  listItem.appendChild(descriptionEl);
  listItem.appendChild(button);

  target.appendChild(listItem);

  const deleteBtn = document.getElementById(`edit-remove${index}`);
  deleteBtn.addEventListener('click', addTrash);

  const checkboxEl = document.getElementById(index);
  checkboxEl.addEventListener('click', () => {
    const list = JSON.parse(localStorage.getItem('tasks'));
    const findIndex = list.findIndex((listEl) => listEl.index === index);

    list[findIndex].completed = !list[findIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(list));
    tasks = JSON.parse(localStorage.getItem('tasks'));
  });
}

tasks.forEach(function(task) {
  createListItem(task);
});


clearButton.addEventListener('click', () => {
  const filteredItems = tasks.filter((el) => !el.completed);

  localStorage.setItem('tasks', JSON.stringify(filteredItems));
  tasks = filteredItems;

  // Remove the completed list items from the UI
  const completedItems = document.querySelectorAll('.common input[type="checkbox"]:checked');
  completedItems.forEach((item) => {
    const listItem = item.parentNode;
    listItem.parentNode.removeChild(listItem);
  });
});




let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const deleteList = () => {
  const button = document.querySelectorAll('.newButton');
  const element = button[0].parentNode;
  const liItem = element.parentNode;
  liItem.removeChild(element);
  const listId = element.getAttribute('id');
  const index = parseInt(listId.substring(1), 10);
  tasks = tasks.filter((task) => task.index !== index);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  window.location.reload();
};

export default function addTrash(event) {
  const eventCatcher = event.target.closest('button');
  eventCatcher.style.display = 'none';
  const liItem = event.target.closest('li');
  const nodeList = liItem.querySelectorAll('p');
  const parentLi = nodeList[0].parentNode;
  const parentId = parentLi.getAttribute('id');
  const parentElement = document.getElementById(parentId);
  const newBtn = document.createElement('button');
  newBtn.className = 'newButton';
  newBtn.innerHTML = '<i class="fa fa-trash-alt"></i>';
  parentElement.append(newBtn);
  liItem.style.backgroundColor = '#ffe6ee';
  const editTask = liItem.querySelector('p');
  editTask.setAttribute('contenteditable', true);
  const listId = parentLi.getAttribute('id');
  const index = parseInt(listId.substring(1), 10);
  editTask.addEventListener('keyup', () => {
    const newTasks = tasks.map((task) => {
      if (task.index === index) {
        return { ...task, description: editTask.innerHTML };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  });
  const trash = document.getElementsByClassName('newButton');
  trash[0].addEventListener('click', deleteList);
}


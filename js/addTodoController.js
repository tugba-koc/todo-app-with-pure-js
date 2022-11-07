
import { getData, saveData } from './dataController.js';
import edittodo from './editTodoController.js';

const addtodo = () => {
  let modal = document.getElementById('add-todo__modal');
  let btn = document.getElementById('add-todo__btn');
  let cancelButton = document.querySelector('.add-todo__model-cancel');
  let form = document.querySelector('.add-todo__model-form');
  let titleInput = document.querySelector('.add-todo__model-input');
  let dateInput = document.querySelector('.add-todo__model-input.date');
  let todoList = document.querySelector('.add-todo__task-list');

  // get all data
  getData();
  edittodo();

  // When the user clicks the button, open the modal
  btn.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  const removeInputValues = () => {
    titleInput.value = '';
    dateInput.value = '';
  };

  // When the user clicks on cancel, close the modal
  cancelButton.addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = 'none';
    removeInputValues();
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
      removeInputValues();
    }
  };

  // --------------------------------------------------
  // Submit Handler
  let titleInputVal = '';
  let dateInputVal = '';
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (titleInput.value.length && dateInput.value.length) {
      // Get values from inputs
      titleInputVal = titleInput.value.trim();
      // to show date in required format
      dateInputVal = dateInput.value.trim();
      dateInputVal = dateInputVal.split('/');
      let switchedValue = dateInputVal[1];
      dateInputVal.splice(0, 0, switchedValue);
      dateInputVal.splice(2, 1);
      var dateObject = new Date(dateInputVal);
      let dateVal = dateObject.toLocaleString('en-us', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      let todoListBlock = '';
      let todolistBlockAll =
        document.getElementsByClassName('todo-list--block');
      let blockIdList = Array.from(todolistBlockAll).map((el) => {
        return el.id;
      });
      // check the block id if it is already added
      let isValidBlock = blockIdList.includes('todo-' + Date.parse(dateObject));
      // Create Todo List Block if needed
      if (todolistBlockAll.length === 0 || !isValidBlock) {
        todoListBlock = document.createElement('div');
        todoListBlock.classList.add('todo-list--block');
        todoListBlock.setAttribute('id', 'todo-' + Date.parse(dateObject));
        let titleTodolistBlock = document.createElement('h2');
        titleTodolistBlock.classList.add('todo-list--block-title');
        titleTodolistBlock.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.4 6.4H22V5.2C22 4.88174 21.8736 4.57652 21.6485 4.35147C21.4235 4.12643 21.1183 4 20.8 4C20.4817 4 20.1765 4.12643 19.9515 4.35147C19.7264 4.57652 19.6 4.88174 19.6 5.2V6.4H12.4V5.2C12.4 4.88174 12.2736 4.57652 12.0485 4.35147C11.8235 4.12643 11.5183 4 11.2 4C10.8817 4 10.5765 4.12643 10.3515 4.35147C10.1264 4.57652 10 4.88174 10 5.2V6.4H7.6C6.64522 6.4 5.72955 6.77928 5.05442 7.45442C4.37928 8.12955 4 9.04522 4 10V24.4C4 25.3548 4.37928 26.2705 5.05442 26.9456C5.72955 27.6207 6.64522 28 7.6 28H24.4C25.3548 28 26.2705 27.6207 26.9456 26.9456C27.6207 26.2705 28 25.3548 28 24.4V10C28 9.04522 27.6207 8.12955 26.9456 7.45442C26.2705 6.77928 25.3548 6.4 24.4 6.4ZM25.6 24.4C25.6 24.7183 25.4736 25.0235 25.2485 25.2485C25.0235 25.4736 24.7183 25.6 24.4 25.6H7.6C7.28174 25.6 6.97652 25.4736 6.75147 25.2485C6.52643 25.0235 6.4 24.7183 6.4 24.4V16H25.6V24.4ZM25.6 13.6H6.4V10C6.4 9.68174 6.52643 9.37652 6.75147 9.15147C6.97652 8.92643 7.28174 8.8 7.6 8.8H10V10C10 10.3183 10.1264 10.6235 10.3515 10.8485C10.5765 11.0736 10.8817 11.2 11.2 11.2C11.5183 11.2 11.8235 11.0736 12.0485 10.8485C12.2736 10.6235 12.4 10.3183 12.4 10V8.8H19.6V10C19.6 10.3183 19.7264 10.6235 19.9515 10.8485C20.1765 11.0736 20.4817 11.2 20.8 11.2C21.1183 11.2 21.4235 11.0736 21.6485 10.8485C21.8736 10.6235 22 10.3183 22 10V8.8H24.4C24.7183 8.8 25.0235 8.92643 25.2485 9.15147C25.4736 9.37652 25.6 9.68174 25.6 10V13.6Z" fill="#800080"/>
        </svg>
         ${dateVal}`;
        todoListBlock.append(titleTodolistBlock);
        todoList.append(todoListBlock);
      } else {
        todoListBlock = document.querySelector(
          `#todo-${Date.parse(dateObject)}`
        );
      }

      // Create a single To do Element
      let todoItem = document.createElement('div');
      todoItem.classList.add('todo__single');
      todoItem.setAttribute('id', 'todo-item-' + Date.now());
      todoItem.innerHTML = `
    <div class='todo-item__single todo--complete'></div>
    <div class='todo-item__single todo--title'>${titleInputVal}</div>
    <div class='todo-item__single todo--edit'><img src='../assets/edit.png' alt='edit-icon' /></div>
    <div class='todo-item__single todo--remove'><img src='../assets/remove.png' alt='remove-icon' /></div>
    `;
      todoListBlock.append(todoItem);
      modal.style.display = 'none';
      removeInputValues();
      edittodo();
    }
    saveData();
  });
};

export default addtodo;

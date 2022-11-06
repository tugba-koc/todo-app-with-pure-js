import edittodo from './editTodoController.js';

const addtodo = () => {
  let modal = document.getElementById('add-todo__modal');
  let btn = document.getElementById('add-todo__btn');
  let cancelButton = document.querySelector('.add-todo__model-cancel');
  let form = document.querySelector('.add-todo__model-form');
  let titleInput = document.querySelector('.add-todo__model-input');
  let dateInput = document.querySelector('.add-todo__model-input.date');
  let todoList = document.querySelector('.add-todo__task-list');

  // Create state value for todos
  let todos = [];

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
      // Set todos
      todos = [
        ...todos,
        {
          title: titleInputVal,
          date: dateInputVal,
          id: Date.now(),
          isCompleted: false,
        },
      ];
      let todoListBlock = '';
      let todolistBlockAll =
        document.getElementsByClassName('todo-list--block');
      let blockIdList = Array.from(todolistBlockAll).map((el) => {
        return el.id;
      });
      let isValidBlock = blockIdList.includes(
        'todo-' + Date.parse(dateObject)
      );
      console.log([todolistBlockAll]);
      console.log('----------');
      console.log(Date.parse(dateObject));
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
      todoItem.setAttribute('id', 'todo-item-' + Date.parse(dateObject));
      todoItem.innerHTML = `
    <div class='todo-item__single todo--complete'></div>
    <div class='todo-item__single todo--title'>${titleInputVal}</div>
    <div class='todo-item__single todo--edit'><svg unselectable="on" width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.4539 6.12276C18.9075 5.65988 19.1571 5.04516 19.1571 4.39124C19.1571 3.73733 18.9075 3.12261 18.4539 2.65973L16.5507 0.717588C16.0971 0.254707 15.4947 0 14.8539 0C14.2131 0 13.6107 0.254707 13.1583 0.716363L0.399902 13.6954V19.1018H5.6955L18.4539 6.12276ZM14.8539 2.4491L16.7583 4.39002L14.8503 6.32971L12.9471 4.3888L14.8539 2.4491ZM2.7999 16.6527V14.7118L11.2479 6.11786L13.1511 8.06L4.7043 16.6527H2.7999ZM0.399902 21.5509H19.5999V24H0.399902V21.5509Z" fill="#272727"/>
    </svg></div>
    <div class='todo-item__single todo--remove'><svg class='icon-delete' unselectable="on" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0001 8.26688e-09C13.0771 -6.44109e-05 14.1132 0.37636 14.8961 1.05206C15.6789 1.72775 16.149 2.65149 16.2099 3.63378L16.2164 3.85185H23.0273C23.2738 3.85192 23.5111 3.93747 23.6913 4.09123C23.8714 4.24498 23.9809 4.45546 23.9977 4.68015C24.0145 4.90484 23.9374 5.12698 23.7818 5.30169C23.6262 5.47639 23.4039 5.59064 23.1596 5.62133L23.0273 5.62963H21.9947L20.3341 21.0607C20.2509 21.8301 19.8711 22.5473 19.2625 23.0844C18.6539 23.6215 17.8561 23.9435 17.0117 23.9929L16.7833 24H7.21695C6.37041 24 5.55145 23.7249 4.90645 23.2241C4.26144 22.7232 3.83242 22.0291 3.69605 21.2658L3.66621 21.0596L2.00435 5.62963H0.972985C0.737863 5.62962 0.510698 5.55183 0.333499 5.41065C0.156301 5.26946 0.0410577 5.07443 0.00908115 4.86163L0 4.74074C9.91523e-06 4.52594 0.0851591 4.31841 0.239701 4.15653C0.394242 3.99464 0.607722 3.88936 0.840659 3.86015L0.972985 3.85185H7.78388C7.78388 2.83028 8.22809 1.85054 9.0188 1.12818C9.8095 0.405819 10.8819 8.26689e-09 12.0001 8.26688e-09ZM20.0396 5.62963H3.9594L5.6031 20.8853C5.63949 21.2257 5.80369 21.5441 6.06782 21.7865C6.33196 22.0289 6.67976 22.1803 7.0522 22.2151L7.21695 22.2222H16.7833C17.5617 22.2222 18.2221 21.7185 18.3726 21.0347L18.3985 20.8853L20.0383 5.62963H20.0396ZM14.2704 8.88889C14.5056 8.8889 14.7327 8.96669 14.9099 9.10787C15.0871 9.24906 15.2024 9.44408 15.2344 9.65689L15.2434 9.77778V18.0741C15.2434 18.2993 15.1497 18.5161 14.9814 18.6806C14.8131 18.8452 14.5827 18.9453 14.3368 18.9606C14.0908 18.976 13.8477 18.9055 13.6564 18.7633C13.4652 18.6212 13.3401 18.4181 13.3065 18.195L13.2975 18.0741V9.77778C13.2975 9.54203 13.4 9.31594 13.5824 9.14924C13.7649 8.98254 14.0124 8.88889 14.2704 8.88889ZM9.72985 8.88889C9.96497 8.8889 10.1921 8.96669 10.3693 9.10787C10.5465 9.24906 10.6618 9.44408 10.6938 9.65689L10.7028 9.77778V18.0741C10.7028 18.2993 10.6091 18.5161 10.4408 18.6806C10.2725 18.8452 10.0421 18.9453 9.79617 18.9606C9.55022 18.976 9.30707 18.9055 9.11583 18.7633C8.9246 18.6212 8.79955 18.4181 8.76595 18.195L8.75686 18.0741V9.77778C8.75686 9.54203 8.85938 9.31594 9.04185 9.14924C9.22432 8.98254 9.4718 8.88889 9.72985 8.88889ZM12.0001 1.77778C11.4304 1.7778 10.8815 1.97354 10.4623 2.32614C10.0432 2.67874 9.78452 3.16243 9.73763 3.68119L9.72985 3.85185H14.2704C14.2704 3.30177 14.0313 2.77422 13.6055 2.38526C13.1797 1.9963 12.6023 1.77778 12.0001 1.77778Z" fill="#272727"/>
    </svg></div>
    `;
      todoListBlock.append(todoItem);
      modal.style.display = 'none';
      removeInputValues();
    }
    if (todos.length > 0) {
      edittodo();
    }
  });
};

export default addtodo;

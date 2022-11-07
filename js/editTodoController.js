import { saveData } from './dataController.js';

const edittodo = () => {
  let todoItems = document.getElementsByClassName('todo__single');
  Array.from(todoItems).forEach((todo) => {
    todo.addEventListener('click', function (e) {
      // COMPLETE -----------------------------------
      if (e.target.classList.contains('todo--complete')) {
        e.target.innerHTML = `<img src='../assets/done.png' alt='done-icon' />`;
        e.target.nextElementSibling.classList.add('completed-todo');
      }
      // EDIT -----------------------------------
      else if (e.target.closest('.todo--edit')) {
        let todoId = e.currentTarget.id;
        let parentItem = e.target.parentNode;
        parentItem.innerHTML = `<img id='done-icon-${todoId}' src='../assets/bold.png' alt='done-icon' />
          `;
        let inputDom = document.createElement('input');
        inputDom.setAttribute('type', 'text');
        inputDom.setAttribute(
          'value',
          parentItem.previousElementSibling.innerHTML
        );
        inputDom.classList.add('todo--edit-input');
        parentItem.previousElementSibling.innerHTML = '';
        parentItem.previousElementSibling.classList.add('edited-todo');
        parentItem.previousElementSibling.append(inputDom);
        let val = '';
        document
          .querySelector(`#done-icon-${todoId}`)
          .addEventListener('click', function () {
            val = inputDom.value;
            parentItem.previousElementSibling.innerHTML = val;
            parentItem.previousElementSibling.classList.remove('edited-todo');
            parentItem.innerHTML = `<img src='../assets/edit.png' alt='edit-icon' />`;
          });
      }
      // REMOVE -----------------------------------
      else if (e.target.closest('.todo--remove')) {
        let parentItem = e.currentTarget;

        let grandParentItem = e.currentTarget.parentNode;
        e.target.parentNode.innerHTML = `<img src='../assets/active-remove.png' alt='active-remove-icon' />`;
        // setTimeout(() => {
          parentItem.remove();
        // }, 300);

        if (grandParentItem.childNodes.length == 2) {
          // setTimeout(() => {
            grandParentItem.remove();
          // }, 300);
        }
      }
      let docText = document.querySelector('.add-todo__task-list').innerHTML;
      console.log(docText,'edit');
      saveData();
    });
  });
};

export default edittodo;

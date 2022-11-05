const addtodo = () => {
  let modal = document.getElementById('add-todo__modal');
  let btn = document.getElementById('add-todo__btn');
  let cancelButton = document.querySelector('.add-todo__model-cancel');
  let form = document.querySelector('.add-todo__model-form');
  let saveButton = document.querySelector('.add-todo__model-save');
  let titleInput = document.querySelector('.add-todo__model-input');
  let dateInput = document.querySelector('.add-todo__model-input.date');

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
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (titleInput.value.length && dateInput.value.length) {
      titleInputVal = titleInput.value.trim();
      dateInputVal = dateInput.value.trim();
      todos = [
        ...todos,
        { title: titleInputVal, date: dateInputVal, id: Date.now() },
      ];
      removeInputValues();
    }
  });
};

export default addtodo;

const addtodo = () => {
  let modal = document.getElementById('add-todo__modal');
  let btn = document.getElementById('add-todo__btn');
  let cancelButton = document.querySelector('.add-todo__model-cancel');
  let form = document.querySelector('.add-todo__model-form')
  let saveButton = document.querySelector('.add-todo__model-save');

  // Create state value for todos
  let todos = [];

  // When the user clicks the button, open the modal
  btn.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  // When the user clicks on cancel, close the modal
  cancelButton.addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = 'none';
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // --------------------------------------------------
  // Submit Handler
  form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log(e);
  })
};

export default addtodo;

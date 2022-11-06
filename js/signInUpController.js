const signInUp = () => {
  let signInInput = document.querySelector('.sign-in-up__input');
  let signInBtn = document.querySelector('.sign-in-up__btn');
  let signInDirection = document.querySelector('.sign-in-up__href');
  let inputValue = '';

  signInBtn.addEventListener('click', () => {
    inputValue = signInInput.value;
    if (inputValue.trim().length) {
      localStorage.setItem('user', inputValue);
      signInDirection.href = '/addToDo';
    } else {
      alert('Please type a valid username');
    }
  });
};

export default signInUp;

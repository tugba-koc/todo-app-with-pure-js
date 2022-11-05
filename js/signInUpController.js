const signInUp = () => {
  let signInInput = document.querySelector('.sign-in-up__input');
  let signInBtn = document.querySelector('.sign-in-up__btn');
  let inputValue = '';

  signInBtn.addEventListener('click', () => {
    inputValue = signInInput.value;
    localStorage.setItem('user', inputValue);
  });
};

export default signInUp;

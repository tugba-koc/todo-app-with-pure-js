const signInUp = () => {
  let signInInput = document.querySelector('.sign-in-up__input');
  let signInBtn = document.querySelector('.sign-in-up__btn');
  let signInDirection = document.querySelector('.sign-in-up__href');
  let inputValue = '';

  signInBtn.addEventListener('click', () => {
    let prevUsers = [];
    inputValue = signInInput.value;
    if (inputValue.trim().length) {
      prevUsers = JSON.parse(localStorage.getItem('user'));
      if (!prevUsers) {
        prevUsers = [inputValue];
      } else {
        if(!prevUsers.includes(inputValue)){
          prevUsers.push(inputValue);
        }
      }
      localStorage.setItem('user', JSON.stringify(prevUsers));
      localStorage.setItem('active-user', inputValue);
      signInDirection.href = '/addToDo';
    } else {
      alert('Please type a valid username');
    }
  });
};

export default signInUp;

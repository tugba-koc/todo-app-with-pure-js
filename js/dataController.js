const getData = () => {
  let currentUser = localStorage.getItem('active-user');
  let res = JSON.parse(localStorage.getItem('user-data'));
  if (res) {
    let userDataObj = res.find((el) => el.user == currentUser);
    if (userDataObj) {
      if (userDataObj.data) {
        document.querySelector('.add-todo__task-list').innerHTML =
          userDataObj.data;
      }
    }
  }
};

const saveData = () => {
  let userDataList = [];
  let isValid = false;
  let docText = document.querySelector('.add-todo__task-list').innerHTML;
  userDataList = JSON.parse(localStorage.getItem('user-data'));
  if (!userDataList) {
    userDataList = [
      { user: localStorage.getItem('active-user'), data: docText },
    ];
  } else {
    isValid = userDataList.find(
      (el) => el.user == localStorage.getItem('active-user')
    );
    console.log(isValid);
    userDataList.push({ user: localStorage.getItem('active-user'), data: '' });
    userDataList = userDataList.map((el) =>
      el.user == localStorage.getItem('active-user')
        ? { user: localStorage.getItem('active-user'), data: docText }
        : el
    );
  }

  localStorage.setItem('user-data', JSON.stringify(userDataList));
};

export { getData, saveData };

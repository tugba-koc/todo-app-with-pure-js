const getData = () => {
  let userName = localStorage.getItem('user');
  let res = JSON.parse(localStorage.getItem('user-data'));
  if (res) {
    if (res.user == userName && res.data) {
      document.querySelector('.add-todo__task-list').innerHTML = res.data;
    }
  }
};

const saveData = () => {
  let docText = document.querySelector('.add-todo__task-list').innerHTML;
  localStorage.setItem(
    'user-data',
    JSON.stringify({ user: localStorage.getItem('user'), data: docText })
  );
};

export {
    getData,
    saveData
}

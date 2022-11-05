import addtodo from './addTodoController.js';
import signInUp from './signInUpController.js';

export default function deneme() {
  // create document click that watches the nav links only
  document.addEventListener('click', (e) => {
    const { target } = e;
    if (!target.matches('a')) {
      return;
    }
    // e.preventDefault();
    urlRoute();
  });

  // create an object that maps the url to the template
  const urlRoutes = {
    404: {
      template: '/templates/404.html',
      title: '404 ',
      description: 'Page not found',
    },
    '/': {
      template: 'index.html',
      title: 'Sign In Up',
      description: 'This is Sign In/Up page',
    },
    '/addToDo': {
      template: '/templates/addToDo.html',
      title: 'Add ToDo',
      description: 'This is Add Todo page',
    },
  };

  // create a function that watches the url and calls the urlLocationHandler
  const urlRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    urlLocationHandler();
  };

  // create a function that handles the url location
  const urlLocationHandler = async () => {
    const location = window.location.pathname; // get the url path
    if (location.length == 0) {
      location = '/';
    }

    const route = urlRoutes[location];
    const html = await fetch(route.template).then((response) =>
      response.text()
    );

    document.getElementById('content').innerHTML = html;
    document.title = route.title;
    // set the description of the document to the description of the route
    document.querySelector('meta[name="description"]');
    if (route.template.includes('addToDo')) {
      document.getElementById('content').classList.add('addtodo')
      document.getElementById('content').classList.remove('signinup')
      addtodo();
    } else {
      document.getElementById('content').classList.add('signinup')
      document.getElementById('content').classList.remove('addtodo')
      signInUp();
    }
  };

  // add an event listener to the window that watches for url changes
  window.onpopstate = urlLocationHandler;
  window.route = urlRoute;
  // call the urlLocationHandler function to handle the initial url
  urlLocationHandler();
}

deneme();

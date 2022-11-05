// create document click that watches the nav links only
document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.matches("nav a")) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// create an object that maps the url to the template
const urlRoutes = {
	404: {
		template: "/templates/404.html",
		title: "404 ",
		description: "Page not found",
	},
	"/": {
		template: "/templates/index.html",
		title: "Home | ",
		description: "This is the home page",
	},
	"/signInUp": {
		template: "/templates/signInUp.html",
		title: "Contact Us | ",
		description: "This is the contact page",
	},
};

// create a function that watches the url and calls the urlLocationHandler
const urlRoute = (event) => {
	event = event || window.event;
	event.preventDefault();
    console.log(event, 'test');
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

// create a function that handles the url location
const urlLocationHandler = async () => {
	const location = window.location.pathname; // get the url path
	if (location.length == 0) {
		location = "/";
	}

	const route = urlRoutes[location];
	const html = await fetch(route.template).then((response) => response.text());
	document.getElementById("content").innerHTML = html;
	document.title = route.title;
	// set the description of the document to the description of the route
	document
		.querySelector('meta[name="description"]')
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();
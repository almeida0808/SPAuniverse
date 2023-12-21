export class Router {
  routes = {};
  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    this.alterarBg()
   
    fetch(route)
      .then((date) => date.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }

  alterarBg() {
    const { pathname } = window.location;
    const { body } = document;
    
    switch (pathname) {
      case "/":
        body.className = "home";
        break;
      case "/universe":
        body.className = "universe";
        break;
      case "/explorer":
        body.className = "explorer";
        break;

      default:
        body.className = '';
        break;
    }
  }
}

const router = new Router();

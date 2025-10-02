// /scripts/router.js
import { plugins } from "./main.js";

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentPath = window.location.pathname;

    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname, false);
    });
  }

  navigate(path, pushState = true) {
    if (pushState) {
      history.pushState({}, "", path);
    }

    plugins.trigger("beforeRoute", path);

    this.currentPath = path;
    this.render();

    plugins.trigger("afterRoute", path);
  }

  render() {
    const route = this.routes.find(r => r.path === this.currentPath);
    const view = document.getElementById("app");

    if (route) {
      view.innerHTML = `<h1>${route.title}</h1><p>Ruta actual: ${route.path}</p>`;
    } else {
      view.innerHTML = `<h1>404</h1><p>Página no encontrada</p>`;
    }
  }
}
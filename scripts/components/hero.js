// components/hero.js
// Web Component: <tres-hero>
// Renderiza el hero principal dinámico según datos del store o props

import { appStore } from "../store.js";

export class TresHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.unsubscribe = null;
  }

  connectedCallback() {
    this.render();

    // Suscribirse a cambios en el store (ej: theme, proyectos destacados)
    this.unsubscribe = appStore.subscribe((key, value) => {
      if (key === "projects") this.updateProjects(value);
    });
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const style = `
      <style>
        :host {
          display: block;
          padding: 1.5rem;
          background: linear-gradient(160deg, #1e1b4b, #0f172a);
          color: #e6eef6;
          border-radius: 16px;
        }
        h2 {
          margin: 0 0 0.5rem 0;
          font-family: "Playfair Display", serif;
        }
        p {
          margin: 0 0 1rem 0;
          color: #9aa6b2;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0 0 0;
          display: flex;
          gap: 12px;
        }
        li {
          background: rgba(255,255,255,0.05);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.9rem;
        }
      </style>
    `;

    const html = `
      <div>
        <h2>Bienvenido a Tresnio</h2>
        <p>Laboratorio público & archivo simbólico</p>
        <ul id="project-list">
          <li>Cargando proyectos...</li>
        </ul>
      </div>
    `;

    this.shadowRoot.innerHTML = style + html;
  }

  updateProjects(projects) {
    const ul = this.shadowRoot.querySelector("#project-list");
    if (!ul) return;
    ul.innerHTML = "";

    if (!projects || projects.length === 0) {
      ul.innerHTML = "<li>No hay proyectos aún.</li>";
      return;
    }

    projects.slice(0, 3).forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.title || "Proyecto sin título";
      ul.appendChild(li);
    });
  }
}

customElements.define("tres-hero", TresHero);
// store.js
// Store reactivo minimal para Tresnio
// Permite suscribirse a cambios de estado de forma ligera

export class Store {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = new Set();
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    const old = this.state[key];
    if (old === value) return;
    this.state[key] = value;
    this.notify(key, value);
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(key, value) {
    for (const cb of this.listeners) {
      try {
        cb(key, value, this.state);
      } catch (err) {
        console.error("[Store] Error en listener:", err);
      }
    }
  }
}

// Instancia global para usar en toda la app
export const appStore = new Store({
  theme: "dark",
  nav: [],
  projects: []
});
// /scripts/plugin-system.js
export class PluginSystem {
  constructor() {
    this.plugins = [];
  }

  use(plugin) {
    if (plugin && typeof plugin.init === "function") {
      this.plugins.push(plugin);
      plugin.init();
    }
  }

  trigger(hook, ...args) {
    for (const plugin of this.plugins) {
      if (typeof plugin[hook] === "function") {
        plugin[hook](...args);
      }
    }
  }
}
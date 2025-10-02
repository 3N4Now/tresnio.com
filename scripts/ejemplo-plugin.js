// /plugins/ejemplo-plugin.js
export const ejemploPlugin = {
  init() {
    console.log("✅ Plugin de ejemplo inicializado");
  },
  beforeRoute(to) {
    console.log("🔄 Navegando hacia:", to);
  },
  afterRoute(to) {
    console.log("✅ Llegamos a:", to);
  }
};
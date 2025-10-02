// api.js
// Capa de datos con fetch + cache simple para Tresnio

const cache = new Map();

export async function fetchJSON(url, ttl = 300000) {
  const now = Date.now();

  // Revisar cache
  if (cache.has(url)) {
    const { data, expiry } = cache.get(url);
    if (now < expiry) {
      return data;
    }
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`[API] Error HTTP ${res.status}`);
    const data = await res.json();

    cache.set(url, { data, expiry: now + ttl });
    return data;
  } catch (err) {
    console.error("[API] fetchJSON error:", err);
    throw err;
  }
}

// API especializada para la app
export async function getConfig() {
  return await fetchJSON("/config.json");
}

export async function getProjects() {
  return await fetchJSON("/_data/projects.json");
}

export async function getBlogPosts() {
  return await fetchJSON("/_data/posts.json");
}
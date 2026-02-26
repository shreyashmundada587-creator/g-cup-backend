// services/api.ts
export const API_BASE = "https://<your-railway-host>"; // set production/staging

async function request(path: string, opts: RequestInit = {}) {
  const token = await import("../store/session").then(m => m.getToken());
  const headers = new Headers(opts.headers || {});
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  // enforce UTC times in request bodies if sending dates
  return fetch(`${API_BASE}${path}`, { ...opts, headers });
}

export async function getJSON(path: string) {
  const res = await request(path, { method: "GET" });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

export async function postJSON(path: string, body: any) {
  const res = await request(path, { method: "POST", body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}
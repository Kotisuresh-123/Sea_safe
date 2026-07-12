const API_URL = "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("seasafe_token");
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const authAPI = {
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  getMe: () => request("/auth/me"),
  updateMe: (body) => request("/auth/me", { method: "PUT", body: JSON.stringify(body) }),
};

export const alertsAPI = {
  getAll: (params = "") => request(`/alerts${params ? `?${params}` : ""}`),
  create: (body) => request("/alerts", { method: "POST", body: JSON.stringify(body) }),
  remove: (id) => request(`/alerts/${id}`, { method: "DELETE" }),
};

export const sosAPI = {
  create: (body) => request("/sos", { method: "POST", body: JSON.stringify(body) }),
  getAll: () => request("/sos"),
  getActive: () => request("/sos/active"),
  respond: (id) => request(`/sos/${id}/respond`, { method: "PUT" }),
  resolve: (id) => request(`/sos/${id}/resolve`, { method: "PUT" }),
};

export const locationsAPI = {
  getAll: () => request("/locations"),
  create: (body) => request("/locations", { method: "POST", body: JSON.stringify(body) }),
  remove: (id) => request(`/locations/${id}`, { method: "DELETE" }),
};

export const weatherAPI = {
  save: (body) => request("/weather", { method: "POST", body: JSON.stringify(body) }),
  getHistory: (params = "") => request(`/weather${params ? `?${params}` : ""}`),
};

export const adminAPI = {
  getStats: () => request("/admin/stats"),
  getUsers: () => request("/admin/users"),
  deactivateUser: (id) => request(`/admin/users/${id}/deactivate`, { method: "PUT" }),
};

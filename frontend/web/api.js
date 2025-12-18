const API_BASE = "http://localhost:4000";

export async function getFungi() {
  const res = await fetch(`${API_BASE}/api/fungi`);
  if (!res.ok) throw new Error("Failed to fetch fungi");
  return res.json();
}

export async function createFungus(payload) {
  const res = await fetch(`${API_BASE}/api/fungi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create fungus");
  return res.json();
}

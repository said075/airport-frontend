import type { TuzlaFlight } from "../types/flight";

const API_BASE =
  process.env.REACT_APP_API_URL || "";

export async function fetchTuzlaFlights(): Promise<TuzlaFlight[]> {
  const res = await fetch(`${API_BASE}/api/flights/tuzla`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { detail?: string }).detail || (err as { error?: string }).error || "Failed to load flights");
  }
  return res.json();
}

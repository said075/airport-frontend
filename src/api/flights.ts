import type { TuzlaFlight, BanjaLukaFlight } from "../types/flight";

const API_BASE =
  process.env.REACT_APP_API_URL || "";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { detail?: string }).detail || (err as { error?: string }).error || "Failed to load flights");
  }
  return res.json();
}

export async function fetchTuzlaFlights(): Promise<TuzlaFlight[]> {
  const res = await fetch(`${API_BASE}/api/flights/tuzla`);
  return handleResponse<TuzlaFlight[]>(res);
}

export async function fetchBanjaLukaFlights(): Promise<BanjaLukaFlight[]> {
  const res = await fetch(`${API_BASE}/api/flights/banjaluka`);
  return handleResponse<BanjaLukaFlight[]>(res);
}

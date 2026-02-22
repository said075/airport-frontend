import React, { useEffect, useState } from "react";
import { fetchMostarFlights } from "../api/flights";
import type { MostarFlight } from "../types/flight";

let mostarFetchPromise: Promise<MostarFlight[]> | null = null;

export function MostarFlights() {
  const [flights, setFlights] = useState<MostarFlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    if (!mostarFetchPromise) {
      mostarFetchPromise = fetchMostarFlights();
    }
    mostarFetchPromise
      .then((data) => {
        if (!cancelled) setFlights(data);
      })
      .catch((e) => {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Failed to load flights"
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
        mostarFetchPromise = null;
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const byType = flights.reduce<Record<string, MostarFlight[]>>((acc, f) => {
    const key = f.type || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  const types = Object.keys(byType);

  return (
    <div className="page page-mostar">
      <header className="page-header">
        <h1>Mostar International Airport</h1>
        <p className="subtitle">Flight schedule</p>
      </header>
      {loading && <p className="loading">Loading flights…</p>}
      {error && (
        <div className="error" role="alert">
          {error}
          <br />
          <small>Ensure airport-backend is running on port 3001.</small>
        </div>
      )}
      {!loading && !error && flights.length === 0 && (
        <p className="empty">No flights available.</p>
      )}
      {!loading && !error && types.length > 0 && (
        <div className="schedules">
          {types.map((type) => (
            <section key={type} className="schedule-section">
              <h2>{type}</h2>
              <div className="table-wrap">
                <table className="flights-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Flight</th>
                      <th>Airline</th>
                      <th>Destination</th>
                      <th>IATA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {byType[type].map((f, i) => (
                      <tr key={`${f.date}-${f.flightNumber}-${f.time}-${i}`}>
                        <td>{f.date}</td>
                        <td>{f.time}</td>
                        <td>{f.flightNumber}</td>
                        <td>{f.airline || "—"}</td>
                        <td>{f.destination}</td>
                        <td>{f.iata || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

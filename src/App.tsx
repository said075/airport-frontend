import React, { useEffect, useState } from "react";
import { fetchTuzlaFlights } from "./api/flights";
import type { TuzlaFlight } from "./types/flight";
import "./App.css";

function App() {
  const [flights, setFlights] = useState<TuzlaFlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchTuzlaFlights()
      .then((data) => {
        if (!cancelled) {
          setFlights(data);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load flights");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const byType = flights.reduce<Record<string, TuzlaFlight[]>>((acc, f) => {
    const key = f.type || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  const types = Object.keys(byType);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tuzla International Airport</h1>
        <p className="subtitle">Flight information</p>
      </header>
      <main className="App-main">
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
                        <th>Time</th>
                        <th>Airline</th>
                        <th>City</th>
                        <th>IATA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {byType[type].map((f, i) => (
                        <tr key={`${f.time}-${f.airline}-${f.iata}-${i}`}>
                          <td>{f.time}</td>
                          <td>{f.airline}</td>
                          <td>{f.city}</td>
                          <td>{f.iata}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

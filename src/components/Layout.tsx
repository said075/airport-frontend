import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function Layout() {
  const [airportsOpen, setAirportsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-layout">
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li
            className="nav-dropdown"
            onMouseEnter={() => setAirportsOpen(true)}
            onMouseLeave={() => setAirportsOpen(false)}
          >
            <button
              type="button"
              className={
                location.pathname.startsWith("/airports") ? "active" : ""
              }
              aria-expanded={airportsOpen}
              aria-haspopup="true"
            >
              Airports
            </button>
            {airportsOpen && (
              <ul className="nav-dropdown-menu" role="menu">
                <li role="none">
                  <Link
                    to="/airports/tuzla"
                    className={
                      location.pathname === "/airports/tuzla" ? "active" : ""
                    }
                    role="menuitem"
                  >
                    Tuzla
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/buses"
              className={location.pathname === "/buses" ? "active" : ""}
            >
              Buses
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

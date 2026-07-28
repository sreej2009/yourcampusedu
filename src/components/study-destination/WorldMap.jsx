// src/components/study-destination/WorldMap.jsx
// Requires: npm install d3-geo topojson-client
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Clock3,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { destinations, origin } from "../../Data/studyDestination";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const WIDTH = 980;
const HEIGHT = 580;
const FLIGHT_DURATION = 1600; // ms

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const lerp = (a, b, t) => a + (b - a) * t;

const bearing = (from, to) => {
  const dLon = to.lon - from.lon;
  const dLat = to.lat - from.lat;
  return (Math.atan2(dLat, dLon) * 180) / Math.PI;
};

const projection = geoEqualEarth().scale(195).translate([WIDTH / 2, HEIGHT / 2 + 40]);
const pathGenerator = geoPath(projection);

const WorldMap = () => {
  const [countries, setCountries] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [hoveredDest, setHoveredDest] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [flying, setFlying] = useState(false);
  const [planePos, setPlanePos] = useState(origin.coords);
  const [planeAngle, setPlaneAngle] = useState(0);
  const [arrived, setArrived] = useState(false);
  const rafRef = useRef(null);

  const selected = destinations.find((d) => d.id === selectedId) || null;

  useEffect(() => {
    let cancelled = false;
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topology) => {
        if (cancelled) return;
        const geo = feature(topology, topology.objects.countries);
        setCountries(geo.features);
      })
      .catch(() => !cancelled && setLoadError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const flyTo = useCallback((dest) => {
    cancelAnimationFrame(rafRef.current);
    setArrived(false);
    setFlying(true);
    setPlaneAngle(bearing(origin.coords, dest.coords));

    const start = performance.now();

    const step = (now) => {
      const raw = Math.min((now - start) / FLIGHT_DURATION, 1);
      const t = easeInOutCubic(raw);
      const arc = Math.sin(Math.PI * t) * 8;

      setPlanePos({
        lon: lerp(origin.coords.lon, dest.coords.lon, t),
        lat: lerp(origin.coords.lat, dest.coords.lat, t) + arc,
      });

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setFlying(false);
        setArrived(true);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  const handleSelect = (dest) => {
    if (flying) return;
    setSelectedId(dest.id);
    flyTo(dest);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const originXY = useMemo(() => projection([origin.coords.lon, origin.coords.lat]), []);
  const destXY = useMemo(
    () =>
      Object.fromEntries(
        destinations.map((d) => [d.id, projection([d.coords.lon, d.coords.lat])])
      ),
    []
  );
  const planeXY = useMemo(
    () => projection([planePos.lon, planePos.lat]),
    [planePos]
  );

  const activeLabelText = useMemo(() => {
    if (hoveredDest) return `${hoveredDest.flag} ${hoveredDest.name}`;
    if (selected) return `${selected.flag} ${selected.name}`;
    return null;
  }, [hoveredDest, selected]);

  return (
    <section className="sd-map" id="world-map">
      <div className="sd-map__glow sd-map__glow--one" aria-hidden="true"></div>
      <div className="sd-map__glow sd-map__glow--two" aria-hidden="true"></div>

      <div className="sd-map__head">
        <span className="sd-map__eyebrow">PICK A GATE</span>
        <h2 className="sd-map__title">
          Every flight on this board starts in India.
        </h2>
        <p className="sd-map__sub">
          Choose a country below and watch the route — the same shortlist our
          counsellors work off, cost and visa odds included.
        </p>
      </div>

      <div className="sd-map__chips">
        {destinations.map((d) => (
          <button
            key={d.id}
            className={`sd-map__chip ${selectedId === d.id ? "is-active" : ""}`}
            onClick={() => handleSelect(d)}
            disabled={flying}
          >
            <span className="sd-map__chip-flag">{d.flag}</span>
            <span>{d.name}</span>
          </button>
        ))}
      </div>

      <div className="sd-map__body">
        {/* ============ LEFT MAP CANVAS ============ */}
        <div className="sd-map__canvas">
          <div className="sd-map__hud">
            <span className="sd-map__hud-dot"></span>
            <span className="sd-map__hud-text">
              {activeLabelText ? (
                <>DEPARTURE MATRIX: <strong style={{ color: "var(--accent-blue)" }}>{activeLabelText.toUpperCase()}</strong></>
              ) : (
                "RADAR SYSTEM: READY"
              )}
            </span>
          </div>

          {loadError && (
            <div className="sd-map__error">
              Couldn't load the map data. Check your connection and refresh.
            </div>
          )}

          <svg
            className="sd-map__svg"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label="World map showing flight routes from India"
          >
            <defs>
              <radialGradient id="sdOceanGlow" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--primary-dark)" stopOpacity="0.02" />
              </radialGradient>
            </defs>

            <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#sdOceanGlow)" />

            <g>
              {countries.map((geo) => {
                const name = geo.properties.name;
                const isOrigin = name === origin.geoName;
                const matchDest = destinations.find((d) => d.geoName === name);
                const isSelected = selected && name === selected.geoName;

                let fill = "color-mix(in srgb, var(--white) 7%, transparent)";
                if (isOrigin) fill = "var(--accent-green)";
                else if (isSelected) fill = "var(--primary)";
                else if (matchDest) fill = "color-mix(in srgb, var(--white) 24%, transparent)";

                return (
                  <path
                    key={geo.id ?? name}
                    d={pathGenerator(geo)}
                    fill={fill}
                    stroke="color-mix(in srgb, var(--white) 12%, transparent)"
                    strokeWidth={0.6}
                    className={matchDest ? "sd-map__country is-clickable" : "sd-map__country"}
                    onMouseEnter={() => matchDest && setHoveredDest(matchDest)}
                    onMouseLeave={() => setHoveredDest(null)}
                    onClick={() => {
                      if (matchDest) handleSelect(matchDest);
                    }}
                  />
                );
              })}
            </g>

            {selected && originXY && destXY[selected.id] && (
              <line
                x1={originXY[0]}
                y1={originXY[1]}
                x2={destXY[selected.id][0]}
                y2={destXY[selected.id][1]}
                stroke="var(--accent-blue)"
                strokeWidth={1.8}
                strokeDasharray="4 5"
                strokeLinecap="round"
              />
            )}

            {originXY && (
              <g>
                <circle cx={originXY[0]} cy={originXY[1]} r={5} fill="var(--accent-green)" stroke="var(--white)" strokeWidth={1.5} />
                <circle cx={originXY[0]} cy={originXY[1]} r={12} fill="none" stroke="var(--accent-green)" strokeWidth={1} className="sd-map__pulse" />
                <text x={originXY[0]} y={originXY[1] + 18} textAnchor="middle" className="sd-map__origin-text">
                  India
                </text>
              </g>
            )}

            {destinations.map((d) => {
              const xy = destXY[d.id];
              if (!xy) return null;
              const isActive = selectedId === d.id;
              const isHovered = hoveredDest && hoveredDest.id === d.id;

              return (
                <g key={`dest-node-${d.id}`}>
                  <circle
                    cx={xy[0]}
                    cy={xy[1]}
                    r={isActive || isHovered ? 5.5 : 4}
                    fill={isActive ? "var(--secondary)" : "var(--accent-blue)"}
                    stroke="var(--white)"
                    strokeWidth={1.2}
                    className="is-clickable"
                    onMouseEnter={() => setHoveredDest(d)}
                    onMouseLeave={() => setHoveredDest(null)}
                    onClick={() => handleSelect(d)}
                  />
                </g>
              );
            })}

            {(flying || arrived) && planeXY && (
              <g transform={`translate(${planeXY[0]}, ${planeXY[1]}) rotate(${planeAngle})`}>
                <foreignObject x={-10} y={-10} width={20} height={20}>
                  <div style={{ color: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plane size={20} fill="var(--secondary)" strokeWidth={1.5} />
                  </div>
                </foreignObject>
              </g>
            )}
          </svg>
        </div>

        {/* ============ RIGHT SIDEBOARD CARD ============ */}
        <div className="sd-map__side">
          <AnimatePresence mode="wait">
            {!selected && (
              <motion.div
                key="idle"
                className="sd-map__idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="sd-map__idle-icon">
                  <MapPin size={22} />
                </div>
                <h4>Select Destination</h4>
                <p>Click any active country or quick-chip to explore costs, timeline durations, and updated visa parameters.</p>
              </motion.div>
            )}

            {selected && !arrived && (
              <motion.div
                key="loading"
                className="sd-map__loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="sd-map__loading-plane">
                  <Plane size={22} />
                </div>
                <p>Configuring Route: IND → {selected.code}</p>
              </motion.div>
            )}

            {selected && arrived && (
              <motion.div
                key={selected.id}
                className="sd-map__pass"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="sd-map__pass-header">
                  <span className="sd-map__pass-gate">{selected.gate || "GATE 01"}</span>
                  <span className="sd-map__pass-route">IND → {selected.code}</span>
                </div>

                <div className="sd-map__pass-title-row">
                  <span className="sd-map__pass-flag">{selected.flag}</span>
                  <div>
                    <h3 className="sd-map__pass-name">{selected.name}</h3>
                    <p className="sd-map__pass-tagline">{selected.tagline}</p>
                  </div>
                </div>

                <div className="sd-map__pass-stats">
                  <div className="sd-map__card-stat">
                    <div className="sd-map__card-icon color-duration">
                      <Clock3 size={16} />
                    </div>
                    <div className="sd-map__card-info">
                      <span className="sd-map__card-label">COURSE DURATION</span>
                      <span className="sd-map__card-value">{selected.duration}</span>
                    </div>
                  </div>

                  <div className="sd-map__card-stat">
                    <div className="sd-map__card-icon color-cost">
                      <IndianRupee size={16} />
                    </div>
                    <div className="sd-map__card-info">
                      <span className="sd-map__card-label">ESTIMATED INVESTMENT</span>
                      <span className="sd-map__card-value">{selected.avgCost}</span>
                    </div>
                  </div>

                  <div className="sd-map__card-stat">
                    <div className="sd-map__card-icon color-visa">
                      <ShieldCheck size={16} />
                    </div>
                    <div className="sd-map__card-info">
                      <span className="sd-map__card-label">VISA APPROVAL RATE</span>
                      <span className="sd-map__card-value">{selected.visaRate}</span>
                    </div>
                  </div>
                </div>

                <div className="sd-map__pass-fields">
                  <p className="sd-map__fields-title">In-Demand Industries:</p>
                  <div className="sd-map__fields-grid">
                    {selected.topFields?.map((f) => (
                      <span key={f} className="sd-map__pass-chip">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/*
                  FIX: was a plain <a href="/destinations/:id">, which 404'd —
                  App.jsx defines the Country Details route as
                  /study-destination/:countryId. Switched to React Router's
                  Link so this is a client-side nav, not a full page reload.
                */}
                <Link to={`/study-destination/${selected.id}`} className="sd-map__pass-cta">
                  <span>Explore {selected.name}</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .sd-map {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 15% 0%, color-mix(in srgb, var(--primary) 22%, transparent) 0%, transparent 55%),
            radial-gradient(110% 80% at 100% 100%, color-mix(in srgb, var(--accent-green) 12%, transparent) 0%, transparent 50%),
            linear-gradient(180deg, var(--primary-dark) 0%, var(--bg-dark) 55%, var(--bg-dark) 100%);
          color: var(--text-white);
          padding: 5rem 0;
          font-family: var(--font-main);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sd-map__glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }

        .sd-map__glow--one {
          top: -10%;
          right: -8%;
          width: 420px;
          height: 420px;
          background: color-mix(in srgb, var(--accent-blue) 18%, transparent);
        }

        .sd-map__glow--two {
          bottom: -12%;
          left: -6%;
          width: 380px;
          height: 380px;
          background: color-mix(in srgb, var(--accent-pink) 12%, transparent);
        }

        .sd-map__head {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto 2.5rem;
          text-align: center;
          padding: 0 1.5rem;
        }

        .sd-map__eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--accent-blue);
          margin-bottom: 0.75rem;
        }

        .sd-map__title {
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
          color: var(--white);
        }

        .sd-map__sub {
          color: var(--text-light);
          font-size: 1rem;
          line-height: 1.6;
        }

        .sd-map__chips {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          padding: 0 1.5rem;
          margin-bottom: 2.5rem;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }

        .sd-map__chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: color-mix(in srgb, var(--white) 5%, transparent);
          border: 1px solid var(--border-dark);
          color: color-mix(in srgb, var(--white) 85%, transparent);
          font-family: var(--font-main);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.55rem 1.1rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
        }

        .sd-map__chip-flag { font-size: 1.05rem; }

        .sd-map__chip:hover { 
          border-color: var(--primary); 
          background: color-mix(in srgb, var(--primary) 15%, transparent);
          color: var(--white);
        }

        .sd-map__chip.is-active {
          background: var(--primary);
          border-color: transparent;
          color: var(--white);
          box-shadow: var(--shadow-md);
        }

        .sd-map__chip:disabled { opacity: 0.5; cursor: not-allowed; }

        .sd-map__body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: grid;
          grid-template-columns: 73% 27%;
          gap: 2rem;
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          padding: 0 2rem;
          align-items: stretch;
        }

        .sd-map__canvas {
          position: relative;
          min-height: 520px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: color-mix(in srgb, var(--bg-dark) 82%, var(--white) 3%);
          border: 1px solid var(--border-dark);
          box-shadow: inset 0 0 40px color-mix(in srgb, var(--black) 40%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sd-map__svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .sd-map__hud {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          z-index: 10;
          background: color-mix(in srgb, var(--bg-dark) 88%, transparent);
          border: 1px solid var(--border-dark);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          backdrop-filter: blur(8px);
          box-shadow: var(--shadow-sm);
        }

        .sd-map__hud-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-green);
          box-shadow: 0 0 8px var(--accent-green);
        }

        .sd-map__hud-text {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--text-light);
        }

        .sd-map__country {
          transition: fill 0.3s ease, opacity 0.3s;
          outline: none;
        }

        .sd-map__country.is-clickable { cursor: pointer; }
        .sd-map__country.is-clickable:hover { 
          fill: color-mix(in srgb, var(--primary) 50%, transparent) !important; 
        }

        .sd-map__pulse {
          animation: sdPulse 2.5s ease-out infinite;
          transform-origin: center;
        }

        @keyframes sdPulse {
          0% { r: 5; opacity: 0.7; }
          100% { r: 20; opacity: 0; }
        }

        .sd-map__error {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          font-size: 0.95rem;
        }

        .sd-map__origin-text {
          font-family: var(--font-main);
          font-size: 12px;
          font-weight: 700;
          fill: var(--accent-green);
          pointer-events: none;
        }

        .sd-map__side {
          position: relative;
          min-height: 520px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-dark);
          background: color-mix(in srgb, var(--bg-dark) 75%, transparent);
          backdrop-filter: blur(20px);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .sd-map__idle,
        .sd-map__loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.8rem;
          padding: 2.5rem 1.5rem;
          color: var(--text-light);
        }

        .sd-map__idle-icon,
        .sd-map__loading-plane {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--primary) 12%, transparent);
          border: 1px solid var(--primary);
          color: var(--accent-blue);
          margin-bottom: 0.5rem;
        }

        .sd-map__loading-plane svg {
          animation: sdFlyBob 1.2s ease-in-out infinite;
        }

        @keyframes sdFlyBob {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-5px) rotate(45deg); }
        }

        .sd-map__idle h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--white);
          margin: 0;
        }

        .sd-map__idle p {
          font-size: 0.85rem;
          line-height: 1.6;
          margin: 0;
        }

        .sd-map__pass {
          flex: 1;
          width: 100%;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
        }

        .sd-map__pass-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          border-bottom: 1px dashed var(--border-dark);
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
        }

        .sd-map__pass-gate { color: var(--secondary); }
        .sd-map__pass-route { color: var(--accent-blue); }

        .sd-map__pass-title-row {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .sd-map__pass-flag {
          font-size: 2rem;
          line-height: 1;
        }

        .sd-map__pass-name {
          font-size: 1.35rem;
          font-weight: 700;
          margin: 0 0 0.25rem;
          color: var(--white);
        }

        .sd-map__pass-tagline {
          color: var(--text-light);
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0;
        }

        .sd-map__pass-stats {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .sd-map__card-stat {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: color-mix(in srgb, var(--white) 3%, transparent);
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-md);
          padding: 0.7rem 0.9rem;
        }

        .sd-map__card-icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .sd-map__card-icon.color-duration { background: color-mix(in srgb, var(--accent-blue) 10%, transparent); color: var(--accent-blue); }
        .sd-map__card-icon.color-cost { background: color-mix(in srgb, var(--accent-green) 10%, transparent); color: var(--accent-green); }
        .sd-map__card-icon.color-visa { background: color-mix(in srgb, var(--secondary) 10%, transparent); color: var(--secondary); }

        .sd-map__card-info { display: flex; flex-direction: column; }

        .sd-map__card-label {
          font-size: 0.62rem;
          font-weight: 600;
          color: var(--text-light);
          letter-spacing: 0.05em;
        }

        .sd-map__card-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--white);
          margin-top: 0.1rem;
        }

        .sd-map__pass-fields { margin-bottom: 1.75rem; }

        .sd-map__fields-title {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-light);
          margin: 0 0 0.6rem;
        }

        .sd-map__fields-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .sd-map__pass-chip {
          font-size: 0.72rem;
          font-weight: 500;
          background: color-mix(in srgb, var(--primary) 8%, transparent);
          border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          color: color-mix(in srgb, var(--white) 85%, transparent);
        }

        .sd-map__pass-cta {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--gradient-primary);
          color: var(--white);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.9rem 1.2rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
        }

        .sd-map__pass-cta:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 10px 25px color-mix(in srgb, var(--accent-green) 25%, transparent);
        }

        @media (max-width: 1024px) {
          .sd-map__body {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0 1.5rem;
          }
          .sd-map__canvas { min-height: 420px; }
          .sd-map__side { min-height: auto; }
        }
      `}</style>
    </section>
  );
};

export default WorldMap;
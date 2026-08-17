// src/components/study-destination/WorldMap.jsx
// Requires: npm install d3-geo topojson-client framer-motion lucide-react
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
  Search,
  X,
} from "lucide-react";
import { destinations, origin } from "../../Data/countryDetails";

// 50m resolution — needed at this zoom level so small countries
// (Malta, Cyprus, Baltics, Balkans) don't render blocky/jagged.
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

// Canvas is FIXED (not auto-expanding) so that India's shape gets
// naturally cropped to a corner sliver by the viewBox instead of
// being pulled fully into view. Nudge these two constants together
// with EUROPE_FIT_WIDTH_FRACTION below if India shows too much / too
// little in your browser — see the notes near their declarations.
// Bigger canvas = more pixels dedicated to Europe = each country
// renders larger with clearer, more visibly-spaced borders.
const CANVAS_WIDTH = 1320;
const CANVAS_HEIGHT = 860;

// Portion of CANVAS_WIDTH used to calibrate the projection's scale.
// The projection is fit to EUROPE ONLY inside this sub-rect — India's
// position is then wherever it naturally falls afterward, not the
// other way round. Lower this to zoom Europe in further (pushes more
// of India off-canvas); raise it to zoom Europe out (reveals more of
// India in the corner).
const EUROPE_FIT_WIDTH_FRACTION = 0.78;
const MAP_PADDING = 40;

const FLIGHT_DURATION = 1700; // ms, plane flight-in
const ZOOM_SCALE = 1.42; // how far the map pans/zooms toward a selected country

// Region grouping — the pill list below reads like a real departure
// board: grouped by geography so ~49 destinations stay scannable.
const REGION_ORDER = [
  "British Isles",
  "Western Europe",
  "Nordic",
  "Baltic States",
  "Southern Europe",
  "Central & Eastern Europe",
  "Balkans",
  "Caucasus & Turkey",
  "Micro-states",
];

const REGION_MAP = {
  unitedkingdom: "British Isles",
  ireland: "British Isles",

  france: "Western Europe",
  germany: "Western Europe",
  netherlands: "Western Europe",
  belgium: "Western Europe",
  luxembourg: "Western Europe",
  austria: "Western Europe",
  switzerland: "Western Europe",

  denmark: "Nordic",
  sweden: "Nordic",
  norway: "Nordic",
  finland: "Nordic",
  iceland: "Nordic",

  estonia: "Baltic States",
  latvia: "Baltic States",
  lithuania: "Baltic States",

  spain: "Southern Europe",
  portugal: "Southern Europe",
  italy: "Southern Europe",
  greece: "Southern Europe",
  malta: "Southern Europe",
  cyprus: "Southern Europe",

  poland: "Central & Eastern Europe",
  czechia: "Central & Eastern Europe",
  slovakia: "Central & Eastern Europe",
  hungary: "Central & Eastern Europe",
  romania: "Central & Eastern Europe",
  bulgaria: "Central & Eastern Europe",
  ukraine: "Central & Eastern Europe",
  belarus: "Central & Eastern Europe",
  moldova: "Central & Eastern Europe",
  russia: "Central & Eastern Europe",

  croatia: "Balkans",
  slovenia: "Balkans",
  serbia: "Balkans",
  bosniaandherzegovina: "Balkans",
  montenegro: "Balkans",
  northmacedonia: "Balkans",
  albania: "Balkans",

  georgia: "Caucasus & Turkey",
  armenia: "Caucasus & Turkey",
  azerbaijan: "Caucasus & Turkey",
  turkey: "Caucasus & Turkey",

  andorra: "Micro-states",
  liechtenstein: "Micro-states",
  monaco: "Micro-states",
  sanmarino: "Micro-states",
  vaticancity: "Micro-states",
};

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ---- Straight-line flight helpers (lon/lat space) ----
// The plane lerps directly between origin and destination coordinates,
// with a small sine bump on latitude so the flight still reads as an
// "arc" rather than a die-straight line.

const lerp = (a, b, t) => a + (b - a) * t;

const bearing = (from, to) => {
  const dLon = to.lon - from.lon;
  const dLat = to.lat - from.lat;
  return (Math.atan2(dLat, dLon) * 180) / Math.PI;
};

const WorldMap = () => {
  const [countries, setCountries] = useState([]);
  const [projection, setProjection] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [hoveredDest, setHoveredDest] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [flying, setFlying] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [planePos, setPlanePos] = useState(origin.coords);
  const [planeAngle, setPlaneAngle] = useState(0);
  const [query, setQuery] = useState("");
  const rafRef = useRef(null);

  const selected = destinations.find((d) => d.id === selectedId) || null;

  useEffect(() => {
    let cancelled = false;
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topology) => {
        if (cancelled) return;
        const geo = feature(topology, topology.objects.countries);

        // Calibrate scale + translate against EUROPE ONLY, so Europe
        // fills most of the frame at a real "zoomed in" level. India's
        // position is derived afterward using this same scale/translate
        // and is left to fall wherever it naturally does — the fixed
        // canvas size then crops it down to a corner sliver.
        const destNames = new Set(destinations.map((d) => d.geoName));
        const europeFeatures = geo.features.filter((f) =>
          destNames.has(f.properties.name)
        );

        const proj = geoEqualEarth();
        const europeFitWidth = CANVAS_WIDTH * EUROPE_FIT_WIDTH_FRACTION;
        proj.fitExtent(
          [
            [MAP_PADDING, MAP_PADDING],
            [europeFitWidth - MAP_PADDING, CANVAS_HEIGHT - MAP_PADDING],
          ],
          { type: "FeatureCollection", features: europeFeatures }
        );

        setCountries(geo.features);
        setProjection(() => proj);
      })
      .catch(() => !cancelled && setLoadError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const pathGenerator = useMemo(
    () => (projection ? geoPath(projection) : null),
    [projection]
  );

  const originXY = useMemo(
    () => (projection ? projection([origin.coords.lon, origin.coords.lat]) : null),
    [projection]
  );

  const destXY = useMemo(() => {
    if (!projection) return {};
    return Object.fromEntries(
      destinations.map((d) => [d.id, projection([d.coords.lon, d.coords.lat])])
    );
  }, [projection]);

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

  const planeXY = useMemo(
    () => (projection ? projection([planePos.lon, planePos.lat]) : null),
    [projection, planePos]
  );

  // Smoothly pan + zoom the whole map group toward the selected country.
  const panZoom = useMemo(() => {
    if (!selected || !destXY[selected.id]) return { x: 0, y: 0, scale: 1 };
    const [dx, dy] = destXY[selected.id];
    const targetX = CANVAS_WIDTH * 0.46;
    const targetY = CANVAS_HEIGHT * 0.48;
    return {
      x: targetX - dx * ZOOM_SCALE,
      y: targetY - dy * ZOOM_SCALE,
      scale: ZOOM_SCALE,
    };
  }, [selected, destXY]);

  const activeLabelText = useMemo(() => {
    if (hoveredDest) return `${hoveredDest.flag} ${hoveredDest.name}`;
    if (selected) return `${selected.flag} ${selected.name}`;
    return null;
  }, [hoveredDest, selected]);

  // Group + filter destinations into the departure directory
  const groupedDestinations = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = destinations.filter((d) => {
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        (REGION_MAP[d.id] || "").toLowerCase().includes(q)
      );
    });

    const buckets = {};
    filtered.forEach((d) => {
      const region = REGION_MAP[d.id] || "Other";
      if (!buckets[region]) buckets[region] = [];
      buckets[region].push(d);
    });

    return REGION_ORDER.map((region) => ({ region, items: buckets[region] || [] })).filter(
      (g) => g.items.length > 0
    );
  }, [query]);

  const resultCount = useMemo(
    () => groupedDestinations.reduce((sum, g) => sum + g.items.length, 0),
    [groupedDestinations]
  );

  const mapReady = projection && pathGenerator && countries.length > 0;
  const courses = selected ? selected.popularCourses || selected.topFields || [] : [];

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

      <div className="sd-map__body">
        {/* ============ LEFT: COUNTRY LIST ============ */}
        <div className="sd-map__directory">
          <div className="sd-map__directory-search">
            <Search size={16} className="sd-map__directory-search-icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a country…"
              aria-label="Search destinations"
            />
            {query && (
              <button
                type="button"
                className="sd-map__directory-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="sd-map__directory-list">
            {groupedDestinations.length === 0 && (
              <div className="sd-map__directory-empty">
                No countries match "{query}".
              </div>
            )}

            {groupedDestinations.map((group) => (
              <div key={group.region} className="sd-map__directory-group">
                <div className="sd-map__directory-region">{group.region}</div>
                <div className="sd-map__directory-pills">
                  {group.items.map((d) => {
                    const isActive = selectedId === d.id;
                    return (
                      <motion.button
                        key={d.id}
                        className={`sd-map__pill ${isActive ? "is-active" : ""}`}
                        onClick={() => handleSelect(d)}
                        disabled={flying}
                        onMouseEnter={() => setHoveredDest(d)}
                        onMouseLeave={() => setHoveredDest(null)}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className="sd-map__pill-flag">{d.flag}</span>
                        <span className="sd-map__pill-name">{d.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ CENTER: MAP CANVAS ============ */}
        <div className="sd-map__canvas">
          <div className="sd-map__hud">
            <span className="sd-map__hud-dot"></span>
            <span className="sd-map__hud-text">
              {activeLabelText ? (
                <>ROUTE: <strong style={{ color: "var(--accent-blue)" }}>{activeLabelText.toUpperCase()}</strong></>
              ) : (
                "SELECT A DESTINATION"
              )}
            </span>
          </div>

          {loadError && (
            <div className="sd-map__error">
              Couldn't load the map data. Check your connection and refresh.
            </div>
          )}

          {!loadError && !mapReady && (
            <div className="sd-map__loading-state">Calibrating map…</div>
          )}

          {mapReady && (
            <svg
              className="sd-map__svg"
              viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
              role="img"
              aria-label="Map of Europe showing a flight route from India"
            >
              <defs>
                <radialGradient id="sdOceanGlow" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="var(--primary-dark)" stopOpacity="0.02" />
                </radialGradient>
                <radialGradient id="sdMarkerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect x="0" y="0" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="url(#sdOceanGlow)" />

              <motion.g
                animate={panZoom}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Country fills — Europe destinations get a soft tint,
                    India a faint origin tint, everything else stays dim
                    ("faded" Asia / Africa / no Americas is achieved purely
                    by the tight crop, not per-continent logic). */}
                {countries.map((geo) => {
                  const name = geo.properties.name;
                  const isOrigin = name === origin.geoName;
                  const matchDest = destinations.find((d) => d.geoName === name);
                  const isSelected = selected && name === selected.geoName;

                  let fill = "color-mix(in srgb, var(--white) 7%, transparent)";
                  if (isSelected) fill = "color-mix(in srgb, var(--primary) 60%, transparent)";
                  else if (isOrigin) fill = "color-mix(in srgb, var(--accent-blue) 24%, transparent)";
                  else if (matchDest) fill = "color-mix(in srgb, var(--white) 26%, transparent)";

                  return (
                    <path
                      key={geo.id ?? name}
                      d={pathGenerator(geo)}
                      fill={fill}
                      stroke="color-mix(in srgb, var(--white) 22%, transparent)"
                      strokeWidth={0.9}
                      className={matchDest ? "sd-map__country is-clickable" : "sd-map__country"}
                      onMouseEnter={() => matchDest && setHoveredDest(matchDest)}
                      onMouseLeave={() => setHoveredDest(null)}
                      onClick={() => {
                        if (matchDest) handleSelect(matchDest);
                      }}
                    />
                  );
                })}

                {/* Flight route: a simple dashed line from India to the
                    selected destination — the plane flies straight along it. */}
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

                {/* India — always-on glowing origin marker */}
                {originXY && (
                  <g>
                    <circle cx={originXY[0]} cy={originXY[1]} r={22} fill="url(#sdMarkerGlow)" />
                    <circle cx={originXY[0]} cy={originXY[1]} r={5} fill="var(--accent-blue)" stroke="var(--white)" strokeWidth={1.5} />
                    <circle cx={originXY[0]} cy={originXY[1]} r={12} fill="none" stroke="var(--accent-blue)" strokeWidth={1} className="sd-map__pulse" />
                    <text x={originXY[0]} y={originXY[1] - 14} textAnchor="middle" className="sd-map__origin-text">
                      INDIA
                    </text>
                  </g>
                )}

                {/* Plane — visible while flying and once it has arrived */}
                {(flying || arrived) && planeXY && (
                  <g transform={`translate(${planeXY[0]}, ${planeXY[1]}) rotate(${planeAngle})`}>
                    <foreignObject x={-11} y={-11} width={22} height={22}>
                      <div style={{ color: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", filter: "drop-shadow(0 0 4px var(--secondary))" }}>
                        <Plane size={20} fill="var(--secondary)" strokeWidth={1.5} />
                      </div>
                    </foreignObject>
                  </g>
                )}

                {/* Selected destination — single glowing marker with pulse */}
                {arrived && selected && destXY[selected.id] && (
                  <g>
                    <circle cx={destXY[selected.id][0]} cy={destXY[selected.id][1]} r={22} fill="url(#sdMarkerGlow)" />
                    <motion.circle
                      cx={destXY[selected.id][0]}
                      cy={destXY[selected.id][1]}
                      r={5.5}
                      fill="var(--secondary)"
                      stroke="var(--white)"
                      strokeWidth={1.5}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                    />
                    <circle cx={destXY[selected.id][0]} cy={destXY[selected.id][1]} r={12} fill="none" stroke="var(--secondary)" strokeWidth={1} className="sd-map__pulse" />
                  </g>
                )}
              </motion.g>
            </svg>
          )}
        </div>

        {/* ============ RIGHT: COUNTRY INFO CARD (old boarding-pass design) ============ */}
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
                <p>Click any active country or quick-pick from the list to explore costs, timeline durations, and updated visa parameters.</p>
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
                    <p className="sd-map__pass-tagline">
                      {selected.tagline || selected.description}
                    </p>
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
                      <span className="sd-map__card-value">{selected.avgCost || selected.tuitionFee}</span>
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
                    {courses.map((f) => (
                      <span key={f} className="sd-map__pass-chip">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

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
            radial-gradient(120% 90% at 15% 0%, color-mix(in srgb, var(--primary) 24%, transparent) 0%, transparent 55%),
            radial-gradient(110% 80% at 100% 100%, color-mix(in srgb, var(--accent-blue) 14%, transparent) 0%, transparent 50%),
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
          background: color-mix(in srgb, var(--accent-blue) 20%, transparent);
        }

        .sd-map__glow--two {
          bottom: -12%;
          left: -6%;
          width: 380px;
          height: 380px;
          background: color-mix(in srgb, var(--primary) 22%, transparent);
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

        /* ===== BODY: 3-column grid — list | canvas | card ===== */
        .sd-map__body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: grid;
          grid-template-columns: 270px 1fr 330px;
          gap: 1.5rem;
          max-width: 1680px;
          width: 100%;
          margin: 0 auto;
          padding: 0 2rem;
          align-items: stretch;
        }

        /* ===== COUNTRY LIST (glassmorphism panel) ===== */
        .sd-map__directory {
          display: flex;
          flex-direction: column;
          min-height: 640px;
          max-height: 640px;
          border-radius: var(--radius-lg, 22px);
          border: 1px solid var(--border-dark);
          background: color-mix(in srgb, var(--bg-dark) 72%, transparent);
          backdrop-filter: blur(22px);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        .sd-map__directory-search {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1.1rem 1.2rem;
          border-bottom: 1px solid var(--border-dark);
          flex-shrink: 0;
        }

        .sd-map__directory-search-icon { color: var(--text-light); flex-shrink: 0; }

        .sd-map__directory-search input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--white);
          font-family: var(--font-main);
          font-size: 0.88rem;
        }

        .sd-map__directory-search input::placeholder { color: var(--text-light); }

        .sd-map__directory-clear {
          background: color-mix(in srgb, var(--white) 8%, transparent);
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          cursor: pointer;
          flex-shrink: 0;
        }

        .sd-map__directory-clear:hover { color: var(--white); background: color-mix(in srgb, var(--white) 16%, transparent); }

        .sd-map__directory-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.9rem 0.9rem 1.1rem;
        }

        .sd-map__directory-list::-webkit-scrollbar { width: 6px; }
        .sd-map__directory-list::-webkit-scrollbar-track { background: transparent; }
        .sd-map__directory-list::-webkit-scrollbar-thumb {
          background: color-mix(in srgb, var(--white) 15%, transparent);
          border-radius: 10px;
        }
        .sd-map__directory-list::-webkit-scrollbar-thumb:hover {
          background: color-mix(in srgb, var(--white) 25%, transparent);
        }

        .sd-map__directory-empty {
          padding: 2rem 1rem;
          text-align: center;
          color: var(--text-light);
          font-size: 0.85rem;
        }

        .sd-map__directory-group { margin-bottom: 0.9rem; }

        .sd-map__directory-region {
          padding: 0.3rem 0.4rem 0.55rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-blue);
        }

        .sd-map__directory-pills {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .sd-map__pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
          background: color-mix(in srgb, var(--white) 4%, transparent);
          border: 1px solid transparent;
          border-radius: 999px;
          padding: 0.55rem 0.9rem;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .sd-map__pill:hover {
          background: color-mix(in srgb, var(--white) 9%, transparent);
          border-color: color-mix(in srgb, var(--accent-blue) 30%, transparent);
        }

        .sd-map__pill.is-active {
          background: color-mix(in srgb, var(--primary) 45%, transparent);
          border-color: var(--primary);
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary) 60%, transparent),
                      0 0 22px color-mix(in srgb, var(--primary) 55%, transparent);
        }

        .sd-map__pill:disabled { opacity: 0.5; cursor: not-allowed; }

        .sd-map__pill-flag { font-size: 1.05rem; line-height: 1; }

        .sd-map__pill-name {
          font-size: 0.85rem;
          font-weight: 500;
          color: color-mix(in srgb, var(--white) 88%, transparent);
        }

        .sd-map__pill.is-active .sd-map__pill-name { color: var(--white); font-weight: 600; }

        /* ===== MAP CANVAS ===== */
        .sd-map__canvas {
          position: relative;
          min-height: 640px;
          border-radius: var(--radius-lg, 22px);
          overflow: hidden;
          background: color-mix(in srgb, var(--bg-dark) 84%, var(--white) 2%);
          border: 1px solid var(--border-dark);
          box-shadow: inset 0 0 44px color-mix(in srgb, var(--black) 42%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sd-map__svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .sd-map__loading-state {
          color: var(--text-light);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.03em;
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
          max-width: calc(100% - 2.5rem);
        }

        .sd-map__hud-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-blue);
          box-shadow: 0 0 8px var(--accent-blue);
          flex-shrink: 0;
        }

        .sd-map__hud-text {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--text-light);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sd-map__country {
          transition: fill 0.3s ease, opacity 0.3s;
          outline: none;
        }

        .sd-map__country.is-clickable { cursor: pointer; }
        .sd-map__country.is-clickable:hover {
          fill: color-mix(in srgb, var(--primary) 45%, transparent) !important;
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
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          fill: var(--accent-blue);
          pointer-events: none;
        }

        /* ===== INFO CARD (boarding-pass design, glassmorphism) ===== */
        .sd-map__side {
          position: relative;
          min-height: 640px;
          border-radius: var(--radius-lg, 22px);
          border: 1px solid var(--border-dark);
          background: color-mix(in srgb, var(--bg-dark) 68%, transparent);
          backdrop-filter: blur(24px);
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
          background: color-mix(in srgb, var(--primary) 14%, transparent);
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
          overflow-y: auto;
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
          margin: 0 0 0.3rem;
          color: var(--white);
        }

        .sd-map__pass-tagline {
          color: var(--text-light);
          font-size: 0.85rem;
          line-height: 1.55;
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

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1280px) {
          .sd-map__body {
            grid-template-columns: 250px 1fr;
            grid-template-areas:
              "directory canvas"
              "directory side";
          }
          .sd-map__directory { grid-area: directory; }
          .sd-map__canvas { grid-area: canvas; }
          .sd-map__side { grid-area: side; min-height: auto; }
        }

        @media (max-width: 1024px) {
          .sd-map__body {
            grid-template-columns: 1fr;
            grid-template-areas:
              "directory"
              "canvas"
              "side";
            gap: 1.25rem;
            padding: 0 1.5rem;
          }
          .sd-map__directory { max-height: 320px; min-height: 260px; }
          .sd-map__canvas { min-height: 420px; }
          .sd-map__side { min-height: auto; }
        }

        @media (max-width: 560px) {
          .sd-map__body { padding: 0 1.1rem; }
          .sd-map__directory { max-height: 280px; }
        }
      `}</style>
    </section>
  );
};

export default WorldMap;
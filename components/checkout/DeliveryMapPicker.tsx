"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Crosshair, Loader2, MapPin, Search, X } from "lucide-react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import "leaflet/dist/leaflet.css";

// Leaflet's default marker icon references relative image paths that break
// under a bundler. Importing the PNGs as modules is bundler-dependent (the
// import resolves to an object with `.src` under webpack, but not under
// Turbopack, which `next dev` uses by default while `next build` forces
// webpack — so a module import works in one and silently breaks in the
// other). Referencing copies in /public instead sidesteps that entirely:
// plain string URLs behave identically under both bundlers.
const markerIconInstance = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Keeps the map (and search results) within the UAE — padded a little
// beyond the literal border so RAK/Fujairah/Al Ain edge towns aren't
// awkwardly clipped. maxBoundsViscosity locks panning at the edge instead
// of allowing a rubber-band drag past it.
const UAE_BOUNDS: L.LatLngBoundsExpression = [
  [22.4, 51.4],
  [26.6, 56.6],
];
const UAE_MIN_ZOOM = 7;
const ZOOM_WHEN_PICKED = 15;

interface LatLng {
  lat: number;
  lng: number;
}

interface SearchResult {
  lat: number;
  lng: number;
  label: string;
}

function ClickToPlace({ onPick }: { onPick: (coords: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function DeliveryMapPicker({
  value,
  defaultCenter,
  onChange,
}: {
  value: LatLng | null;
  defaultCenter: LatLng;
  onChange: (coords: LatLng) => void;
}) {
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 450);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const center = value ?? defaultCenter;
  // Derived rather than cleared imperatively in the search effect — a query
  // shortened back below 3 characters just hides the (now stale) results
  // instead of needing a synchronous setState inside the effect body.
  const visibleResults = debouncedQuery.trim().length >= 3 ? results : [];

  // Recenters on every pin change (click, drag, search, or "use my
  // location"), but only zooms IN if the current view is too wide to
  // actually see the pin clearly — a drag at an already-close zoom just
  // recenters without a jarring zoom jump.
  useEffect(() => {
    if (value && mapRef.current) {
      const targetZoom = Math.max(mapRef.current.getZoom(), ZOOM_WHEN_PICKED);
      mapRef.current.setView([value.lat, value.lng], targetZoom);
    }
  }, [value]);

  useEffect(() => {
    const term = debouncedQuery.trim();
    if (term.length < 3) {
      return;
    }
    let active = true;
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ae&limit=5&q=${encodeURIComponent(term)}`
    )
      .then((res) => res.json())
      .then((data: Array<{ lat: string; lon: string; display_name: string }>) => {
        if (!active) return;
        setResults(
          data.map((d) => ({ lat: Number(d.lat), lng: Number(d.lon), label: d.display_name }))
        );
      })
      .catch(() => {
        if (active) setResults([]);
      });
    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  function handleSelectResult(result: SearchResult) {
    onChange({ lat: result.lat, lng: result.lng });
    setQuery(result.label);
    setShowResults(false);
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setGeoError("Your browser doesn't support location sharing.");
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange({ lat: position.coords.latitude, lng: position.coords.longitude });
        setQuery("");
        setLocating(false);
      },
      () => {
        setGeoError("Couldn't get your location. Try searching your area or drop the pin manually.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div ref={searchContainerRef} className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder="Search your area or address in the UAE..."
          className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm text-ocean-950 placeholder:text-gray-400 focus:border-aqua-400 focus:bg-white focus:outline-none"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {showResults && visibleResults.length > 0 && (
          <ul className="absolute z-[1000] mt-2 max-h-56 w-full overflow-y-auto rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl">
            {visibleResults.map((result, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => handleSelectResult(result)}
                  className="flex w-full items-start gap-2 rounded-xl p-2.5 text-left text-sm hover:bg-ocean-50"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-600" />
                  <span className="text-gray-700">{result.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative h-64 overflow-hidden rounded-2xl border border-gray-200">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={value ? ZOOM_WHEN_PICKED : 9}
          minZoom={UAE_MIN_ZOOM}
          maxBounds={UAE_BOUNDS}
          maxBoundsViscosity={1.0}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickToPlace
            onPick={(coords) => {
              onChange(coords);
              setQuery("");
              setShowResults(false);
            }}
          />
          {value && (
            <Marker
              position={[value.lat, value.lng]}
              icon={markerIconInstance}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const marker = e.target as L.Marker;
                  const pos = marker.getLatLng();
                  onChange({ lat: pos.lat, lng: pos.lng });
                  setQuery("");
                },
              }}
            />
          )}
        </MapContainer>
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={locating}
          className="absolute bottom-3 right-3 z-[1000] flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-ocean-900 shadow-lg transition-colors hover:bg-gray-50 disabled:opacity-60"
        >
          {locating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Crosshair className="h-3.5 w-3.5" />
          )}
          {locating ? "Locating..." : "Use my current location"}
        </button>
      </div>
      {geoError && <p className="text-xs text-red-600">{geoError}</p>}
      <p className="text-xs text-gray-400">
        {value
          ? "Pin set — drag it to adjust, tap the map, or search again to move it."
          : "Search your area above, tap the map to drop a pin, or use the button above."}
      </p>
    </div>
  );
}

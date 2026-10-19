"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Crosshair } from "lucide-react";
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

interface LatLng {
  lat: number;
  lng: number;
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

  const center = value ?? defaultCenter;

  // Recenter the map whenever the pin moves via "use my location" (dragging
  // the marker directly doesn't need this — the map stays put on purpose).
  useEffect(() => {
    if (value && mapRef.current) {
      mapRef.current.setView([value.lat, value.lng], mapRef.current.getZoom());
    }
  }, [value]);

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
        setLocating(false);
      },
      () => {
        setGeoError("Couldn't get your location. You can still drop the pin manually below.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-56 overflow-hidden rounded-2xl border border-gray-200">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={value ? 14 : 11}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickToPlace onPick={onChange} />
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
          <Crosshair className="h-3.5 w-3.5" />
          {locating ? "Locating..." : "Use my current location"}
        </button>
      </div>
      {geoError && <p className="text-xs text-red-600">{geoError}</p>}
      <p className="text-xs text-gray-400">
        {value
          ? "Pin set — drag it to adjust, or tap the map to move it."
          : "Tap the map to drop a pin at your delivery address, or use the button above."}
      </p>
    </div>
  );
}

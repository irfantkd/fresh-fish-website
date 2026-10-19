// Simplified UAE national boundary, [lat, lng] pairs (Leaflet's own LatLng
// order, not GeoJSON's [lng, lat]). Sourced from johan/world.geo.json
// (ARE.geo.json), a public-domain simplified country-boundary dataset —
// intentionally low-detail (22 points): this is only used to visually mask
// the checkout delivery map, not to enforce an exact legal border, so a
// clean, fast-rendering outline is preferable to a highly detailed one.
export const UAE_BOUNDARY: [number, number][] = [
  [24.245497, 51.579519],
  [24.294073, 51.757441],
  [24.019826, 51.794389],
  [24.177439, 52.577081],
  [24.151317, 53.404007],
  [24.121758, 54.008001],
  [24.797892, 54.693024],
  [25.439145, 55.439025],
  [26.055464, 56.070821],
  [25.714606, 56.261042],
  [24.924732, 56.396847],
  [24.920831, 55.886233],
  [24.269604, 55.804119],
  [24.130543, 55.981214],
  [23.933604, 55.528632],
  [23.524869, 55.525841],
  [23.110993, 55.234489],
  [22.70833, 55.208341],
  [22.496948, 55.006803],
  [23.001154, 52.000733],
  [24.014219, 51.617708],
  [24.245497, 51.579519],
];

// A generous rectangle well beyond the UAE's own extent — used as the
// outer ring of the mask polygon (see DeliveryMapPicker). Leaflet's default
// SVG fill-rule is "evenodd", so nesting UAE_BOUNDARY inside this rectangle
// automatically punches a transparent "hole" over the UAE, regardless of
// either ring's winding direction.
export const MASK_OUTER_RING: [number, number][] = [
  [-10, 20],
  [-10, 90],
  [40, 90],
  [40, 20],
];

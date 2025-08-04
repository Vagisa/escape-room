import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  coords?: [number, number],
  zoom = 13,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  const TILE_LAYER_URL_PATTERN =
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  const TILE_LAYER_ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  useEffect(() => {
    if (!coords || mapRef.current === null || isRenderedRef.current) {
      return;
    }

    const instance = new Map(mapRef.current, {
      center: {
        lat: coords[0],
        lng: coords[1],
      },
      zoom,
    });

    const layer = new TileLayer(TILE_LAYER_URL_PATTERN, {
      attribution: TILE_LAYER_ATTRIBUTION,
    });

    instance.addLayer(layer);
    setMap(instance);
    isRenderedRef.current = true;
  }, [mapRef, coords, zoom]);

  return map;
}

export default useMap;

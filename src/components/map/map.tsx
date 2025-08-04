import { useEffect, useRef } from 'react';
import { layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultCustomIcon, currentCustomIcon, offerMapStyle } from './const';
import useMap from './use-map';
import { BookingInfoType } from '../../types/booking';

type MapProps = {
  places: BookingInfoType[];
  selectedPlace: BookingInfoType | null;
  onPlaceClick: (place: BookingInfoType) => void;
};

function Map({ selectedPlace, places, onPlaceClick }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, selectedPlace?.location.coords);

  useEffect(() => {
    if (map && selectedPlace) {
      const [lat, lng] = selectedPlace.location.coords;
      map.setView([lat, lng], 13);
    }
  }, [map, selectedPlace]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markersLayer = layerGroup().addTo(map);

    places.forEach((place) => {
      const [lat, lng] = place.location.coords;
      const marker = new Marker([lat, lng]);
      marker.setIcon(
        selectedPlace && place.id === selectedPlace.id
          ? currentCustomIcon
          : defaultCustomIcon
      )
        .addTo(markersLayer)
        .on('click', () => {
          onPlaceClick(place);
        });
    });

    return () => {
      map.removeLayer(markersLayer);
    };
  }, [map, places, selectedPlace, onPlaceClick]);

  return (
    <div className="map">
      <div className="map__container" ref={mapRef} style={offerMapStyle}>
      </div>
    </div>
  );
}

export default Map;



import React, { useEffect, useRef } from 'react';

const RADIUS = 10 * 1609.34; // 50 miles to meters

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMap = useRef<google.maps.Map>();
  const userMarker = useRef<google.maps.Marker>();
  const userCircle = useRef<google.maps.Circle>();

  useEffect(() => {
    if (mapRef.current) {
      googleMap.current = new google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 12,
      });

      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (googleMap.current) {
          googleMap.current.setCenter(location);
          userMarker.current = new google.maps.Marker({
            position: location,
            map: googleMap.current,
          });

          userCircle.current = new google.maps.Circle({
            center: location,
            radius: RADIUS,
            map: googleMap.current,
            fillColor: '#AAD4F5',
            fillOpacity: 0.6,
            strokeWeight: 1,
            clickable: false,
          });
        }
      });
    }
  }, []);

  return <div ref={mapRef} style={{ width: '50%', height: '500px' }} />;
};

export default MapComponent;

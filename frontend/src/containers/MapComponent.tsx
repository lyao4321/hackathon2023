

import React, { useEffect, useRef } from 'react';

const RADIUS = 10 * 1609.34; // 50 miles to meters



const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const googleMap = useRef<google.maps.Map>();
  const userMarker = useRef<google.maps.Marker>();
  const userCircle = useRef<google.maps.Circle>();
  const geocoder = useRef(new google.maps.Geocoder());

  function geocodeAddress(address: string, callback: (results: google.maps.GeocoderResult[]) => void) {
    geocoder.current.geocode({ 'address': address }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK && results) {
        callback(results);
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  }  

  useEffect(() => {
    if (mapRef.current) {
      googleMap.current = new google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 11,
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

          geocodeAddress('247 Cayuga Rd Suite 50, Buffalo, NY 14225', (results) => {
            new google.maps.Marker({
              position: results[0].geometry.location,
              map: googleMap.current,
            });
          });

          geocodeAddress('3711 Villas Drive West, Buffalo, NY 14228', (results) => {
            new google.maps.Marker({
              position: results[0].geometry.location,
              map: googleMap.current,
            });
          });

          geocodeAddress('403 Main St Ste. 200, Buffalo, NY 14203', (results) => {
            new google.maps.Marker({
              position: results[0].geometry.location,
              map: googleMap.current,
            });
          });
        

          userCircle.current = new google.maps.Circle({
            center: location,
            radius: RADIUS,
            map: googleMap.current,
            fillColor: '#AAD4F5',
            fillOpacity: 0.1,
            strokeWeight: 1,
            clickable: false,
          });
        }
      });
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default MapComponent;

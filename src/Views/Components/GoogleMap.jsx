import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { emit } from '../../services/mediator';

const defaultPosition = {
  lat: 54.3478088,
  lng: 18.6598646,
};
const defaultZoom = 11;

const GoogleMap = () => {
  useEffect(() => {
    emit('mapLoaded', defaultPosition);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={defaultPosition}
        defaultZoom={defaultZoom}
        onChange={event => emit('mapDragged', event.center)}
      />
    </div>
  );
};

export default GoogleMap;

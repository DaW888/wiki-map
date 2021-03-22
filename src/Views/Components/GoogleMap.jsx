import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { emit } from '../../services/mediator';
import Marker from '../../Style/Marker';
import { useMapStore } from '../../store/store';
import { Tooltip } from 'antd';

const defaultPosition = {
  lat: 54.3478088,
  lng: 18.6598646,
};
const defaultZoom = 16;

const GoogleMap = () => {
  const [{ markers }] = useMapStore();
  console.log(markers);

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
      >
        {markers.map(({ lat, lng, pageid, title }) => (
          <Tooltip key={pageid} title={title} lat={lat} lng={lng}>
            <Marker />
          </Tooltip>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;

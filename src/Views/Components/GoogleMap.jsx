import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import wikiApi from '../../services/api/wiki';

const defaultPosition = {
  lat: 54.3478088,
  lng: 18.6598646,
};
const defaultZoom = 11;

const GoogleMap = () => {
  useEffect(() => {
    (async () => {
      const articles = await wikiApi.getArticles({ coord: defaultPosition });
      console.log(articles);
    })();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={defaultPosition}
        defaultZoom={defaultZoom}
      />
    </div>
  );
};

export default GoogleMap;

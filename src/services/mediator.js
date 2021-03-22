import wikiApi from './api/wiki';
import { useMapStore } from '../store/store';

const listeners = {};

export const emit = (event, ...args) => {
  const listener = listeners[event];

  if (listener) {
    listener(...args);
  } else {
    console.log(
      'Map mediator emit no listener found for %s event',
      event,
      ...args
    );
  }
};

const attachListener = (eventName, listener) => {
  listeners[eventName] = listener;
};

const mapWikiArticlestoMarkers = articles => {
  return articles.map(({ lat, lon, pageid, title }) => ({
    title,
    pageid,
    lat,
    lng: lon,
  }));
};

const useMapMediator = () => {
  const [, { addMarkers }] = useMapStore();

  const mapDragged = async center => {
    const res = await wikiApi.getArticles({ coord: center });
    const articles = mapWikiArticlestoMarkers(res.query.geosearch);

    console.log('MapMediator:mapDragged fetched articles:', articles);

    addMarkers(articles);
  };

  const mapLoaded = async center => {
    const articles = await wikiApi.getArticles({ coord: center });
    console.log('MapMediator:mapLoaded fetched articles:', articles);
  };

  attachListener('mapLoaded', mapLoaded);
  attachListener('mapDragged', mapDragged);
};

const MapMediator = () => {
  useMapMediator();
  return null;
};

export default MapMediator;

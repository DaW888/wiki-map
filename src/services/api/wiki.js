import ky from 'ky';

const client = ky.create({
  prefixUrl: 'https://pl.wikipedia.org/w',
  headers: {
    'content-type': 'application/json',
  },
});

const defaultParams = {
  origin: '*',
};

const api = {
  getArticles({ coord, radius = 10000, limit = 100 }) {
    const params = {
      action: 'query',
      list: 'geosearch',
      format: 'json',
      ...defaultParams,
    };

    if (!coord) {
      console.error('Wikipedia Api: no coord passed to getArticles');
    }

    return client
      .get('api.php?', {
        searchParams: {
          ...params,
          gscoord: coord.lat + '|' + coord.lng,
          gsradius: radius,
          gslimit: limit,
        },
      })
      .json();
  },
};

export default api;

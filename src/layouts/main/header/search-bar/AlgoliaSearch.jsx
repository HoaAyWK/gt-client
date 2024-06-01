import React from 'react';
import algoliaSearch from 'algoliasearch/lite';

import Autocomplete from './Autocomplete';

// const APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID;
// const API_KEY = import.meta.env.VITE_ALGOLIA_API_KEY;
// const indexName = import.meta.env.VITE_ALGOLIA_INDEX;

const APP_ID = window._env_.VITE_ALGOLIA_APP_ID;
const API_KEY = window._env_.VITE_ALGOLIA_API_KEY;
const indexName = window._env_.VITE_ALGOLIA_INDEX;


const searchClient = algoliaSearch(APP_ID, API_KEY);

const AlgoliaSearch = () => {

  return (
      <Autocomplete
        searchClient={searchClient}
        indexName={indexName}
        placeholder='Search...'
        openOnFocus
        detachedMediaQuery=''
      />
  );
};

export default AlgoliaSearch;

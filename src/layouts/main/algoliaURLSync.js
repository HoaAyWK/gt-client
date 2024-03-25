import qs from 'qs';

export const DEBOUNCE_TIME = 700;


export const createURL = state => {
  const isDefaultRoute =
    !state.query &&
    state.page === 1 &&
    (state.refinementList && state.refinementList.brand.length === 0) &&
    (state.menu && !state.menu.categories)

  if (isDefaultRoute) {
    return '';
  }

  const queryParameters = {};

  if (state.query) {
    queryParameters.q = encodeURIComponent(state.query);
  }

  if (state.page !== 1) {
    queryParameters.page = state.page;
  }

  if (state.refinementList.brand) {
    queryParameters.brands = state.refinementList.brand.map(encodeURIComponent);
  }

  if (state.refinementList.model) {
    queryParameters.models = state.refinementList.model.map(encodeURIComponent);
  }

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: 'repeat'
  });

  return `/search${queryString}`;
};

export const searchStateToUrl = searchState => searchState ? createURL(searchState) : '';

export const urlToSearchState = location => {
  const { q = '', page = 1, brands = [], models = [] } = qs.parse(location.search.slice(1));

  const allBrands = Array.isArray(brands) ? brands : [brands].filter(Boolean);
  const allModels = Array.isArray(models) ? models : [models].filter(Boolean);

  return {
    query: decodeURIComponent(q),
    page,
    refinementList: {
      brand: allBrands.map(decodeURIComponent),
      model: allModels.map(decodeURIComponent),
    }
  }
};




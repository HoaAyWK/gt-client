import React, { createElement, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useHierarchicalMenu, useSearchBox } from 'react-instantsearch-hooks';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import { createRedirectUrlPlugin } from '@algolia/autocomplete-plugin-redirect-url';
import { debounce } from '@algolia/autocomplete-shared';

import "@algolia/autocomplete-theme-classic";

import SearchedProductItem from './SearchProductItem';

export const INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES = [
  'categories.lvl0',
  'categories.lvl1'
];

// export const INSTANT_SEARCH_QUERY_SUGGESTIONS = import.meta.env.VITE_ALGOLIA_QUERY_SUGGESTION_INDEX;
export const INSTANT_SEARCH_QUERY_SUGGESTIONS = window._env_.VITE_ALGOLIA_QUERY_SUGGESTION_INDEX;

const AutoComplete = ({ searchClient, indexName, className, sx, ...autocompleteProps }) => {
  const autoCompleteContainer = useRef(null);
  const navigate = useNavigate();

  const { query, refine: setQuery } = useSearchBox();

  const [instantSearchUiState, setInstantSearchUiState] = useState({ query });

  const debouncedSetInstantSearchUiState = debounce(
    setInstantSearchUiState,
    1000
  );

  const { items: categories, refine: setCategory } = useHierarchicalMenu({
    attributes: INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES
  });

  const currentCategory = useMemo(() => {
    const category = categories.find(({ isRefined }) => isRefined);

    return category && category.value;
  }, [categories]);

  const plugins = useMemo(() => {
    const redirect = createRedirectUrlPlugin({
      onRedirect(redirects, { event, navigator, state}) {
        const item = redirects.find(({ sourceId }) => sourceId === 'querySuggestionsInCategoryPlugin'
          || sourceId === 'querySuggestionsPlugin');

        navigator.navigate({ itemUrl: '/search' , item, state });
      }
    });

    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: 'instantsearch',
      limit: 5,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            if (item && item.label) {
              navigate(`/search?q=${item.label}`);
            }

            return;
          }
        }
      }
    });

    // const querySuggestionsInCategory = createQuerySuggestionsPlugin({
    //   searchClient,
    //   indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
    //   getSearchParams() {
    //     return recentSearches.data.getAlgoliaSearchParams({
    //       hitsPerPage: 3,
    //       facetFilters: [
    //         `${indexName}.facets.exact_matches.${INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]}.value:${currentCategory}`
    //       ]
    //     });
    //   },
    //   transformSource({ source }) {
    //     return {
    //       ...source,
    //       sourceId: 'querySuggestionsInCategoryPlugin',
    //       onSelect({ item }) {
    //         setInstantSearchUiState({
    //           query: item.query,
    //           category: item.__autocomplete_qsCategory
    //         });
    //       },
    //       getItems(params) {
    //         if (!params.state.query) {
    //           return [];
    //         }

    //         return source.getItems(params);
    //       },
    //       templates: {
    //         ...source.templates,
    //         header({ items }) {
    //           if (items.length === 0) {
    //             return <Fragment />
    //           }

    //           return (
    //             <Fragment>
    //               <span className='aa-SourceHeaderTitle'>
    //                 In {currentCategory}
    //               </span>
    //               <span className='aa-SourceHeaderTitle' />
    //             </Fragment>
    //           )
    //         }
    //       }
    //     }
    //   }
    // });

    const querySuggestions = createQuerySuggestionsPlugin({
      searchClient,
      indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
      getSearchParams() {
        if (!currentCategory) {
          return recentSearches.data.getAlgoliaSearchParams({
            hitsPerPage: 6
          });
        }

        return recentSearches.data.getAlgoliaSearchParams({
          hitsPerPage: 3,
          facetFilters: [
            `${indexName}.facets.exact_matches.${INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]}.value:-${currentCategory}`
          ]
        });
      },
      categoryAttribute: [
        indexName,
        'facets',
        'exact_matches',
        'categories',
        INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]
      ],
      transformSource({ source }) {
        return {
          ...source,
          sourceId: 'querySuggestionsPlugin',
          onSelect({ item }) {
            setInstantSearchUiState({ query: item.query, category: item.__autocomplete_qsCategory || '' });
          },
          getItems(params) {
            if (!params.state.query) {
              return [];
            }

            return source.getItems(params);
          },
          templates: {
            ...source.templates,
            header({ items }) {
              if (!currentCategory || items.length === 0) {
                return <Fragment />;
              }

              return (
                <Fragment>
                  <span className='aa-SourceHeaderTitle'>In other categories</span>
                  <span className='aa-SourceHeaderTitle' />
                </Fragment>
              )
            }
          }
        }
      }
    });

    return [recentSearches, querySuggestions, redirect];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    instantSearchUiState.category && setCategory(instantSearchUiState.category);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instantSearchUiState]);

  useEffect(() => {
    if (!autoCompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autoCompleteContainer.current,
      initialState: { query },
      onReset() {
        setInstantSearchUiState({ query: "", category: currentCategory });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          debouncedSetInstantSearchUiState({
            query: state.query
          });
        }
      },
      navigator: {
        navigate({ itemUrl }) {
          navigate(itemUrl);
        }
      },
      onSelect({ item }) {
        if (item && item?.objectID) {
          let url = `/products/${item.productId}`;

          if (item.productId !== item.objectID) {
            url = `/products/${item.productId}/variants/${item.objectID}`;
          }

          navigate(url);
        }

        if (item && item.label) {
          navigate(`/search/${item.label}`);
        }
        return;
      },
      getSources({ query }) {
        if (!query) {
          return [];
        }

        return [
          {
            sourceId: 'products',
            getItemUrl({ item }) {
              let url = `/products/${item.productId}`;

              if (item.productId !== item.objectID) {
                url = `/products/${item.productId}/variants/${item.objectID}`;
              }

              return url;
            },
            getItemInputValue({ item }) {
              return item.name;
            },
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName,
                    query,
                    params: {
                      ruleContexts: ['enable-redirect-url'],
                    }
                  }
                ]
              });
            },
            templates: {
              header() {
                return (
                  <Fragment>
                    <span className='aa-SourceHeaderTitle'>Products</span>
                    <span className='aa-SourceHeaderLine' />
                  </Fragment>
                );
              },
              item({ item, components }) {
                return createElement(SearchedProductItem, {item, components, navigate }, {});
              }
            }
          }
        ]
      },
      renderer: { createElement, Fragment, render },
      plugins,
    });

    return () => autocompleteInstance.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plugins]);

  return (
    <Box className={className} ref={autoCompleteContainer} sx={sx}></Box>
  );
};

export default AutoComplete;

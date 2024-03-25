import React, { useContext, useState } from 'react';
import { useSearchBox } from 'react-instantsearch-hooks-web';

const AppSearchContext = React.createContext();
export const useAppSearch = () => useContext(AppSearchContext);

export const AppSearchProvider = ({ children }) => {
  const { query, refine: setQuery } = useSearchBox();

  const [instantSearchUiState, setInstantSearchUiState] = useState({ query });

  return (
    <AppSearchContext.Provider value={{ instantSearchUiState, setInstantSearchUiState, query, setQuery }}>
      {children}
    </AppSearchContext.Provider>
  )
};


import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const [peopleReferences, setPeopleReferences] = useState([]);
  const [moviesReferences, setMoviesReferences] = useState([]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        searchResult,
        setSearchResult,

        peopleReferences,
        setPeopleReferences,
        moviesReferences,
        setMoviesReferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

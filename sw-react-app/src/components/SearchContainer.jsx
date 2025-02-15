import { useState } from 'react';
import useApi from '../hooks/useApi';
import { useAppContext } from '../contexts/AppContext';

export default function SearchContainer() {
  const { setSearchResult } = useAppContext();
  const [api, loading] = useApi();
  const [searchForm, setSearchForm] = useState({
    searchType: 'people',
    searchText: '',
  });

  const handleSearchTypeChange = (event) => {
    setSearchForm({ ...searchForm, searchType: event.target.value });
  };
  const handleSearchTextChange = (event) => {
    setSearchForm({ ...searchForm, searchText: event.target.value });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const res = await api(
      `search?type=${searchForm.searchType}&query=${searchForm.searchText}`
    );
    setSearchResult(res.data ? res.data : []);
  };

  return (
    <form className="white-box w-[410px] text-sm" onSubmit={handleSearch}>
      <h3 className="text-eclipse mb-5 font-semibold">
        What are you searching for?
      </h3>

      <div className="flex gap-7.5 mb-5">
        <div className="input-radio">
          <input
            type="radio"
            name="searchType"
            id="type-people"
            value="people"
            onChange={handleSearchTypeChange}
            checked={searchForm.searchType === 'people'}
          />
          <label htmlFor="type-people">People</label>
        </div>

        <div className="input-radio">
          <input
            type="radio"
            name="searchType"
            id="type-movie"
            value="movie"
            onChange={handleSearchTypeChange}
            checked={searchForm.searchType === 'movie'}
          />
          <label htmlFor="type-movie">Movie</label>
        </div>
      </div>

      <input
        type="text"
        name="searchText"
        className="input"
        placeholder={
          searchForm.searchType === 'people'
            ? 'e.g. Chewbacca, Yoda, Boba Fett'
            : 'e.g. A New Hope, Return of the Jedi'
        }
        value={searchForm.searchText}
        onChange={handleSearchTextChange}
      />

      <button
        type="submit"
        className="button w-full"
        disabled={!searchForm.searchText || loading}
      >
        {loading ? 'SEARCHING...' : 'SEARCH'}
      </button>
    </form>
  );
}

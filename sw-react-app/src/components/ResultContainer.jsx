import { useAppContext } from '../contexts/AppContext';
import ResultItem from './ResultItem';

export default function ResultContainer() {
  const { searchResult, isLoading } = useAppContext();

  return (
    <div className="white-box w-[582px] min-h-[582px] flex flex-col">
      <h2 className="font-bold text-lg border-b pb-2.5 border-pinkish-grey">
        Results
      </h2>
      {searchResult.length === 0 ? (
        <div className="text-center my-auto max-w-3xl font-bold text-pinkish-grey text-sm">
          {isLoading ? (
            <p>Searching...</p>
          ) : (
            <>
              <p>There are zero matches.</p>
              <p>Use the form to search for People or Movies.</p>
            </>
          )}
        </div>
      ) : (
        <ul>
          {searchResult.map((item, i) => (
            <ResultItem item={item} key={i} />
          ))}
        </ul>
      )}
    </div>
  );
}

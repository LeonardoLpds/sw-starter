import ResultContainer from '../components/ResultContainer';
import SearchContainer from '../components/SearchContainer';

export default function Home() {
  return (
    <div className="flex justify-center items-start gap-7.5 mt-7.5">
      <SearchContainer />
      <ResultContainer />
    </div>
  );
}

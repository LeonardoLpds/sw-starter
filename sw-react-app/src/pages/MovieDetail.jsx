import { Link, Navigate, useParams } from 'react-router';
import { useAppContext } from '../contexts/AppContext';
import Detail from '../components/Detail';
import { useEffect } from 'react';
import useApi from '../hooks/useApi';

export default function MovieDetail() {
  const {
    searchResult,
    moviesReferences,
    setPeopleReferences,
    peopleReferences,
  } = useAppContext();
  const { id } = useParams();
  const [api, isLoading] = useApi();

  const movie = [...searchResult, ...moviesReferences].find(
    (item) => item.id === id
  );
  if (!movie) return <Navigate to="/" replace />;

  useEffect(() => {
    setPeopleReferences([]);
    const getPeople = async () => {
      const people = movie.people.map((char) => api(`people/${char}`));
      const res = (await Promise.all(people)).map((char) => char.data);
      setPeopleReferences(res ?? []);
    };
    getPeople();
  }, [movie]);

  const firstSection = {
    title: 'Opening Crawl',
    content: <p>{movie.opening_crawl}</p>,
  };

  const secondSection = {
    title: 'People',
    content: isLoading ? (
      'Loading People...'
    ) : (
      <p className="text-sm">
        {peopleReferences.map((char, i) => (
          <span key={char.id}>
            <Link className="text-azure" to={`/people/${char.id}`}>
              {char.name}
            </Link>
            {i !== peopleReferences.length - 1 && ', '}
          </span>
        ))}
      </p>
    ),
  };

  return (
    <Detail title={movie.title} first={firstSection} second={secondSection} />
  );
}

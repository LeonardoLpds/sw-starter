import { Link, Navigate, useParams } from 'react-router';
import { useAppContext } from '../contexts/AppContext';
import Detail from '../components/Detail';
import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

export default function PeopleDetail() {
  const {
    searchResult,
    peopleReferences,
    setMoviesReferences,
    moviesReferences,
  } = useAppContext();
  const { id } = useParams();
  const [api] = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const people = [...searchResult, ...peopleReferences].find(
    (item) => item.id === id
  );
  if (!people) return <Navigate to="/" replace />;

  useEffect(() => {
    setMoviesReferences([]);
    const getMovies = async () => {
      setIsLoading(true);
      const movies = people.movies.map((movie) => api(`movie/${movie}`));
      const res = (await Promise.all(movies)).map((movie) => movie.data);
      setMoviesReferences(res ?? []);
      setIsLoading(false);
    };
    getMovies();
  }, [people]);

  const firstSection = {
    title: 'Details',
    content: (
      <ul className="text-sm">
        <li>Birth Year: {people.birth_year}</li>
        <li>Gender: {people.gender}</li>
        <li>Eye Color: {people.eye_color}</li>
        <li>Hair Color: {people.hair_color}</li>
        <li>Height: {people.height}</li>
        <li>Mass: {people.mass}</li>
      </ul>
    ),
  };

  const secondSection = {
    title: 'Movies',
    content: isLoading ? (
      'Loading Movies...'
    ) : (
      <p className="text-sm">
        {moviesReferences.map((movie, i) => (
          <span key={movie.id}>
            <Link className="text-azure" to={`/movie/${movie.id}`}>
              {movie.title}
            </Link>
            {i !== moviesReferences.length - 1 && ', '}
          </span>
        ))}
      </p>
    ),
  };

  return (
    <Detail title={people.name} first={firstSection} second={secondSection} />
  );
}

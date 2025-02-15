import { Link } from 'react-router';

export default function ResultItem({ item }) {
  const title = item.title || item.name;
  const path = item.title ? `/movie/${item.id}` : `/people/${item.id}`;

  return (
    <li className="flex gap-5 py-2.5 items-center justify-between border-b border-pinkish-grey">
      <span className="font-bold">{title}</span>
      <Link to={path}>
        <button className="button">SEE DETAILS</button>
      </Link>
    </li>
  );
}

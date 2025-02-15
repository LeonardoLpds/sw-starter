import { Link } from 'react-router';

export default function Detail({ title, first, second }) {
  return (
    <div className="white-box w-[804px] min-h-[417px] mx-auto mt-7.5 flex flex-col items-start">
      <h1 className="font-bold text-lg mb-7.5">{title}</h1>

      <div className="flex gap-25 w-full mb-7.5">
        <div className="grow flex-1">
          <h2 className="font-bold border-b border-pinkish-grey pb-2.5 w-full mb-[5px]">
            {first.title}
          </h2>
          <div className="max-w-[220px]">{first.content}</div>
        </div>

        <div className="grow flex-1">
          <h2 className="font-bold border-b border-pinkish-grey pb-2.5 w-full mb-[5px]">
            {second.title}
          </h2>
          {second.content}
        </div>
      </div>
      <Link to="/" className="mt-auto">
        <button className="button">BACK TO SEARCH</button>
      </Link>
    </div>
  );
}

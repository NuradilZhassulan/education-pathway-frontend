import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="my-4">
      {paths.map((path, index) => (
        <span key={index}>
          {path.link ? (
            <Link to={path.link} className="text-blue-500 hover:text-blue-700">
              {path.name}
            </Link>
          ) : (
            <span className="text-gray-500">{path.name}</span>
          )}
          {index < paths.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;

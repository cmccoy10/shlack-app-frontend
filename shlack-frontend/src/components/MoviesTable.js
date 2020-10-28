import React from 'react';
import { useSelector } from 'react-redux';

const MoviesTable = () => {
  const movies = useSelector(state => state.movies);

  return (
    <>
      <h1>Movie Table</h1>
      <table>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Rating</th>
        </tr>
      </table>
    </>
  )
};
export default MoviesTable;

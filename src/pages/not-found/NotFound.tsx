import React from 'react'
import { Link } from 'react-router-dom'


export const NotFound: React.FC = () => {
  return (
    <>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to='/'>Back to home</Link>
    </>
  );
};
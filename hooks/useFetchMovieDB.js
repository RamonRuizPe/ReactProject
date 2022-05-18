import React from 'react';
import { url } from '../src/constants/constants';

export const useFetchMovieDB = async (pageNum, watch_providers) => {
  const response = await fetch(`${url.tv}&page=${pageNum}`)
  return (
    <div>useFetchMovieDB</div>
  )
}
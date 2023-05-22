// import { useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSearchParams } from 'react-router-dom';
import {
  API_KEY,
  ENDPOINT_DISCOVER,
  ENDPOINT_MOVIE,
  ENDPOINT_SEARCH,
} from '../constants';

const buildParams = (params) => {
  return createSearchParams({
    language: 'en-US',
    api_key: API_KEY,
    sort_by: 'vote_count.desc',
    ...params,
  });
};

export const fetchMovies = createAsyncThunk('fetch-movies', async (params) => {
  const response = await fetch(`${ENDPOINT_DISCOVER}?${buildParams(params)}`, {
    method: 'GET',
  });
  return response.json();
});

export const fetchSearchMovies = createAsyncThunk(
  'fetch-search-movies',
  async (params) => {
    const response = await fetch(`${ENDPOINT_SEARCH}?${buildParams(params)}`, {
      method: 'GET',
    });
    return response.json();
  }
);

export const getMovieDetails = async ({ movieId }) => {
  if (!movieId) return;

  const getMovieDetailsUrl = `${ENDPOINT_MOVIE}${movieId}?${createSearchParams({
    api_key: API_KEY,
    append_to_response: 'videos',
  })}`;

  try {
    const movieDetails = await fetch(getMovieDetailsUrl).then((response) =>
      response.json()
    );

    return movieDetails;
  } catch (error) {
    throw new Error(error);
  }
};

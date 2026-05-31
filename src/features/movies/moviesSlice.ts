import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { MovieSearchResult, MovieDetails, SearchResponse } from '../../types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com';

export const searchMovies = createAsyncThunk<MovieSearchResult[], string>(
  'movies/search',
  async (searchTerm, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}`);
    const data: SearchResponse = await response.json();

    if (data.Response === 'False') {
      return rejectWithValue(data.Error || 'Фильмы не найдены');
    }
    return data.Search || [];
  }
);

export const fetchMovieDetails = createAsyncThunk<MovieDetails, string>(
  'movies/fetchDetails',
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    const data = await response.json();

    if (data.Response === 'False') {
      return rejectWithValue(data.Error || 'Ошибка загрузки деталей');
    };
    return data;
  }
);

interface MoviesState {
  searchResults: MovieSearchResult[];
  loading: boolean;
  error: string | null;
  movieDetails: MovieDetails | null;
  detailsLoading: boolean;
  detailsError: string | null;
};

const initialState: MoviesState = {
  searchResults: [],
  loading: false,
  error: null,
  movieDetails: null,
  detailsLoading: false,
  detailsError: null
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Search
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResults = [];
      })
      // Details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
        state.movieDetails = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload as string;
      });
  },
});

export const { clearSearch } = moviesSlice.actions;
export default moviesSlice.reducer;

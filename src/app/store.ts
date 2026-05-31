import { configureStore, combineReducers } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer
});

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  if (action.type?.startsWith('favorites/')) {
    const state = store.getState();
    localStorage.setItem('favorites', JSON.stringify(state.favorites.items));
  }
  return result;
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

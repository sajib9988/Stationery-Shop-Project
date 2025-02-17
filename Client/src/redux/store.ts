import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

// Import your API slice (RTK Query)
import { baseApi } from './baseApi/baseApi'

// Import your slices
import authReducer from './feature/authManage/authSlice' // Adjust path if needed
import cartReducer from './feature/cart/cartSlice'       // Correct import for cart slice

// Persist configuration for the auth slice
const persistConfig = {
  key: 'auth',
  storage,
}

// Create a persisted version of the authReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer)

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,            // Persisted auth slice
    cart: cartReducer,                     // Cart slice
    [baseApi.reducerPath]: baseApi.reducer // RTK Query API slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware), // Add RTK Query middleware
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Create the persistor for redux-persist
export const persistor = persistStore(store)

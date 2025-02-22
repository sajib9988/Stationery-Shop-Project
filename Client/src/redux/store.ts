import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
 // Adjust path if needed
import cartReducer from './feature/cart/cartSlice'       // Correct import for cart slice
import  authSlice  from './feature/authManage/authSlice'


export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth:  authSlice,           
  cart: cartReducer,                     
})
// Persist configuration for the auth slice
const persistConfig = {
  key: 'Bikeauth',
  storage,
}
const persistedAuthReducer = persistReducer(persistConfig, rootReducer);
// Create a persisted version of the authReducer


// Configure the Redux store
export const store = configureStore({
  reducer:persistedAuthReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Create the persistor for redux-persist
export const persistor = persistStore(store)

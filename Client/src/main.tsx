import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { persistor, store } from './redux/store';
import router from './routes/route'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>
)

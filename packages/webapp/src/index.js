import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <App />

    </PersistGate>

  </Provider>,
)
reportWebVitals()

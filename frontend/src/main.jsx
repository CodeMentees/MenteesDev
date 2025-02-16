import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1008240831535-kkhfvl42jeglpkabcuodsipqgb1k1dfl.apps.googleusercontent.com"  // Use your own client ID
    >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>

  </StrictMode>,
)

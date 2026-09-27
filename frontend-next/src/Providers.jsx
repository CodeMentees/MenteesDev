'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { GoogleOAuthProvider } from '@react-oauth/google';

/**
 * Providers — wraps the app with Redux Provider and GoogleOAuthProvider.
 * Must be a Client Component because redux and oauth hooks need browser context.
 */
export default function Providers({ children }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'dummy-google-client-id.apps.googleusercontent.com';

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={googleClientId}>
        {children}
      </GoogleOAuthProvider>
    </Provider>
  );
}

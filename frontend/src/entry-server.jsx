import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './store';

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
           <div>Test</div>
        </StaticRouter>
      </HelmetProvider>
    </Provider>
  );
  return { html, helmet: helmetContext.helmet };
}

import app from "./index.js";

const routes = [];

function parseExpressApp(app) {
  const stack = app._router ? app._router.stack : [];
  stack.forEach(layer => {
    if (layer.route) {
      // It's a route directly on the app
      const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
      const path = layer.route.path;
      // Gather middlewares for this route
      const middlewares = layer.route.stack.map(s => s.name).filter(n => n !== '<anonymous>').join(', ');
      routes.push({ path, methods, middlewares });
    } else if (layer.name === 'router') {
      // It's a nested router
      const basePath = layer.regexp.source
        .replace('^\\', '')
        .replace('\\/?(?=\\/|$)', '')
        .replace('(?:\\/)?$', '')
        .replace(/\\\//g, '/');
      
      layer.handle.stack.forEach(routerLayer => {
        if (routerLayer.route) {
          const methods = Object.keys(routerLayer.route.methods).join(', ').toUpperCase();
          const path = basePath + routerLayer.route.path;
          const middlewares = routerLayer.route.stack.map(s => s.name).filter(n => n !== '<anonymous>').join(', ');
          routes.push({ path, methods, middlewares });
        }
      });
    }
  });
}

parseExpressApp(app);
console.log(JSON.stringify(routes, null, 2));

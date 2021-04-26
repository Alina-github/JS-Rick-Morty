// To run the local server:
// 1. npm install http-server-spa -g
// 2. http-server-spa . ./start.html

const routerOutletElement = document.querySelectorAll('[data-router]')[0];

const routes = [
  {
    path: '/feed',
    getTemplate: (params, callback) => handleInitialPage(callback),
  },
  {
    path: `/feed/card/:id`,
    getTemplate: (params, callback) => handleOneCard(params.id, callback)
  }
];

class Router {

  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  loadRoute(...urlSegments) {

    const matchedRoute = this._matchUrlToRoute(urlSegments);
    const url = `/${urlSegments.join('/')}`;
    history.pushState({}, '', url);
    const callback = result => {
      routerOutletElement.innerHTML = result.innerHTML;
    };
    matchedRoute.getTemplate(matchedRoute.params, callback);
  }

  _matchUrlToRoute(urlSegments) {

    const routeParams = {};
    const matchedRoute = this.routes.find(route => {
      const routePathSegments = route.path.split('/').slice(1);
      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }

      const match = routePathSegments.every((routePathSegment, i) => {
        return routePathSegment === urlSegments[i] || routePathSegment[0] === ':';
      });


      if (match) {
        routePathSegments.forEach((segment, i) => {
          if (segment[0] === ':') {
            const propName = segment.slice(1);
            routeParams[propName] = decodeURIComponent(urlSegments[i]);
          }
        });
      }
      return match;
    });

    return { ...matchedRoute, params: routeParams };
  }

  _loadInitialRoute() {
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : 'feed';
    // Load the initial route.
    this.loadRoute(...pathSegments);
  }

  loadRouteFromPopState(...urlSegments) {
    const matchedRoute = this._matchUrlToRoute(urlSegments);
    const routerOutletElement = document.querySelectorAll(
      '[data-router]')[0];
    const callback = result => {
      routerOutletElement.innerHTML = result.innerHTML;
    };
    matchedRoute.getTemplate(matchedRoute.params, callback);
  } // duplicate code, need to add flag (isHistoryPushed = true);

  updateTheContent() {
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : 'feed';
    this.loadRouteFromPopState(...pathSegments);
  }
}

window.addEventListener("popstate", e => {
  console.log('the history changed')
  router.updateTheContent()
})

window.onbeforeunload = () => {
  router.updateTheContent()
}

const router = new Router(routes)


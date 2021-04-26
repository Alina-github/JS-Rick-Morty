// To run the local server:
// 1. npm install http-server-spa -g
// 2. http-server-spa . ./index.html

const routerDOMElement = document.querySelectorAll('[data-router]')[0];

const routes = [
  {
    path: '/',
    getTemplate: (params, callback) => handleRedirectionPage(callback),
  },

  {
    path: '/feed',
    getTemplate: (params, callback) => handleInitialPage(callback),
  },
  {
    path: `/feed/card/:id`,
    getTemplate: (params, callback) => handleOneCard(params.id, callback)
  }
];

const handleRedirectionPage = (callback) => {
  showLinkToFeedPage(callback);
}

const handleInitialPage = (callback) => {
  showArticles(callback);
}

const handleOneCard = (id, callback) => {
  showCard(id, callback);
}

class Router {

  constructor(routes) {
    this.routes = routes;
    this.loadContent();
  }

  loadRoute(urlSegments, needHistoryPush) {

const listUrlsegments = typeof urlSegments === 'string' ? [urlSegments] : urlSegments;
    const matchedRoute = this._matchUrlToRoute(listUrlsegments);

    if (needHistoryPush) {

      const url = `/${listUrlsegments.join('/')}`;
      history.pushState({}, '', url);
    }
    const callback = result => {
      routerDOMElement.innerHTML = result.innerHTML;
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

    return {...matchedRoute, params: routeParams};
  }
  _getPathSegments() {
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : 'feed';
    return pathSegments;
  }

  loadContent() {
    this.loadRoute(this._getPathSegments(), false);
  }
}

window.addEventListener("popstate",  e => {
   router.loadContent();
 })

const router = new Router(routes);

const linksToMainPage = document.querySelectorAll(".link");
linksToMainPage.forEach(el => el.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  router.loadRoute(['feed'], true)
}))
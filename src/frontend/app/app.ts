import { Router } from '../router/router.js';
import { configureRoutes } from './routes.js';

export interface AppInstance {
  router: Router;
  init: (initialPath?: string) => void;
}

export function createCampusHubApp(containerElement?: HTMLElement): AppInstance {
  const router = new Router(containerElement);
  configureRoutes(router);

  return {
    router,
    init: (initialPath = '/') => {
      router.navigate(initialPath);
    },
  };
}

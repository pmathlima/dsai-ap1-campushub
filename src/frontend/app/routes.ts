import { Router } from '../router/router.js';
import { renderHomePage } from '../pages/home-page.js';
import { renderLoginPage } from '../pages/login-page.js';
import { renderNotFoundPage } from '../pages/not-found-page.js';

export function configureRoutes(router: Router): void {
  router.register({
    path: '/',
    handler: renderHomePage,
    title: 'Início',
  });

  router.register({
    path: '/login',
    handler: renderLoginPage,
    title: 'Entrar',
  });

  router.setNotFound(renderNotFoundPage);
}

import { createPlaceholderView } from '../components/placeholder.js';

export function renderNotFoundPage(): HTMLElement {
  return createPlaceholderView('Página não encontrada', 'O recurso solicitado não existe.');
}

export interface RouteContext {
  path: string;
  params: Record<string, string>;
}

export type RouteHandler = (context: RouteContext) => HTMLElement | string;

export interface RouteDefinition {
  path: string;
  handler: RouteHandler;
  title?: string;
}

export class Router {
  private routes: Map<string, RouteDefinition> = new Map();
  private notFoundHandler: RouteHandler = () => '404 - Página não encontrada';
  private container: HTMLElement | null = null;
  private currentPath: string = '';

  constructor(container?: HTMLElement) {
    if (container) {
      this.container = container;
    }
  }

  setContainer(container: HTMLElement): void {
    this.container = container;
  }

  register(route: RouteDefinition): void {
    this.routes.set(route.path, route);
  }

  setNotFound(handler: RouteHandler): void {
    this.notFoundHandler = handler;
  }

  getCurrentPath(): string {
    return this.currentPath;
  }

  navigate(path: string): void {
    this.currentPath = path;
    const route = this.routes.get(path);
    const context: RouteContext = { path, params: {} };

    const content = route ? route.handler(context) : this.notFoundHandler(context);

    if (this.container) {
      if (typeof content === 'string') {
        this.container.innerHTML = content;
      } else {
        this.container.innerHTML = '';
        this.container.appendChild(content);
      }
    }
  }
}

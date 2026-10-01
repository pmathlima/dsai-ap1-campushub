import type { BaseEntity } from '../core/entity.js';
import type { Repository } from '../interfaces/repository.js';

export class InMemoryRepository<T extends BaseEntity> implements Repository<T> {
  protected readonly items: Map<string, T> = new Map();

  async findById(id: string): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

  async save(entity: T): Promise<void> {
    this.items.set(entity.id, entity);
  }
}

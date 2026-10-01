import type { BaseEntity } from '../core/entity.js';

export interface Repository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<void>;
}

import { EntityManager, Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    findOneBy: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
  }),
);

export const entityManagerMockFactory: () => MockType<EntityManager> = jest.fn(
  () => ({
    query: jest.fn(),
  }),
);

/**
 * GraphQL resolvers.
 */
export const resolvers = {
  Query: {
    files: () => ({
      items: [
        { title: 'Hello World', path: '/hello/world.mp4' },
        { title: 'Breaking Bad', path: '/hello/breaking-bad.mp4' }
      ]
    })
  }
};

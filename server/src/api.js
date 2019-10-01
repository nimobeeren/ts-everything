const resolvers = {
  Query: {
    videos: () => [{ title: 'Hello World', path: '/hello/world.mp4' }]
  }
};

module.exports = resolvers;

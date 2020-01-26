Testing

- Migrate to React Testing Library
- Snapshot testing
- Automatically generate integration tests for each query?
- Automocking

Linting

- `no-extraneous-dependencies` always enabled except in test files (so move dev deps to deps)

Optimization

- SSR?
- Code splitting

Infrastructure

- Proper logging
- Do we need a babelrc for /graphql and /test-utils?
- Make start-server work without `cd`
- Find a way to simplify long relative imports that works with both Parcel and Jest
- Migrate to a two (three?) package architecture

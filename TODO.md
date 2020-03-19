Testing

- Speed up tests
- Snapshot testing
- Automatically generate integration tests for each query?
- Automocking?
- Rethink server tests: does it make sense to have the test result depend on what data is available (data changes -> test fails)? Do we want to test if the server responds to HTTP requests?
- Bring back container component as an example for testing a parent/child tree?

Optimization

- SSR?
- Code splitting

Infrastructure

- Avoid confusion with `test-utils` NPM package
- Avoid confusion between `FileList` type and `FileList` component
- Migrate to a two (three?) package architecture?
- Idea: write configuration in TS and throw the whole thing through babel/tsc
- Test if babel is really faster than tsc
- Try Rollup

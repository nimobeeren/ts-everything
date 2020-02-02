Testing

- Migrate to React Testing Library
- Snapshot testing
- Automatically generate integration tests for each query?
- Automocking?
- Rethink server tests: does it make sense to have the test result depend on what data is available (data changes -> test fails)? Do we want to test if the server responds to HTTP requests?

Automation

- Plop for templates

Optimization

- SSR?
- Code splitting

Infrastructure

- Avoid confusion with `test-utils` NPM package
- Avoid confusion between `FileList` type and `FileList` component
- Proper logging
- Migrate to a two (three?) package architecture?
- Idea: write configuration in TS and throw the whole thing through babel/tsc
- Test if babel is really faster than tsc
- Try Rollup

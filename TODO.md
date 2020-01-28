Testing

- Migrate to React Testing Library
- Snapshot testing
- Automatically generate integration tests for each query?
- Automocking

Optimization

- SSR?
- Code splitting

Testing

- Rethink container component tests: what do we want to assert? If we assert on rendered output we are indirectly testing the (dumb) UI component as well. Should we unit test container components at all? You wouldn't unit test something like a home page component either (maybe just a "renders without exploding", though you also don't want to do that for every page component). Should container components even exist? Can't we just get the data in a higher level component such as "Home", which would render a UI component directly? Maybe use a "Query" component that deals with loading and error states?
- Rethink server tests: does it make sense to have the test result depend on what data is available (data changes -> test fails)? Do we want to test if the server responds to HTTP requests?

Infrastructure

- Avoid confusion with `test-utils` NPM package
- Proper logging
- Migrate to a two (three?) package architecture
- Idea: write configuration in TS and throw the whole thing through babel/tsc
- Test if babel is really faster than tsc

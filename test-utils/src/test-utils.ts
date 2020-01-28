/* This file serves as an index for the test-utils to be imported.
 *
 * The reason it is named `test-utils.ts` is to make Jest module resolution work.
 * By adding the `test-utils/src` directory to Jest's `moduleDirectories`, it will look in this directory
 * for any modules that it can't find in node_modules. This allows us to import anything that we export here
 * simply by doing `import { thing } from 'test-utils' in test files.
 *
 * In order to make the TS checker happy, we also need to include this file in the `paths` of `tsconfig.json`.
 */
export * from './ApolloMockingProvider';
export * from './customRender';

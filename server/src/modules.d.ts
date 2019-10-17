type DocumentNode = import('graphql').DocumentNode;

/**
 * Declares any modules that do not have type definitions available.
 */

declare module '*.graphql' {
  const content: DocumentNode;
  export default content;
}

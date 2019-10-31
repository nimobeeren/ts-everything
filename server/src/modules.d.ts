/*
 * Here we declare any modules that do not have type definitions available.
 */

type DocumentNode = import('graphql').DocumentNode;

/**
 * GraphQL schema file (as loaded by Parcel).
 */
declare module '*.graphql' {
  const content: DocumentNode;
  export default content;
}

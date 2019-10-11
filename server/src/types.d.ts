type DocumentNode = import('graphql').DocumentNode;

declare module '*.graphql' {
  const content: DocumentNode;
  export default content;
}

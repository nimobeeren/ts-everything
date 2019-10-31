/*
 * This is GENERATED CODE, do not modify!
 *
 * Here we provide TypeScript types and utilities for the GraphQL schema.
 * When you make changes to your GraphQL schema, you should regenerate this file using `yarn generate`.
 */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type File = {
  __typename?: 'File';
  title?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  files: Array<File>;
};

export type FileListQueryVariables = {};

export type FileListQuery = { __typename?: 'Query' } & {
  files: Array<{ __typename?: 'File' } & Pick<File, 'title' | 'path'>>;
};

export const FileListDocument = gql`
  query FileList {
    files {
      title
      path
    }
  }
`;

/**
 * __useFileListQuery__
 *
 * To run a query within a React component, call `useFileListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFileListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFileListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFileListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FileListQuery, FileListQueryVariables>
) {
  return ApolloReactHooks.useQuery<FileListQuery, FileListQueryVariables>(FileListDocument, baseOptions);
}
export function useFileListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FileListQuery, FileListQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<FileListQuery, FileListQueryVariables>(FileListDocument, baseOptions);
}
export type FileListQueryHookResult = ReturnType<typeof useFileListQuery>;
export type FileListLazyQueryHookResult = ReturnType<typeof useFileListLazyQuery>;
export type FileListQueryResult = ApolloReactCommon.QueryResult<FileListQuery, FileListQueryVariables>;

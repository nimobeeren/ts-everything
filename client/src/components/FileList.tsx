import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { File } from '../../../server/src/types';

const GET_FILES = gql`
  query Files {
    files {
      title
      path
    }
  }
`;

export const FileList = () => {
  const { data, loading, error } = useQuery(GET_FILES);
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.error(`GQL error: ${error}`);
    return <p>Error</p>;
  }

  return (
    <ul>
      {data.files.map((file: File) => (
        <li key={file.path}>
          {file.title} (<i>{file.path}</i>)
        </li>
      ))}
    </ul>
  );
};

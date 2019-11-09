import React from 'react';
import { useFileListQuery } from '../graphql';
import { FileList } from '.';

export const FileListContainer: React.FC = () => {
  const { data, loading, error } = useFileListQuery();

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.error(`GQL error: ${error}`);
    return <p>Error</p>;
  }

  return <FileList files={data.files} />;
};

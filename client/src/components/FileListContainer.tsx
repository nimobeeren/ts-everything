import React from 'react';
import { useFileListQuery } from '../../../graphql';
import { FileList } from '.';

export const FileListContainer: React.FC = () => {
  const { data, loading, error } = useFileListQuery();

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return <FileList files={data.files.items} />;
};

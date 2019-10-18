import React from 'react';
import { useFileListQuery } from '../graphql';

export const FileList = () => {
  const { data, loading, error } = useFileListQuery();
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.error(`GQL error: ${error}`);
    return <p>Error</p>;
  }

  return (
    <ul>
      {data.files.map(file => (
        <li key={file.path}>
          {file.title} (<i>{file.path}</i>)
        </li>
      ))}
    </ul>
  );
};

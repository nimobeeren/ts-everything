import React from 'react';
import { styled } from '../theme';
import { useFileListQuery } from '../graphql';

const StyledFileList = styled.ul`
  color: ${props => props.theme.colors.primary};
`;

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
    <StyledFileList>
      {data.files.map(file => (
        <li key={file.path}>
          {file.title} (<i>{file.path}</i>)
        </li>
      ))}
    </StyledFileList>
  );
};

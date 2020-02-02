import React from 'react';
import { styled } from '../theme';
import { useFileListQuery } from '../../../graphql/src';

const StyledFileList = styled.ul`
  color: ${props => props.theme.colors.primary};
`;

export const FileList: React.FC = () => {
  const { data, loading, error } = useFileListQuery();

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { files } = data;

  return (
    <StyledFileList>
      {files.items.map(file => (
        <li key={file.path}>
          {file.title} (<i>{file.path}</i>)
        </li>
      ))}
    </StyledFileList>
  );
};

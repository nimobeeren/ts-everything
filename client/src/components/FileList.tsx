import React from 'react';
import { styled } from '../theme';
import { File } from '../../../graphql';

const StyledFileList = styled.ul`
  color: ${props => props.theme.colors.primary};
`;

interface FileListProps {
  files: File[];
}

export const FileList: React.FC<FileListProps> = ({ files }) => (
  <StyledFileList>
    {files.map(file => (
      <li key={file.path}>
        {file.title} (<i>{file.path}</i>)
      </li>
    ))}
  </StyledFileList>
);

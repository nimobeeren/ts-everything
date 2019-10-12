import React from 'react';

export const FileList = () => {
  const content = [
    { title: 'Breaking Bad', path: '/dev/null' },
    { title: 'Game of Thrones', path: '/dev/null' },
    { title: 'South Park', path: '/dev/null' }
  ];

  return (
    <ul>
      {content.map(item => (
        <li>
          {item.title} (<i>{item.path}</i>)
        </li>
      ))}
    </ul>
  );
};

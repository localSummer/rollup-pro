import * as React from 'react';

const ShowCount: React.FC<{count: number}> = ({count}) => {
  return (
    <p>count: {count}</p>
  );
}

export default ShowCount;

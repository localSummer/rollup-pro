import * as React from 'react';

const ShowCount: React.FC<{count: number}> = ({count}) => {
  return (
    <p>count: <span>{count}</span></p>
  );
}

export default ShowCount;

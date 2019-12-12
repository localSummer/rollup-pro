/* eslint-disable react/prop-types */
import * as React from "react";

interface IProps {
  onAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CountOperation: React.FC<IProps> = ({ onAdd }) => {
  return (
    <div>
      <button onClick={onAdd}>add</button>
    </div>
  );
};

export default CountOperation;

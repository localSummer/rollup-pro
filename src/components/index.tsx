import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

const dataList = [
  { name: 'hello' },
  { name: 'world' },
  { name: 'react' },
  { name: 'react-dom' },
]

ReactDOM.render(
  <List dataList={dataList} />,
  document.getElementById('app') as HTMLElement
);
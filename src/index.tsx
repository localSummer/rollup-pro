import * as React from 'react';
import CountOperation from './components/CountOperation';
import ShowCount from './components/ShowCount';
import loadingbar from './images/loadingbar.png';
import './index.less';

const Counter: React.FC = () => {
  let [count, setCount] = React.useState(0);
  let handleAdd = React.useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);
  return (
    <div>
      <ShowCount count={count}/>
      <img src={loadingbar} alt=""/>
      <CountOperation onAdd={handleAdd}/>
    </div>
  )
}

export default Counter;

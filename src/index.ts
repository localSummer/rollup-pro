import demo from './lib/demo';
import sum from './lib/test';

// 引入react组件
import './components/index';

import './css/index.less';

const arr1: number[] = [1,2,3];
const arr2: number[] = [4,5,6];
console.log([...arr1, ...arr2]);

async function initDemo () {
  let data = await demo();
  return data;
}

// 引入jest单元测试
console.log('sum(1, 2): ', sum(1, 2));

initDemo().then(data => {
  console.log('data: ', data);
}).catch(err => {
  console.log('err: ', err);
});
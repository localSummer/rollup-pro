import React from 'react';
import './index.less';
import logo from './images/logo.png';

class List extends React.Component<{
  dataList: { name: string }[]
}, {}> {
  render() {
    const { dataList = [] } = this.props;
    return (
      <div>
        <img src={logo} alt=""/>
        <ul>
          {dataList.map(function (item, index) {
            return (<li key={index}>{item.name}</li>)
          })}
        </ul>
      </div>
    )
  }
}

export default List;
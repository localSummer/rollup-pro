import React from 'react';
import './index.less';

class List extends React.Component<{
  dataList: { name: string }[]
}, {}> {
  render() {
    const { dataList = [] } = this.props;
    return (
      <div>
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
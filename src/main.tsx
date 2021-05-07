import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import Sider from '~/components/common/sider';
import Header from '~/components/common/header';
import 'antd/dist/antd.less';
import '~/assets/common.less';

const renderDOM = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <div className="main-wrapper-content">
        <Sider />
        <Router />
      </div>
    </div>
  )
}

ReactDOM.render(
  renderDOM(),
  document.getElementById('root')
)

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import ErrorBoundary from '~/components/common/ErrorBoundary';
import Index from '~/views/index/index';
import Detail from '~/views/detail/index';
import Info from '~/views/info/index';
import Login from '~/components/common/login';

export default () => (
  <div className="page-content">
    <ErrorBoundary>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Index /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/detail"><Detail /></Route>
            <Route path="/info"><Info /></Route>
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    </ErrorBoundary>
  </div>
)
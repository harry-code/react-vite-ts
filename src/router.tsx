import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import ErrorBoundary from '~/components/common/ErrorBoundary';
import Index from './index/index';
import Detail from './detail/index';
import Add from './add/index';

export default () => (
  <ErrorBoundary>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Index /></Route>
          <Route path="/detail"><Detail /></Route>
          <Route path="/add"><Add /></Route>
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  </ErrorBoundary>
)
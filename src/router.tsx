import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import ErrorBoundary from '~/components/common/ErrorBoundary';

const Index = React.lazy(() => import('~/views/index/index'))
const Detail = React.lazy(() => import('~/views/detail/index'))
const Info = React.lazy(() => import('~/views/info/index'))
const Login = React.lazy(() => import('~/components/common/login'))
const Sider = React.lazy(() => import('~/components/common/sider'))
const Header = React.lazy(() => import('~/components/common/header'))

function PrimaryLayout() {
  return (
    <div className="main-wrapper">
      <Header />
      <div className="main-wrapper-content">
        <Sider />
        <Switch>
          <Route exact path="/"><Index /></Route>
          <Route path="/detail"><Detail /></Route>
          <Route path="/info"><Info /></Route>
        </Switch>
      </div>
    </div>
  )
}

export default () => (
  <div className="page-content">
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter>
            <Switch>
              <Route path="/login"><Login /></Route>
              <PrimaryLayout />
            </Switch>
          </BrowserRouter>
        </ConfigProvider>
      </Suspense>
    </ErrorBoundary>
  </div >
)
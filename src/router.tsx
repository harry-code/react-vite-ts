import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import ErrorBoundary from '~/components/common/ErrorBoundary';

const Index = React.lazy(() => import('~/views/index/index'))
const Detail = React.lazy(() => import('~/views/detail/index'))
const Info = React.lazy(() => import('~/views/info/index'))
const Login = React.lazy(() => import('~/components/common/login'))
const Sider = React.lazy(() => import('~/components/common/sider'))
const Header = React.lazy(() => import('~/components/common/header'))
const CacheMenu = React.lazy(() => import('~/components/common/cacheMenu'))

function PrimaryLayout() {
  return (
    <div className="main-wrapper">
      <Header />
      <div className="main-wrapper-content">
        <Sider />
        <div className="main-wrapper-content-right">
          <Outlet/>
        </div>
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
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrimaryLayout />}>
                <Route index path="/" element={<Index />} />
                <Route path="/detail" element={ <Detail />} />
                <Route path="/info" element={<Info />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </Suspense>
    </ErrorBoundary>
  </div >
)
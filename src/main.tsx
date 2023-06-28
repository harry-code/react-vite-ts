import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './router';
import 'antd/dist/reset.css';
import '~/assets/common.less';

const root = createRoot(document.getElementById('root')!);
root.render(<Router />)



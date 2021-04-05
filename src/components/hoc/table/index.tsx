import React, { useState } from 'react';
import './index.less';

// 适用于列表页数据渲染 复用数据请求、loading
export default (WrappedComponent: React.ElementType, api: any) => {
  return () => {
    const [data, setList] = useState(false);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pager, setPager] = useState({pageNumber: 1, pageSize: 10})
    const getList = async (param?: any) => {
      setLoading(true);
      const res = await api(param);
      if (res.code === 200) {
        setList(res.rows);
        setTotal(res.total);
        setLoading(false);
      }
    };
    const props = {
      loading,
      data,
      total,
      pager,
      getList,
    };
    return <WrappedComponent {...props} />;
  };
};

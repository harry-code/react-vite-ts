import { Pagination, Table } from 'antd';
import HeadForm from '~/components/common/headForm';
import React, { useState } from 'react';
import './index.less'
// 表格组件与分页组件组合

interface props {
    changeData: (data: any) => void;
    total?: number | 0;
    loading?: boolean | false;
    columns?: any | [];
    data?: any | [];
    formData: any[];
}


export default ({changeData, loading, columns, data, total, formData }: props) => {
    // 头部筛选栏参数
    const [headParams, setParams] = useState({})

    // 头部参数查询
    const getParams = (data: Object) => {
        setParams(data)
        changeData({ pageNum: 1, pageSize: 10, ...data})
    }
    // 分页触发查询
    const onChange = (page: number, pageSize?: number) => {
        changeData({ pageNumber: page, pageSize, ...headParams })
    }
    return (
        <div className="table-list-page">
            <HeadForm formData={formData} getParams={getParams}/>
            <Table 
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey={i => i.supplierId} 
            />
            <Pagination
                className="page"
                total={total}
                showSizeChanger
                showQuickJumper
                showTotal={total => `共 ${total} 条`}
                onChange={onChange}
            /> 
        </div>
    )
}
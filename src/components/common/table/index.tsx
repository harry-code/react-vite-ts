import { Pagination, Table, Button } from 'antd';
import HeadForm from '~/components/common/form/index';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './index.less'
// 表格组件与分页组件组合

interface props {
    changeData: (data: any) => void;
    total?: number | 0;
    loading?: boolean | false;
    columns?: any | [];
    data?: any | [];
    formData: any[];
    addTitle: string;
    addUrl?: string;
    formStyle?: { [key: string]: string }; // form的样式
    formBtns?: {
        name: string;
        tapType: string;
    }[]; // form的按钮们
}


export default ({
    changeData, loading, columns, data, total,
    formData, addTitle = '新增', addUrl = '',
    formStyle = { layout: 'horizontal', name: 'from' },
    formBtns = [
        {
            name: '查询',
            tapType: 'submit',
        },
        {
            name: '重置',
            tapType: 'reset',
        }
    ]
}: props) => {
    // 渲染columns最后一列 操作
    useMemo(() => {
        const actionObj = columns.find((i: { key: string; }) => i.key === 'action') ?? {};
        actionObj.render = () => (
            <>
                {actionObj.btns.map((ite: any) => <span className="action-btn" key={ite}>{ite}</span>)}
            </>
        )
    }, [columns])
    // 渲染新增等按钮
    const renderAdd = () => {
        return (
            addTitle ? (<Link to={addUrl}>
                <Button type="primary">{addTitle}</Button>
            </Link>) : null
        )
    }
    // 头部筛选栏参数
    const [headParams, setParams] = useState({})

    // 头部参数查询
    const getParams = (data: Object) => {
        setParams(data)
        changeData({ pageNum: 1, pageSize: 10, ...data })
    }
    // 分页触发查询
    const onChange = (page: number, pageSize?: number) => {
        changeData({ pageNumber: page, pageSize, ...headParams })
    }
    return (
        <div className="table-list-page">
            <HeadForm
                formData={formData}
                getParams={getParams}
                formStyle={formStyle}
                formBtns={formBtns}
            />
            {renderAdd()}
            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey={i => i.materialId}
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
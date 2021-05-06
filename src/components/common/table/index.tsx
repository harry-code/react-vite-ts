import { Pagination, Table, Button, Modal, message } from 'antd';
import React, { useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import HeadForm from '~/components/common/form/index';
import './index.less'

const { confirm } = Modal;

// 表格组件与分页组件组合
interface props {
    changeData: (data: any) => void;
    total?: number | 0;
    loading?: boolean | false;
    columns?: any | [];
    data?: any | [];
    formItems: any[];
    addTitle: string;
    addUrl?: string;
    formStyle?: { [key: string]: string }; // form的样式
    formBtns?: {
        name: string;
        tapType: string;
    }[]; // form的按钮们
    apis: any[]
}


export default ({
    changeData, loading, columns, data, total,
    formItems, addTitle = '新增', addUrl = '',
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
    ],
    apis
}: props) => {
    const history = useHistory();
    // 渲染columns最后一列 操作
    useMemo(() => {
        const actionObj = columns.find((i: { key: string; }) => i.key === 'action') ?? {};
        actionObj.render = (t: any, r: { materialId: any; }) => (
            <>
                {actionObj.btns.map((ite: any) => <span className="action-btn" key={ite.type} data-type={ite.type} data-id={r.materialId} onClick={actionHandler}>{ite.name}</span>)}
            </>
        )
    }, [columns])
    // 按钮点击事件
    const actionHandler = (e: any) => {
        const { type, id } = e.target.dataset
        switch (type) {
            case 'delete': // 删除操作
                confirm({
                    title: '提示',
                    icon: <ExclamationCircleOutlined />,
                    content: '您要删除这条数据吗？',
                    async onOk() {
                        const api = await apis.find(i => i.name === type).value;
                        try {
                            const delRes = await api(id);
                            if (delRes?.code === 200) {
                                message.success('删除成功！')
                                onChange(); // 删除之后查询当前页码数据
                            }
                        } catch (error) {
                            throw new Error(error)
                        }
                    },
                    onCancel() {
                        console.log('取消删除');
                    },
                });
                break;
            case 'info': // 查看详情操作
                history.push({
                    pathname: '/info',
                    search: 'id=' + id
                })
                break;
            default:
                break;
        }
    }
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
    const onChange = (page?: number, pageSize?: number) => {
        changeData({ pageNumber: page, pageSize, ...headParams })
    }
    return (
        <div className="table-list-page">
            <HeadForm
                formItems={formItems}
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
import React, { useEffect, useState, useRef } from 'react';
import Table from '~/components/common/table/index';
import TableHoc from '~/components/hoc/table';
import { List, DELETE } from '~/service/apis/test';

export default TableHoc((props: any) => {
    // 列表页面涉及的所有接口配置
    const apis = [
        {
            name: 'delete',
            value: DELETE
        },
    ]
    // hoc 传过来的参数
    const { getList, pager, ...params } = props;
    // 切换分页与头部筛选，change数据
    const changeData = (data: Object) => {
        getList(data)
    }
    // 头部筛选栏参数
    const formItems = [
        {
            label: '材料编号',
            name: 'materialNo',
            required: false,
            message: '请输入',
            type: 'input',
        },
        {
            label: '材料名称',
            name: 'materialName',
            required: false,
            message: '请输入',
            type: 'input',
        },
        {
            label: '材料类型',
            name: 'materialTypeId',
            required: false,
            message: '请选择',
            type: 'select',
        },
        {
            label: '入库食堂',
            name: 'orgId',
            required: false,
            message: '请选择',
            type: 'select',
        },
        {
            label: '入库库房',
            name: 'storeroomId',
            required: false,
            message: '请选择',
            type: 'select',
        },
    ]
    // table的列表项
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text: any, record: any, index: number) => `${index + 1}`,
        },
        {
            title: '材料编号',
            dataIndex: 'materialNo',
            key: 'materialNo',
        },
        {
            title: '材料名称',
            dataIndex: 'materialName',
            key: 'materialName',
        },
        {
            title: '单位',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: '是否属于猪肉',
            dataIndex: 'isPork',
            key: 'isPork',
            render: (t: number) => (t ? '是' : '否'),
        },
        {
            title: '材料类型',
            dataIndex: 'materialTypeName',
            key: 'materialTypeName',
        },
        {
            title: '入库库房',
            dataIndex: 'storeroomIds',
            key: 'storeroomIds',
        },
        {
            title: '操作',
            key: 'action',
            btns: [{ name: '删除', type: 'delete' }, { name: '编辑', type: 'info' }]
        },
    ]
    return (
        <>
            <Table
                changeData={changeData}
                columns={columns}
                formItems={formItems}
                {...params}
                apis={apis}
                formStyle={{ layout: 'inline' }}
                addUrl={'/info'}
            />
        </>
    )
}, List)
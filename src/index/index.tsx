import React, { useEffect, useState } from 'react';
import Table from '~/components/common/table/index';
import TableHoc from '~/components/hoc/table';
import { List } from '~/service/apis/test';

export default TableHoc((props: any) => {
    // const count = useSelector(selectCount)
    // const dispatch = useDispatch();
    useEffect(() => {
        getList(pager);
    }, [])

    // hoc 传过来的参数
    const { getList, pager, ...params } = props;
    // 头部筛选栏参数
    const formData = [
        {
            label: '测试1',
            name: '测试1',
            required: true,
            message: '请输入',
            type: 'input',
        },
        {
            label: '测试2',
            name: '测试2',
            required: true,
            message: '请选择',
            type: 'select',
        },
        {
            label: '测试3',
            name: '测试3',
            required: true,
            message: '请选择',
            type: 'date',
        },
        {
            label: '测试4',
            name: '测试4',
            required: true,
            message: '请输入',
            type: 'input',
        },
    ]
    // table的列表项
    const columns = [
        {
            key: 'materialTypeNames',
            dataIndex: 'materialTypeNames',
            title: '材料类型名称'
        }
    ]
    // 切换分页与头部筛选，change数据
    const changeData = (data: Object) => {
        getList(data)
    }
    function addCountAction(dispatch: any) {  
        setTimeout(() => {    
            dispatch({ type: 'plus' })  
        }, 1000)
    }

    return (
        <>
            <Table changeData={changeData} columns={columns} formData={formData} {...params} />
        </>
    )
}, List)
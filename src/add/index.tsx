import { Button } from "antd";
import React from "react";
import Form from '~/components/common/form/index';

export default () => {
    const formData = [
        {
            label: '材料名称',
            name: 'materialName',
            required: true,
            message: '请输入',
            type: 'input',
        },
        {
            label: '单位',
            name: 'unit',
            required: true,
            message: '请选择',
            type: 'input',
        },
        {
            label: '材料类型',
            name: 'materialTypeId',
            required: true,
            message: '请选择',
            type: 'select',
            options: [
                {
                    name: 'sb',
                    value: 48
                }
            ]
        },
        {
            label: '是否属于猪肉',
            name: 'orgId',
            required: true,
            message: '请选择',
            type: 'radio',
            options: [
                {
                    name: '哈哈',
                    value: 0
                },
                {
                    name: '嘻嘻',
                    value: 1
                }
            ]
        },
        {
            label: '入库库房',
            name: 'storeroomId',
            required: false,
            message: '请选择',
            type: 'radio',
            options: [
                {
                    name: '不入库',
                    value: 0
                },
                {
                    name: '要入库',
                    value: 1
                }
            ]
        },
    ]
    const formBtns = [
        {
            name: '保存',
            tapType: 'submit'
        },
        {
            name: '返回',
            tapType: 'back'
        }
    ]
    const getParams = (data: Object) => {
        console.log('data', data)
    }
    const clickIt = (e: any) => {
        console.log('e', e)
    }
    return (
        <div>
            <Form formData={formData} getParams={getParams} formBtns={formBtns} renderProps={(v) => {
                return <Button onClick={() => clickIt(v)}>申请</Button>
            }} />
        </div>
    )
}
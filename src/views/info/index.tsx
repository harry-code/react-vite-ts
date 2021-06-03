import { ADD, INFO, EDIT } from '~/service/apis/test';
import React, { useEffect, useState } from "react";
import Form from '~/components/common/form/index';
import { useHistory } from 'react-router-dom';

export default () => {
    const history = useHistory();
    const { location: { search } } = history;
    const id = search.split('id=')[1];
    const [formData, setFormData] = useState<{}>()
    useEffect(() => {
        (async function () {
            if (id) {
                const res = await INFO(id)
                if (res?.code === 200) {
                    setFormData(res.data)
                }
            }
        })()
    }, [id])
    const formItems = [
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
            name: 'isPork',
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
            name: 'isStoreroom',
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
    const getParams = async (data: Object) => {
        try {
            let res;
            if (id) {
                res = await EDIT({ ...formData, ...data })
            } else {
                res = await ADD(data)
            }
            if (res?.code === 200) {
                history.push('/')
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    return (
        <>
            <Form formItems={formItems} getParams={getParams} formBtns={formBtns} formData={formData} />
        </>
    )
}
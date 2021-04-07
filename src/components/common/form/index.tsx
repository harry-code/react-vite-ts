import React from "react";
import { useHistory } from "react-router-dom";
import {
    Form, Input, InputNumber, Mentions,
    Radio, Select, Switch, TimePicker,
    Transfer, TreeSelect, Upload, Space,
    Button, DatePicker
} from 'antd';

// 受控组件的陈述
export const nodes: { [key: string]: JSX.Element } = {
    'input': <Input />,
    'inputNumber': <InputNumber />,
    'mentions': <Mentions />,
    'radio': <Radio />,
    'select': <Select />,
    'switch': <Switch />,
    'treeSelect': <TreeSelect />,
    'datePicker': <DatePicker />,
    'timePicker': <TimePicker />,
    'transfer': <Transfer />,
    'upload': <Upload />,
}

interface props {
    formData: any[]; // form项的渲染
    getParams: (data: Object) => void; // form参数获取
    formStyle?: { [key: string]: string }; // form的样式
    formBtns?: {
        name: string;
        tapType: string;
    }[]; // form的按钮们
}

// 默认垂直布局form
export default function FormComp({
    formData,
    getParams,
    formStyle = { layout: 'horizontal', name: 'from' },
    formBtns = [
        {
            name: '保存',
            tapType: 'submit',
        },
        {
            name: '返回',
            tapType: 'back',
        },
        {
            name: '重置',
            tapType: 'reset',
        }
    ]
}: props) {
    const [form] = Form.useForm();
    const history = useHistory();
    // 按钮事件的陈述
    const onFinish = () => {
        const values = form.getFieldsValue()
        getParams(values)
    };

    const resetForm = () => {
        form.resetFields()
    };

    const backFn = () => {
        history.goBack()
    };

    // 按钮事件的映射
    const btnClicks: { [key: string]: (v: any) => void } = {
        'submit': onFinish,
        'reset': resetForm,
        'back': backFn
    }

    return (
        <Form
            {...formStyle}
            form={form}
        >
            {
                formData.map((i: any) => {
                    return (
                        <Form.Item
                            key={i.name}
                            label={i.label}
                            name={i.name}
                            rules={[{ required: i.required, message: i.message }]}
                        >
                            {nodes[i.type]}
                        </Form.Item>
                    )
                })
            }

            <Form.Item>
                <Space>
                    {
                        formBtns.map((i) => {
                            const isSub = i.tapType === 'submit'
                            return <Button key={i.name}
                                type={isSub ? 'primary' : 'default'}
                                onClick={btnClicks[i.tapType]}>{i.name}</Button>
                        })
                    }
                </Space>
            </Form.Item>
        </Form>
    )
}
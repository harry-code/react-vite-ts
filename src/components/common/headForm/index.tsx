import { Button, Form, Space, Input, Select, DatePicker } from 'antd';
import React from 'react';
import './index.less'
// 列表页的筛选 主要又输入框、下拉框、时间选择框组成
const { Option } = Select;
interface props {
    formData: any[];
    getParams: (data: Object) => void;
}

export default ({ formData, getParams }: props) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        getParams(values)
    };

    const resetForm = () => {
        form.resetFields()
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <div className="head-form">
            <Form
                {...layout}
                layout={'inline'}
                name="basic"
                form={form}
                onFinish={onFinish}
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
                                {
                                    i.type === 'input' ? (<Input placeholder={i.message} />) : (
                                        i.type === 'select' ? (
                                            <Select placeholder={i.message} clearIcon>
                                                <Option value={0}>否</Option>
                                                <Option value={1}>是</Option>
                                            </Select>
                                        ) : (<DatePicker placeholder={i.message} />)
                                    )
                                }
                            </Form.Item>
                        )
                    })
                }

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button onClick={resetForm}>重置</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
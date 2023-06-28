// import BaseInfoMa from '~/assets/sider/baseInfoMa.svg';
import type { MenuProps } from 'antd'

// export interface routes {
//     [x: string]: any;
//     label: string;
//     key: string;
//     icon?: string;
//     breadcrumb?: string | JSX.Element;
//     isLink?: boolean;
//     routes?: routes[];
// }

export interface bread {
    [propname: string]: any;
}

export const RoutesData: MenuProps['items'] = [
    {
        label: '我是菜单1',
        key: '/base',
        // icon: BaseInfoMa,
        children: [
            {
                label: '菜单儿子1',
                key: '/info',
                children: [
                    {
                        label: '新增库房',
                        key: '/base/warehouse/add',
                    },
                    {
                        label: '编辑库房',
                        key: '/base/warehouse/edit',
                    },
                ],
            },
            {
                label: '菜单儿子2',
                key: '/detail',
                children: [
                    {
                        label: '新增材料类型',
                        key: '/base/materialType/add',
                    },
                    {
                        label: '编辑材料类型',
                        key: '/base/materialType/edit',
                    },
                ],
            },
            {
                label: '菜单儿子3',
                key: '/base/material',
                children: [
                    {
                        label: '新增材料',
                        key: '/base/material/add',
                    },
                    {
                        label: '编辑材料',
                        key: '/base/material/edit',
                    },
                ],
            },
            {
                label: '菜单儿子4',
                key: '/base/pricing',
                children: [
                    {
                        label: '新增调价',
                        key: '/base/pricing/add',
                    },
                    {
                        label: '编辑调价',
                        key: '/base/pricing/edit',
                    },
                    {
                        label: '调价记录详情',
                        key: '/base/pricing/recordDetail',
                    },
                    {
                        label: '调价详情',
                        key: '/base/pricing/applyDetail',
                    },
                    {
                        label: '审核签字',
                        key: '/base/pricing/pricingApplyNature',
                    },
                ],
            },
            {
                label: '菜单儿子5',
                key: '/base/supplier',
                children: [
                    {
                        label: '新增供应商',
                        key: '/base/supplier/add',
                    },
                    {
                        label: '编辑供应商',
                        key: '/base/supplier/edit',
                    },
                ],
            },
        ],
    }
];

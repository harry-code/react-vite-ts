import { Get, Post } from '~/service/request';

export const List = async (data: any) => {
    return await Post('/rest/basic/material/list', data);
};
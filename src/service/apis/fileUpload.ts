import { Get, Post } from '~/service/request';

export const Upload = async (data: any, identifier: any) => {
    return await Post('/web/api/v1.0/upload/chunk/1247ff81c276bf39bdc584ecf9f0ed68?identifier=' + identifier, data);
};
import axios from 'axios';

type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';
type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RequestParams = {
  url: string;
  method: RequestType;
  data: any;
  responseType?: ResponseType;
};
type ResponseData = {
  code: number;
  msg: string;
  data?: any;
};
type API_TYPE = {
  [key: string]: string;
};

export const API_URL: API_TYPE = {
  // development: 'http://192.168.1.83:8088',
  development: 'http://wms-server.dev.goktech.cn',
  production: 'http://wms-server.dev.goktech.cn',
};

const Request = async (params: RequestParams): Promise<ResponseData> => {
  const { url, method, data, responseType = 'json' } = params;
  const tempUrl = API_URL[process.env.NODE_ENV || 'production'] + url;
  const headers = {
    token: localStorage.getItem('token') || '',
  };
  try {
    const result = await axios({
      url: tempUrl,
      method,
      params: ['GET', 'DELETE'].includes(method) ? data : null,
      data: ['POST', 'PUT'].includes(method) ? data : null,
      headers,
      responseType,
    }).then(res => res.data);
    return result;
  } catch (error) {
    return {
      msg: JSON.stringify(error),
      code: -1001,
    };
  }
};

export const Get = async (url: string, data: any = '') => {
  return await Request({ method: 'GET', data, url });
};

export const Post = async (url: string, data: any) => {
  return await Request({ method: 'POST', data, url });
};

export const Put = async (url: string, data: any) => {
  return await Request({ method: 'PUT', data, url });
};

export const Delete = async (url: string, data: any) => {
  return await Request({ method: 'DELETE', data, url });
};

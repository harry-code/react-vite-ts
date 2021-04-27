interface requestType {
    url: string;
    method?: 'post';
    data?: any;
    headers?: any;
    requestList?: any[]
}

const request = ({
    url,
    method = "post",
    data,
    headers = {},
    requestList
}: requestType) => {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
            xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = (e: any) => {
            if (requestList) {
                const xhrSort = requestList.findIndex((item: any) => item === xhr)
                requestList.splice(xhrSort, 1) // 删除已经成功请求的xhr
            }
            resolve({
                data: e.target?.response
            });
        };
        requestList?.push(xhr)
        console.log('requestList', requestList)
    });
}

export default request
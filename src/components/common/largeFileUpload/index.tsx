import React, { useRef, useState } from 'react';
import { UploadUrl, md5FileCheck, createFileUpload } from '~/service/apis/fileUpload';
import { Input, Button, message, Space } from 'antd';
import request from './request'
import axios from 'axios';

/**
 * 大文件上传、断点续传、秒传
 */


function LargeFileUpload() {
    const SIZE = 4 * 1024 * 1024; // 分为4m一个
    const fileRef = useRef<any>()
    const [file, setFile] = useState<any>()
    const [requestList, setList] = useState<any[]>()

    // 选择文件
    const changeFile = (e: any) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        setFile(file)
    }

    // 计算文件的md5 hash值
    const countMd5Hash = (fileChunkList: any) => {
        return new Promise(res => {
            // 使用worker 主线程
            const WorkerObj = new Worker('http://www.test.com/static/md5Hash.js')
            WorkerObj.postMessage({ fileChunkList }) // 传参给子Worker线程
            WorkerObj.onmessage = e => { // 监听子线程发过来的信息
                const { hash } = e.data
                if (hash) { res(hash) }
            }
        })
    }

    // 提交文件
    const uploadFile = async () => {
        if (!file) { return }
        const fileChunkList = createFileChunk(file) // 分片数组
        const fileHash: any = await countMd5Hash(fileChunkList)// 分片传入计算 文件md5
        const { data: { uploaded } } = await md5FileCheck(fileHash) // 比对文件hash
        if (!uploaded) { // 本文件 未上传过 或者 断点续传
            // 创建上传任务
            const taskRes = await createFileUpload();
            // 配置每个分片
            const fileData = fileChunkList?.map(({ file, name }, index) => {
                return {
                    fileHash,
                    chunk: file,
                    hash: name + '-' + index // 特定规则的hash
                }
            })
            uploadChunks(fileData, fileHash)
        } else { // 秒传
            message.success('文件上传成功！')
        }
    }

    // 生成切片文件
    const createFileChunk = (file: any, size = SIZE) => {
        const fileChunkList = [];
        let cur = 0;
        while (cur < file.size) {
            fileChunkList.push({
                file: file.slice(cur, cur + size),
                name: file.name
            })
            cur += size
        }
        return fileChunkList
    }

    // 上传切片
    const uploadChunks = async (fileData: any, fileHash: string) => { // 每个切片的 form数据
        const RequestList = fileData.map(({ chunk, hash }: { chunk: any, hash: any }) => {
            const formData = new FormData();
            formData.append('file', chunk);
            formData.append('hash', hash);
            formData.append('filename', file.name);
            formData.append('identifier', fileHash);
            return { formData }
        }).map(async ({ formData }: { formData: any }) => {
            request({
                url: UploadUrl(fileHash),
                data: formData,
            })
        })
        setList(RequestList)
        const res = await axios.all(RequestList) // 并发请求
    }

    // 暂停上传
    const uploadPause = () => {
        requestList?.forEach(xhr => {
            xhr?.abort()
        });
        setList([])
    }

    // 恢复上传
    const uploadReset = () => {

    }
    return (
        <div>
            <Input type="file" multiple ref={fileRef} onChange={changeFile} />
            <Space>
                <Button type="primary" onClick={uploadFile}>上传</Button>
                <Button type="primary" onClick={uploadPause}>暂停</Button>
                <Button type="primary" onClick={uploadReset}>恢复上传</Button>
            </Space>
        </div>
    )
}

export default LargeFileUpload
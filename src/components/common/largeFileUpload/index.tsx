import React, { useRef, useState } from 'react';
import { Upload } from '~/service/apis/fileUpload';
import axios from 'axios';
import { Input, Button } from 'antd';

function LargeFileUpload() {
    const SIZE = 4 * 1024 * 1024;
    const fileRef = useRef<any>()
    const [file, setFile] = useState<any>()
    // 选择文件
    const changeFile = (e: any) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        setFile(file)
    }

    // 提交文件
    const uploadFile = () => {
        if (!file) { return }
        const fileChunkList = createFileChunk(file) // 分片数组
        const fileData = fileChunkList?.map(({ file, name }, index) => { // 配置每个分片
            return {
                chunk: file,
                hash: name + '-' + index // 特定规则的hash
            }
        })
        uploadChunks(fileData)

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
            return fileChunkList
        }
    }

    // 上传切片
    const uploadChunks = async (fileData: any) => { // 每个切片的 form数据
        const PromiseList = fileData.map(({ chunk, hash }: { chunk: any, hash: any }) => {
            const formData = new FormData();
            formData.append('file', chunk);
            formData.append('hash', hash);
            formData.append('filename', file.name);
            return { formData }
        }).map(async ({ formData }: { formData: any }) => {
            Upload(formData, '1247ff81c276bf39bdc584ecf9f0ed68')
        })
        const res = await axios.all(PromiseList)
    }
    return (
        <div>
            <Input type="file" multiple ref={fileRef} onChange={changeFile} />
            <Button type="primary" onClick={uploadFile}>上传</Button>
        </div>
    )
}

export default LargeFileUpload
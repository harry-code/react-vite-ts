import React from "react"
import LargeFileUpload from '~/components/common/largeFileUpload'

export default () => {
    // new Promise((resolve, reject) => {
    //     reject(1)
    // }).then(onFulfiiled, onRejected)
    // // catch
    // Promise.prototype.catch = function (fn) {
    //     return this.then(null, fn)
    // }

    // // resolve
    // Promise.resolve = function (value) {
    //     return new Promise((resolve, reject) => {
    //         resolve(value)
    //     })
    // }

    // // reject
    // Promise.reject = function (error) {
    //     return new Promise((resolve, reject) => {
    //         reject(error)
    //     })
    // }

    // // all
    // Promise.all = function (promises) {
    //     let arr = [], i = 0;
    //     function processData(index, data) {
    //         arr[index] = data;
    //         i++
    //         if (i === promises.length) {
    //             resolve(arr)
    //         }
    //     }
    //     return new Promise((resolve, reject) => {
    //         for (let i = 0; i < promises.length; i++) {
    //             promises[i].then(data => {
    //                 // 放到数组
    //                 processData(i, data)
    //             }, reject)
    //         }
    //     })
    // }

    // // race
    // Promise.race = function (promises) {
    //     return new Promise((resolve, reject) => {
    //         for (let i = 0; i < promises.length; i++) {
    //             promises[i].then(resolve, reject) // 优先返回
    //         }
    //     })
    // }

    // // finally
    // Promise.prototype.finally = function (fn) {
    //     return this.then((val) => {
    //         fn()
    //         return val
    //     }).catch((error) => {
    //         fn()
    //         return error
    //     })
    // }
    // interface a {
    //     name: string
    // }
    // interface b {
    //     age: number
    // }
    // const c: (a & b) = {
    //     name: '1'
    // }
    // let someValue: any = "this is a string";
    // let strLength: number = (someValue as string).length;
    // console.log('strLength', strLength)

    return (
        <div>
            <LargeFileUpload />
            this is detail
        </div>
    )
}
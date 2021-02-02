import axios from "axios";
import params from "./config.js";

axios.defaults.baseURL = params.base_url
axios.defaults.timeout = params.time_out

function request(option = {}) {
  return new Promise((resolve, reject) => {
    let method = (option.type || 'get').toLowerCase() // 转换为小写
    let data = method === 'get'? {params: option.data} : option.data
    let url = option.url

    axios[method](url,data).then(
      res => {
        // console.log(res)
        resolve(res.data)
      }
    ).catch(
      err => {
        let response = err.response
        if (response) {
          switch (response.status) {
            case 500:
              alert('服务器响应失败')
              break
            case 504:
              alert('请求超时')
              break
          }
        }
        reject(err)
      }
    )
  })
}

export default request
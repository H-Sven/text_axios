import axios from "axios";
import qs from "qs";

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;  //请求携带cookie
axios.defaults.crossDomain = true;  //请求携带额外数据(不包含cookie)
axios.defaults.baseURL = "http://games.playingbuy.net";
if (document.domain == 't.playingbuy.com' || document.domain == 'localhost') {
  axios.defaults.baseURL = "http://t.games.playingbuy.net";
}
//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = qs.stringify(config.data);
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (!response.data.success) {
      if (response.data.error.code == 502) {
        console.log("未登录统一跳转到登录页");
        window.location.href = "#/";
      }
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        if (!response.data.success) {
        resolve(response.data.error);
        }else {
          resolve(response.data.payload);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        if (!response.data.success) {
          resolve(response.data.error);
        } else {
          resolve(response.data.payload);
        }
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        if (!response.data.success) {
          resolve(response.data.error);
        } else {
          resolve(response.data.payload);
        }
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        if (!response.data.success) {
          resolve(response.data.error);
        } else {
          resolve(response.data.payload);
        }
      },
      err => {
        reject(err);
      }
    );
  });
}

//将以下内容放入main.js  ...注意修改路径
// import axios from "axios";
// import { post, get, patch, put } from "../static/js/http";
// Vue.prototype.$post = post;
// Vue.prototype.$get = get;
// Vue.prototype.$patch = patch;
// Vue.prototype.$put = put;
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { i18n } from '../i18n';
import LocalCache from '../cache';

const instance = axios.create({
  baseURL: 'https://api.musiinc.com',
  timeout: 10000,
  headers: { Auth: '' }
});

const generateQuery = (params) => {
  let query = '';
  const keys = Object.keys(params);
  query = keys.reduce((s, v, index) => {
    s += `${v}=${params[v]}`;
    if (index < keys.length - 1) {
      s += '&';
    }
    return s;
  }, '');
  if (query && query.length > 0) {
    query = '?' + query;
  }
  return query;
};

const getInstance = async () => {
  const auth = await LocalCache.getKey('auth');
  if (auth) {
    instance.defaults.headers['Auth'] = auth;
  }
  return instance;
};

const getReq = async (url, params) => {
  const ins = await getInstance();
  let data = [];
  try {
    const res = await ins.get(`${url}${generateQuery(params)}`);
    if (res) {
      data = res;
    }
  } catch (e) {
    console.log('get request error', e);
    Toast.show({
      type: 'error',
      text1: i18n('ERROR.commonTitle'),
      text2: i18n('ERROR.getRequestCommon')
    });
  }
  return data;
};

const postReq = async (url, params) => {
  const ins = await getInstance();
  let data = [];
  try {
    const res = await ins.post(`${url}`, { data: params });
    if (res) {
      data = res;
    }
  } catch (e) {
    console.log('post request error', e);
    Toast.show({
      type: 'error',
      text1: i18n('ERROR.commonTitle'),
      text2: i18n('ERROR.postRequestCommon')
    });
  }
  return data;
};

export { getReq, postReq };

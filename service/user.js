import { getReq, postReq } from './helper';
import LocalCache from '../cache';

let baseUrl = '/user';

const mock = {
  id: 1,
  avatar:
    'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/%E4%B8%8B%E8%BD%BD.jpeg',
  name: '胖子',
  created_at: '2021-08-08T06:43:54.152Z'
};

const get = async (params) => {
  // const data = await getReq(`${baseUrl}`, params);
  const data = JSON.parse(JSON.stringify(mock));
  return data;
};

const login = async (params) => {
  const data = JSON.parse(JSON.stringify(mock));
  if (data) {
    LocalCache.setKey('user', JSON.stringify(data));
  }
  return data;
};

const getOne = async (params) => {
  const data = await getReq(`${baseUrl}`, params);
  return data;
};

const create = async (params) => {
  // const data = await postReq(`${baseUrl}`, params);
  const data = true;
  return data;
};

const update = async (params) => {
  const data = await postReq(`${baseUrl}`, params);
  return data;
};

const remove = async (params) => {
  const data = await postReq(`${baseUrl}`, params);
  return data;
};

export default { get, create, remove, getOne, update, login };

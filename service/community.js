import { getReq, postReq } from './helper';

let baseUrl = '/community';

const mock = [
  {
    id: 1,
    avatar:
      'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/%E4%B8%8B%E8%BD%BD.jpeg',
    name: '胖子',
    created_at: '2021-08-08T06:43:54.152Z',
    text_content: '派大星今天跟我说要去抓水母，可是章鱼哥非要让我去找蟹老板！',
    media_content: [
      {
        image_url:
          'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/%E4%B8%8B%E8%BD%BD%20(1).jpeg',
        type: 'IMAGE',
        index: 0,
        id: 1
      },
      {
        video_url:
          'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/videoplayback.mp4',
        type: 'VIDEO',
        index: 1,
        id: 2
      },
      {
        image_url:
          'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/Landscape-Color.jpg',
        type: 'IMAGE',
        index: 2,
        id: 3
      },
      {
        image_url:
          'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/m87_lo_april11_polarimetric_average_image_ml_deband_cc_8bit_srgb.0.jpeg',
        type: 'IMAGE',
        index: 3,
        id: 4
      }
    ],
    comment_number: 278,
    like_number: 230000,
    tags: ['#摇滚乐', '#乐队的夏天'],
    location: {
      lat: '',
      lng: '',
      name: '比基尼海滩·比奇堡'
    }
  },
  {
    id: 2,
    avatar:
      'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/%E4%B8%8B%E8%BD%BD.jpeg',
    name: '胖虎',
    created_at: '2021-08-08T03:43:54.152Z',
    share_content: {
      image:
        'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/images.jpeg',
      desc: '派大星今天跟我说要去抓水母，可是章鱼哥非要让我...'
    },
    comment_number: 278,
    like_number: 999999999
  },
  {
    id: 3,
    avatar:
      'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/%E4%B8%8B%E8%BD%BD.jpeg',
    name: '可以',
    created_at: '2021-04-08T04:43:54.152Z',
    text_content: '我给你们sing一个',
    media_content: [
      {
        audio_url:
          'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/Sven%20Otten%20-%20JustSomeMotion%20-%20Deka%20Spot%20(Extended%20Version)%20-%20Jamie%20Berry%20Feat.%20Octavia%20Rose%20-Delight.mp3',
        image_url:
          'https://musiinc-1258669417.cos.ap-shanghai.myqcloud.com/users/images%20(1).jpeg',
        audio_duration: 27,
        type: 'IMAGE_AUDIO',
        index: 0,
        id: 4
      }
    ],
    comment_number: 278,
    like_number: 1000000
  }
];

const get = async (params) => {
  // const data = await getReq(`${baseUrl}`, params);
  const data = JSON.parse(JSON.stringify(mock));
  return data;
};

const getOne = async (params) => {
  const data = await getReq(`${baseUrl}`, params);
  return data;
};

const create = async (params) => {
  // const data = await postReq(`${baseUrl}`, params);
  mock.unshift({
    id: mock.length - 1,
    avatar: params.avatar,
    name: params.name,
    created_at: new Date().toISOString(),
    text_content: params.text_content,
    media_content: params.media_content,
    comment_number: 0,
    like_number: 0,
    tags: params.tags
  });
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

export default { get, create, remove, getOne, update };

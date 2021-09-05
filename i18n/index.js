import cn from './cn';
import en from './en';
import LocalCache from '../cache';

let lang = 'cn';

const initLang = async (callback) => {
  lang = await LocalCache.getKey('lang');
  if (!lang || (lang && !['en', 'cn'].includes(lang))) {
    await LocalCache.setKey('lang', 'cn');
    lang = 'cn';
  }
  if (callback) {
    callback();
  }
};

const changeLang = async (newLang, callback) => {
  if (newLang && ['en', 'cn'].includes(newLang)) {
    await LocalCache.setKey('lang', newLang);
    lang = newLang;
  }
  if (callback) {
    callback();
  }
};

const i18n = (key) => {
  const langs = { cn, en };
  let data = '';
  const keys = key.split('.');
  for (let i = 0; i < keys.length; i++) {
    if (keys[i]) {
      if (!data) {
        data = langs[lang][keys[i]];
      } else {
        data = data[keys[i]];
      }
    }
  }
  return data;
};

export { i18n, initLang, changeLang };

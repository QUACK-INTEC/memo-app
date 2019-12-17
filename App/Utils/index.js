/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import { Platform } from 'react-native';

export const toUpperCaseFirsLetter = str => {
  const ignore = ['i', 'ii', 'iii', 'iv'];
  return str
    .toLowerCase()
    .split(' ')
    .map(s => (ignore.includes(s) ? s.toUpperCase() : s.charAt(0).toUpperCase() + s.substring(1)))
    .join(' ');
};

export const createFormDataPhoto = photo => {
  const data = new FormData();

  data.append('file', {
    name: 'file',
    type: 'image/jpg',
    uri: Platform.OS === 'android' ? photo : photo.replace('file://', ''),
  });

  return data;
};

export const GAMIFICATION_MSG = pnt => {
  if (pnt > 1) return `Acabas de obtener ${pnt} MemoPoints`;
  if (pnt < 0) return `Acabas de perder ${pnt} MemoPoints`;
  return `Acabas de obtener ${pnt} MemoPoint`;
};

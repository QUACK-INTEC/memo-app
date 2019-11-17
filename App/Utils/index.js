/* eslint-disable import/prefer-default-export */
export const toUpperCaseFirsLetter = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
